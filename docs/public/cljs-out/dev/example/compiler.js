// Compiled by ClojureScript 1.10.520 {}
goog.provide('example.compiler');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('cljs.analyzer');
example.compiler.compiler_state = cljs.js.empty_state.call(null);
example.compiler.extract_error = (function example$compiler$extract_error(error){
while(true){
if((error == null)){
return null;
} else {
var map__19226 = cljs.core.ex_data.call(null,error);
var map__19226__$1 = (((((!((map__19226 == null))))?(((((map__19226.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19226.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19226):map__19226);
var line = cljs.core.get.call(null,map__19226__$1,new cljs.core.Keyword(null,"line","line",212345235));
if(cljs.core.truth_(line)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"line","line",212345235),(line - (1)),new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.ex_message.call(null,error)], null)], null);
} else {
var G__19228 = cljs.core.ex_cause.call(null,error);
error = G__19228;
continue;
}
}
break;
}
});
example.compiler.extract_warnings = (function example$compiler$extract_warnings(type,env,extra){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"warning","warning",-1685650671),new cljs.core.Keyword(null,"line","line",212345235),(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env) - (1)),new cljs.core.Keyword(null,"text","text",-1790561697),cljs.analyzer.error_message.call(null,type,extra)], null);
});
example.compiler.compile = (function example$compiler$compile(src,cb){
if(cljs.core.truth_(src)){
var warnings = cljs.core.atom.call(null,null);
var handle_warnings = ((function (warnings){
return (function (p1__19229_SHARP_,p2__19230_SHARP_,p3__19231_SHARP_){
return cljs.core.swap_BANG_.call(null,warnings,cljs.core.conj,example.compiler.extract_warnings.call(null,p1__19229_SHARP_,p2__19230_SHARP_,p3__19231_SHARP_));
});})(warnings))
;
var _STAR_cljs_warning_handlers_STAR__orig_val__19232 = cljs.analyzer._STAR_cljs_warning_handlers_STAR_;
var _STAR_cljs_warning_handlers_STAR__temp_val__19233 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [handle_warnings], null);
cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR__temp_val__19233;

try{return cljs.js.compile_str.call(null,example.compiler.compiler_state,src,"cljs playground compilation",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"verbose","verbose",1694226060),false,new cljs.core.Keyword(null,"eval","eval",-1103567905),cljs.js.js_eval], null),((function (_STAR_cljs_warning_handlers_STAR__orig_val__19232,_STAR_cljs_warning_handlers_STAR__temp_val__19233,warnings,handle_warnings){
return (function (p__19234){
var map__19235 = p__19234;
var map__19235__$1 = (((((!((map__19235 == null))))?(((((map__19235.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19235.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19235):map__19235);
var value = cljs.core.get.call(null,map__19235__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.call(null,map__19235__$1,new cljs.core.Keyword(null,"error","error",-978969032));
return cb.call(null,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var and__4120__auto__ = value;
if(cljs.core.truth_(and__4120__auto__)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"value","value",305978217),value], null);
} else {
return and__4120__auto__;
}
})()], null),example.compiler.extract_error.call(null,error),cljs.core.deref.call(null,warnings))));
});})(_STAR_cljs_warning_handlers_STAR__orig_val__19232,_STAR_cljs_warning_handlers_STAR__temp_val__19233,warnings,handle_warnings))
);
}finally {cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR__orig_val__19232;
}} else {
return null;
}
});
