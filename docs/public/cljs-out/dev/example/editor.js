// Compiled by ClojureScript 1.10.520 {}
goog.provide('example.editor');
goog.require('cljs.core');
goog.require('oops.core');
goog.require('example.compiler');
example.editor.pos__GT_clj = (function example$editor$pos__GT_clj(pos){
if(cljs.core.truth_(pos)){
var temp__5720__auto__ = (function (){var target_obj_19239 = pos;
var _STAR_runtime_state_STAR__orig_val__19241 = oops.state._STAR_runtime_state_STAR_;
var _STAR_runtime_state_STAR__temp_val__19242 = oops.state.prepare_state.call(null,target_obj_19239,(new Error()),function(){arguments[0].apply(console,Array.prototype.slice.call(arguments,1))});
oops.state._STAR_runtime_state_STAR_ = _STAR_runtime_state_STAR__temp_val__19242;

try{var next_obj_19240 = ((oops.core.validate_object_access_dynamically.call(null,target_obj_19239,(0),"row",true,true,false))?(target_obj_19239["row"]):null);
return next_obj_19240;
}finally {oops.state._STAR_runtime_state_STAR_ = _STAR_runtime_state_STAR__orig_val__19241;
}})();
if(cljs.core.truth_(temp__5720__auto__)){
var row = temp__5720__auto__;
var temp__5720__auto____$1 = (function (){var target_obj_19243 = pos;
var _STAR_runtime_state_STAR__orig_val__19245 = oops.state._STAR_runtime_state_STAR_;
var _STAR_runtime_state_STAR__temp_val__19246 = oops.state.prepare_state.call(null,target_obj_19243,(new Error()),function(){arguments[0].apply(console,Array.prototype.slice.call(arguments,1))});
oops.state._STAR_runtime_state_STAR_ = _STAR_runtime_state_STAR__temp_val__19246;

try{var next_obj_19244 = ((oops.core.validate_object_access_dynamically.call(null,target_obj_19243,(0),"column",true,true,false))?(target_obj_19243["column"]):null);
return next_obj_19244;
}finally {oops.state._STAR_runtime_state_STAR_ = _STAR_runtime_state_STAR__orig_val__19245;
}})();
if(cljs.core.truth_(temp__5720__auto____$1)){
var column = temp__5720__auto____$1;
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"row","row",-570139521),row,new cljs.core.Keyword(null,"column","column",2078222095),column], null);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
example.editor.cursor = (function example$editor$cursor(e){
return e.getCursorPosition();
});
example.editor.matching_bracket = (function example$editor$matching_bracket(e){
return e.session.findMatchingBracket(example.editor.cursor.call(null,e));
});
example.editor.matching_bracket_range = (function example$editor$matching_bracket_range(e){
var temp__5720__auto__ = example.editor.pos__GT_clj.call(null,example.editor.cursor.call(null,e));
if(cljs.core.truth_(temp__5720__auto__)){
var end = temp__5720__auto__;
var temp__5720__auto____$1 = example.editor.pos__GT_clj.call(null,example.editor.matching_bracket.call(null,e));
if(cljs.core.truth_(temp__5720__auto____$1)){
var start = temp__5720__auto____$1;
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),start,new cljs.core.Keyword(null,"end","end",-268185958),end], null);
} else {
return null;
}
} else {
return null;
}
});
example.editor.closest_sexp = (function example$editor$closest_sexp(e){
var res = e.session.getTextRange(cljs.core.clj__GT_js.call(null,example.editor.matching_bracket_range.call(null,e)));
if((!((cljs.core.count.call(null,res) === (0))))){
return res;
} else {
return null;
}
});
example.editor.get_line_value = (function example$editor$get_line_value(e){
return e.session.getLine(new cljs.core.Keyword(null,"row","row",-570139521).cljs$core$IFn$_invoke$arity$1(example.editor.pos__GT_clj.call(null,example.editor.cursor.call(null,e))));
});
example.editor.get_value = (function example$editor$get_value(e){
return e.getValue();
});
example.editor.add_command = (function example$editor$add_command(e,name,key,fn){
return e.commands.addCommand(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"exec","exec",1625568743),fn,new cljs.core.Keyword(null,"bindKey","bindKey",1245980773),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mac","mac",-1879391650),key,new cljs.core.Keyword(null,"win","win",-1624642689),clojure.string.replace.call(null,key,"Command","Ctrl")], null)], null)));
});
example.editor.create_editor = (function example$editor$create_editor(var_args){
var G__19248 = arguments.length;
switch (G__19248) {
case 1:
return example.editor.create_editor.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return example.editor.create_editor.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

example.editor.create_editor.cljs$core$IFn$_invoke$arity$1 = (function (el){
return example.editor.create_editor.call(null,el,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"clojure",new cljs.core.Keyword(null,"readonly","readonly",-1101398934),false,new cljs.core.Keyword(null,"gutter","gutter",1047805662),true], null));
});

example.editor.create_editor.cljs$core$IFn$_invoke$arity$2 = (function (el,p__19249){
var map__19250 = p__19249;
var map__19250__$1 = (((((!((map__19250 == null))))?(((((map__19250.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19250.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19250):map__19250);
var type = cljs.core.get.call(null,map__19250__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var readonly = cljs.core.get.call(null,map__19250__$1,new cljs.core.Keyword(null,"readonly","readonly",-1101398934));
var gutter = cljs.core.get.call(null,map__19250__$1,new cljs.core.Keyword(null,"gutter","gutter",1047805662));
var G__19252 = ace.edit(el);
G__19252.setReadOnly(readonly);

G__19252.setHighlightActiveLine(false);

G__19252.setTheme("ace/theme/dracula");

G__19252.setOption("showLineNumbers",false);

G__19252.renderer.setShowGutter(gutter);

G__19252.session.setTabSize((2));

G__19252.session.setUseSoftTabs(true);

G__19252.session.setUseWrapMode(true);

G__19252.session.setMode(["ace/mode/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(type)].join(''));

return G__19252;
});

example.editor.create_editor.cljs$lang$maxFixedArity = 2;

