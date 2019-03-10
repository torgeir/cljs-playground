(ns example.compiler
  (:require [cljs.js :as cjs]
            [cljs.analyzer :as ana :include-macros true]))


(def compiler-state (cjs/empty-state))


(defn extract-error [error]
  (if (nil? error)
    nil
    (let [{:keys [line]} (ex-data error)]
      (if line
        [{:type :error
          :line (dec line)
          :text (ex-message error)}]
        (recur (ex-cause error))))))


(defn extract-warnings [type env extra]
  {:type :warning
   :line (dec (:line env))
   :text (ana/error-message type extra)})


(defn compile [src cb]
  (when src
    (let [warnings        (atom nil)
          handle-warnings #(swap! warnings conj (extract-warnings %1 %2 %3))]
      (ana/with-warning-handlers [handle-warnings]
        (cjs/compile-str compiler-state
                         src
                         "cljs playground compilation"
                         {:verbose false
                          :eval    cjs/js-eval}
                         (fn [{:keys [value error]}]
                           (cb (filter
                                 (complement nil?)
                                 (concat [(and value {:type :success :value value})]
                                         (extract-error error)
                                         @warnings)))))))))