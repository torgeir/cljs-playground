(ns example.core
  (:require [cljs.pprint :as pp]
            [goog.dom :as dom]
            [oops.core :refer [oget oset!]]
            [goog.functions :refer [debounce]]
            [example.editor :as editor]
            [example.compiler :as compiler]))


(declare e)
(declare e-result)
(declare e-compiled)


(enable-console-print!)
(set! *warn-on-infer* true)
(defn debug [v] (prn v) v)


(defonce timers (atom []))


(defn clear-timers []
  (doseq [t @timers]
    (js/clearTimeout t)
    (reset! timers [])))


(defonce set-timeout js/setTimeout)
(defonce set-interval js/setInterval)
(defonce console-log js/console.log)


(defn scroll-to-bottom! [^js/Element el]
  (set! (. el -scrollTop) (. el -scrollHeight)))


(defn keep-timers [t] (swap! timers conj t) t)
(set! js/setInterval #(keep-timers (set-interval %1 %2)))
(set! js/setTimeout #(keep-timers (set-timeout %1 %2)))
(set! js/console.log (fn [& vs]
                       (apply console-log vs)
                       (let [el (dom/getElementByClass "log")]
                         (doseq [v vs]
                           (dom/appendChild el (dom/createTextNode (str v "\n"))))
                         (when (not= el js/document.activeElement)
                           (scroll-to-bottom! el)))))


(defn show-annotation [^js/ace.EditEditor e annotation]
  (.setAnnotations (. e -session) (clj->js [(-> annotation
                                              (assoc :column 0)
                                              (assoc :row (:line annotation)))])))


(defn clear-annotations [^js/ace.Editor e]
  (-> e .-session .clearAnnotations))


(defmulti  handle-result #(:type %2))


(defmethod handle-result :error [e v] (show-annotation e v))


(defmethod handle-result :warning [e v] (show-annotation e v))


(defmethod handle-result :success [e v]
  (.setValue ^js/ace.Editor e-compiled (:value v) 1)
  (.setValue ^js/ace.Editor e-result
             (with-out-str (pp/pprint (js/eval (:value v))))
             1))


(defn handle-results [e results]
  (doseq [result results]
    (handle-result e result)))


(defn reset []
  (js/console.clear)
  (dom/setTextContent (dom/getElementByClass "log") "")
  (dom/setTextContent (dom/getElementByClass "result") "")
  (dom/setTextContent (dom/getElementByClass "compiled") ""))


(defn compile-at-point [e]
  (clear-annotations e)
  (compiler/compile (or (editor/closest-sexp e)
                        (editor/get-line-value e))
                    (partial handle-results e)))


(defn compile-buffer [e]
  (clear-timers)
  (clear-annotations e)
  (compiler/compile (editor/get-value e)
                    (partial handle-results e)))


(defonce e
  (doto ^js/ace.Editor (editor/create-editor (dom/getElementByClass "editor"))
    (editor/add-command "compile buffer" "Command-Shift-Enter" compile-buffer)
    (editor/add-command "compile at point" "Command-Enter" compile-at-point)
    (editor/add-command "reset" "Command-K" reset)
    (.focus)))


(defonce e-result
  (editor/create-editor (dom/getElementByClass "result") {:type     "clojure"
                                                          :readonly true
                                                          :gutter   false}))


(defonce e-compiled
  (editor/create-editor (dom/getElementByClass "compiled") {:type     "javascript"
                                                            :readonly true
                                                            :gutter   false}))