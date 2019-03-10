(ns example.editor
  (:require [oops.core :refer [oget oset!]]
            [example.compiler :refer [compile]]))


(defn pos->clj [pos]
  (when pos
    (when-let [row (oget pos "row")]
      (when-let [column (oget pos "column")]
        {:row row :column column}))))


(defn cursor [^js/ace.Editor e]
  (.getCursorPosition e))


(defn matching-bracket [^js/ace.Editor e]
  (-> e .-session (.findMatchingBracket (cursor e))))


(defn matching-bracket-range [^js/ace.Editor e]
  (when-let [end (pos->clj (cursor e))]
    (when-let [start (pos->clj (matching-bracket e))]
      {:start start :end end})))


(defn closest-sexp [^js/ace.Editor e]
  (let [res (-> e .-session (.getTextRange (clj->js (matching-bracket-range e))))]
    (when (not (zero? (count res)))
      res)))


(defn get-line-value [^js/ace.Editor e]
  (-> e .-session (.getLine (:row (pos->clj (cursor e))))))


(defn get-value [^js/ace.Editor e]
  (-> e .getValue))


(defn add-command [^js/ace.Editor e name key fn]
  (-> e .-commands (.addCommand (clj->js {:name    name
                                          :exec    fn
                                          :bindKey {:mac key
                                                    :win (clojure.string/replace
                                                           key "Command" "Ctrl")}}))))


(defn create-editor
  ([el] (create-editor el {:type     "clojure"
                           :readonly false
                           :gutter   true}))
  ([el {:keys [type readonly gutter]}]
   (doto (.edit js/ace el)
     (-> (.setReadOnly readonly))
     (-> (.setHighlightActiveLine false))
     (-> (.setTheme "ace/theme/dracula"))
     (-> (.setOption "showLineNumbers" false))
     (-> .-renderer (.setShowGutter gutter))
     (-> .-session (.setTabSize 2))
     (-> .-session (.setUseSoftTabs true))
     (-> .-session (.setUseWrapMode true))
     (-> .-session (.setMode (str "ace/mode/" type))))))

