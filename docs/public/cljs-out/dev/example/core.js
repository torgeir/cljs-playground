// Compiled by ClojureScript 1.10.520 {}
goog.provide('example.core');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('goog.dom');
goog.require('oops.core');
goog.require('goog.functions');
goog.require('example.editor');
goog.require('example.compiler');
cljs.core.enable_console_print_BANG_.call(null);
example.core.debug = (function example$core$debug(v){
cljs.core.prn.call(null,v);

return v;
});
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.timers !== 'undefined')){
} else {
example.core.timers = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
example.core.clear_timers = (function example$core$clear_timers(){
var seq__20524 = cljs.core.seq.call(null,cljs.core.deref.call(null,example.core.timers));
var chunk__20525 = null;
var count__20526 = (0);
var i__20527 = (0);
while(true){
if((i__20527 < count__20526)){
var t = cljs.core._nth.call(null,chunk__20525,i__20527);
clearTimeout(t);

cljs.core.reset_BANG_.call(null,example.core.timers,cljs.core.PersistentVector.EMPTY);


var G__20528 = seq__20524;
var G__20529 = chunk__20525;
var G__20530 = count__20526;
var G__20531 = (i__20527 + (1));
seq__20524 = G__20528;
chunk__20525 = G__20529;
count__20526 = G__20530;
i__20527 = G__20531;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__20524);
if(temp__5720__auto__){
var seq__20524__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20524__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__20524__$1);
var G__20532 = cljs.core.chunk_rest.call(null,seq__20524__$1);
var G__20533 = c__4550__auto__;
var G__20534 = cljs.core.count.call(null,c__4550__auto__);
var G__20535 = (0);
seq__20524 = G__20532;
chunk__20525 = G__20533;
count__20526 = G__20534;
i__20527 = G__20535;
continue;
} else {
var t = cljs.core.first.call(null,seq__20524__$1);
clearTimeout(t);

cljs.core.reset_BANG_.call(null,example.core.timers,cljs.core.PersistentVector.EMPTY);


var G__20536 = cljs.core.next.call(null,seq__20524__$1);
var G__20537 = null;
var G__20538 = (0);
var G__20539 = (0);
seq__20524 = G__20536;
chunk__20525 = G__20537;
count__20526 = G__20538;
i__20527 = G__20539;
continue;
}
} else {
return null;
}
}
break;
}
});
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.set_timeout !== 'undefined')){
} else {
example.core.set_timeout = setTimeout;
}
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.set_interval !== 'undefined')){
} else {
example.core.set_interval = setInterval;
}
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.console_log !== 'undefined')){
} else {
example.core.console_log = console.log;
}
example.core.scroll_to_bottom_BANG_ = (function example$core$scroll_to_bottom_BANG_(el){
return el.scrollTop = el.scrollHeight;
});
example.core.keep_timers = (function example$core$keep_timers(t){
cljs.core.swap_BANG_.call(null,example.core.timers,cljs.core.conj,t);

return t;
});
setInterval = (function (p1__20540_SHARP_,p2__20541_SHARP_){
return example.core.keep_timers.call(null,example.core.set_interval.call(null,p1__20540_SHARP_,p2__20541_SHARP_));
});
setTimeout = (function (p1__20542_SHARP_,p2__20543_SHARP_){
return example.core.keep_timers.call(null,example.core.set_timeout.call(null,p1__20542_SHARP_,p2__20543_SHARP_));
});
console.log = (function() { 
var G__20548__delegate = function (vs){
cljs.core.apply.call(null,example.core.console_log,vs);

var el = goog.dom.getElementByClass("log");
var seq__20544_20549 = cljs.core.seq.call(null,vs);
var chunk__20545_20550 = null;
var count__20546_20551 = (0);
var i__20547_20552 = (0);
while(true){
if((i__20547_20552 < count__20546_20551)){
var v_20553 = cljs.core._nth.call(null,chunk__20545_20550,i__20547_20552);
goog.dom.appendChild(el,goog.dom.createTextNode([cljs.core.str.cljs$core$IFn$_invoke$arity$1(v_20553),"\n"].join('')));


var G__20554 = seq__20544_20549;
var G__20555 = chunk__20545_20550;
var G__20556 = count__20546_20551;
var G__20557 = (i__20547_20552 + (1));
seq__20544_20549 = G__20554;
chunk__20545_20550 = G__20555;
count__20546_20551 = G__20556;
i__20547_20552 = G__20557;
continue;
} else {
var temp__5720__auto___20558 = cljs.core.seq.call(null,seq__20544_20549);
if(temp__5720__auto___20558){
var seq__20544_20559__$1 = temp__5720__auto___20558;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20544_20559__$1)){
var c__4550__auto___20560 = cljs.core.chunk_first.call(null,seq__20544_20559__$1);
var G__20561 = cljs.core.chunk_rest.call(null,seq__20544_20559__$1);
var G__20562 = c__4550__auto___20560;
var G__20563 = cljs.core.count.call(null,c__4550__auto___20560);
var G__20564 = (0);
seq__20544_20549 = G__20561;
chunk__20545_20550 = G__20562;
count__20546_20551 = G__20563;
i__20547_20552 = G__20564;
continue;
} else {
var v_20565 = cljs.core.first.call(null,seq__20544_20559__$1);
goog.dom.appendChild(el,goog.dom.createTextNode([cljs.core.str.cljs$core$IFn$_invoke$arity$1(v_20565),"\n"].join('')));


var G__20566 = cljs.core.next.call(null,seq__20544_20559__$1);
var G__20567 = null;
var G__20568 = (0);
var G__20569 = (0);
seq__20544_20549 = G__20566;
chunk__20545_20550 = G__20567;
count__20546_20551 = G__20568;
i__20547_20552 = G__20569;
continue;
}
} else {
}
}
break;
}

if(cljs.core.not_EQ_.call(null,el,document.activeElement)){
return example.core.scroll_to_bottom_BANG_.call(null,el);
} else {
return null;
}
};
var G__20548 = function (var_args){
var vs = null;
if (arguments.length > 0) {
var G__20570__i = 0, G__20570__a = new Array(arguments.length -  0);
while (G__20570__i < G__20570__a.length) {G__20570__a[G__20570__i] = arguments[G__20570__i + 0]; ++G__20570__i;}
  vs = new cljs.core.IndexedSeq(G__20570__a,0,null);
} 
return G__20548__delegate.call(this,vs);};
G__20548.cljs$lang$maxFixedArity = 0;
G__20548.cljs$lang$applyTo = (function (arglist__20571){
var vs = cljs.core.seq(arglist__20571);
return G__20548__delegate(vs);
});
G__20548.cljs$core$IFn$_invoke$arity$variadic = G__20548__delegate;
return G__20548;
})()
;
example.core.show_annotation = (function example$core$show_annotation(e,annotation){
return e.session.setAnnotations(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,cljs.core.assoc.call(null,annotation,new cljs.core.Keyword(null,"column","column",2078222095),(0)),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(annotation))], null)));
});
example.core.clear_annotations = (function example$core$clear_annotations(e){
return e.session.clearAnnotations();
});
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.handle_result !== 'undefined')){
} else {
example.core.handle_result = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"example.core","handle-result"),((function (method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__){
return (function (p1__20573_SHARP_,p2__20572_SHARP_){
return new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p2__20572_SHARP_);
});})(method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__,hierarchy__4617__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.core._add_method.call(null,example.core.handle_result,new cljs.core.Keyword(null,"error","error",-978969032),(function (e,v){
return example.core.show_annotation.call(null,e,v);
}));
cljs.core._add_method.call(null,example.core.handle_result,new cljs.core.Keyword(null,"warning","warning",-1685650671),(function (e,v){
return example.core.show_annotation.call(null,e,v);
}));
cljs.core._add_method.call(null,example.core.handle_result,new cljs.core.Keyword(null,"success","success",1890645906),(function (e,v){
example.core.e_compiled.setValue(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(v),(1));

return example.core.e_result.setValue((function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__20574_20578 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__20575_20579 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__20576_20580 = true;
var _STAR_print_fn_STAR__temp_val__20577_20581 = ((function (_STAR_print_newline_STAR__orig_val__20574_20578,_STAR_print_fn_STAR__orig_val__20575_20579,_STAR_print_newline_STAR__temp_val__20576_20580,sb__4661__auto__){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__20574_20578,_STAR_print_fn_STAR__orig_val__20575_20579,_STAR_print_newline_STAR__temp_val__20576_20580,sb__4661__auto__))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__20576_20580;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__20577_20581;

try{cljs.pprint.pprint.call(null,eval(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(v)));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__20575_20579;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__20574_20578;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})(),(1));
}));
example.core.handle_results = (function example$core$handle_results(e,results){
var seq__20582 = cljs.core.seq.call(null,results);
var chunk__20583 = null;
var count__20584 = (0);
var i__20585 = (0);
while(true){
if((i__20585 < count__20584)){
var result = cljs.core._nth.call(null,chunk__20583,i__20585);
example.core.handle_result.call(null,e,result);


var G__20586 = seq__20582;
var G__20587 = chunk__20583;
var G__20588 = count__20584;
var G__20589 = (i__20585 + (1));
seq__20582 = G__20586;
chunk__20583 = G__20587;
count__20584 = G__20588;
i__20585 = G__20589;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__20582);
if(temp__5720__auto__){
var seq__20582__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__20582__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__20582__$1);
var G__20590 = cljs.core.chunk_rest.call(null,seq__20582__$1);
var G__20591 = c__4550__auto__;
var G__20592 = cljs.core.count.call(null,c__4550__auto__);
var G__20593 = (0);
seq__20582 = G__20590;
chunk__20583 = G__20591;
count__20584 = G__20592;
i__20585 = G__20593;
continue;
} else {
var result = cljs.core.first.call(null,seq__20582__$1);
example.core.handle_result.call(null,e,result);


var G__20594 = cljs.core.next.call(null,seq__20582__$1);
var G__20595 = null;
var G__20596 = (0);
var G__20597 = (0);
seq__20582 = G__20594;
chunk__20583 = G__20595;
count__20584 = G__20596;
i__20585 = G__20597;
continue;
}
} else {
return null;
}
}
break;
}
});
example.core.reset = (function example$core$reset(){
console.clear();

goog.dom.setTextContent(goog.dom.getElementByClass("log"),"");

goog.dom.setTextContent(goog.dom.getElementByClass("result"),"");

return goog.dom.setTextContent(goog.dom.getElementByClass("compiled"),"");
});
example.core.compile_at_point = (function example$core$compile_at_point(e){
example.core.clear_annotations.call(null,e);

return example.compiler.compile.call(null,(function (){var or__4131__auto__ = example.editor.closest_sexp.call(null,e);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return example.editor.get_line_value.call(null,e);
}
})(),cljs.core.partial.call(null,example.core.handle_results,e));
});
example.core.compile_buffer = (function example$core$compile_buffer(e){
example.core.clear_timers.call(null);

example.core.clear_annotations.call(null,e);

return example.compiler.compile.call(null,example.editor.get_value.call(null,e),cljs.core.partial.call(null,example.core.handle_results,e));
});
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.e !== 'undefined')){
} else {
example.core.e = (function (){var G__20598 = example.editor.create_editor.call(null,goog.dom.getElementByClass("editor"));
example.editor.add_command.call(null,G__20598,"compile buffer","Command-Shift-Enter",example.core.compile_buffer);

example.editor.add_command.call(null,G__20598,"compile at point","Command-Enter",example.core.compile_at_point);

example.editor.add_command.call(null,G__20598,"reset","Command-K",example.core.reset);

G__20598.focus();

return G__20598;
})();
}
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.e_result !== 'undefined')){
} else {
example.core.e_result = example.editor.create_editor.call(null,goog.dom.getElementByClass("result"),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"clojure",new cljs.core.Keyword(null,"readonly","readonly",-1101398934),true,new cljs.core.Keyword(null,"gutter","gutter",1047805662),false], null));
}
if((typeof example !== 'undefined') && (typeof example.core !== 'undefined') && (typeof example.core.e_compiled !== 'undefined')){
} else {
example.core.e_compiled = example.editor.create_editor.call(null,goog.dom.getElementByClass("compiled"),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"javascript",new cljs.core.Keyword(null,"readonly","readonly",-1101398934),true,new cljs.core.Keyword(null,"gutter","gutter",1047805662),false], null));
}
