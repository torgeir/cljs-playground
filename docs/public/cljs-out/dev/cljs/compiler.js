// Compiled by ClojureScript 1.10.520 {}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler.es5_GT__EQ_ = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.call(null,cljs.core.mapcat.call(null,(function (lang){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lang,cljs.core.keyword.call(null,clojure.string.replace.call(null,cljs.core.name.call(null,lang),/^ecmascript/,"es"))], null);
}))),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ecmascript5","ecmascript5",342717552),new cljs.core.Keyword(null,"ecmascript5-strict","ecmascript5-strict",888234811),new cljs.core.Keyword(null,"ecmascript6","ecmascript6",723864898),new cljs.core.Keyword(null,"ecmascript6-strict","ecmascript6-strict",-786049555),new cljs.core.Keyword(null,"ecmascript-2015","ecmascript-2015",-902254444),new cljs.core.Keyword(null,"ecmascript6-typed","ecmascript6-typed",-1978203054),new cljs.core.Keyword(null,"ecmascript-2016","ecmascript-2016",471574729),new cljs.core.Keyword(null,"ecmascript-2017","ecmascript-2017",620145058),new cljs.core.Keyword(null,"ecmascript-next","ecmascript-next",-1935155962)], null));
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_source_map_data_gen_col_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
/**
 * Gets the part up to the first `.` of a namespace.
 * Returns the empty string for nil.
 * Returns the entire string if no `.` in namespace
 */
cljs.compiler.get_first_ns_segment = (function cljs$compiler$get_first_ns_segment(ns){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
var idx = ns__$1.indexOf(".");
if(((-1) === idx)){
return ns__$1;
} else {
return cljs.core.subs.call(null,ns__$1,(0),idx);
}
});
cljs.compiler.find_ns_starts_with = (function cljs$compiler$find_ns_starts_with(needle){
return cljs.core.reduce_kv.call(null,(function (xs,ns,_){
if(cljs.core._EQ_.call(null,needle,cljs.compiler.get_first_ns_segment.call(null,ns))){
return cljs.core.reduced.call(null,needle);
} else {
return null;
}
}),null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__14918 = s;
var map__14918__$1 = (((((!((map__14918 == null))))?(((((map__14918.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14918.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14918):map__14918);
var name = cljs.core.get.call(null,map__14918__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__14918__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__14921 = info;
var map__14922 = G__14921;
var map__14922__$1 = (((((!((map__14922 == null))))?(((((map__14922.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14922.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14922):map__14922);
var shadow = cljs.core.get.call(null,map__14922__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__14921__$1 = G__14921;
while(true){
var d__$2 = d__$1;
var map__14926 = G__14921__$1;
var map__14926__$1 = (((((!((map__14926 == null))))?(((((map__14926.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14926.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14926):map__14926);
var shadow__$1 = cljs.core.get.call(null,map__14926__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__14928 = (d__$2 + (1));
var G__14929 = shadow__$1;
d__$1 = G__14928;
G__14921__$1 = G__14929;
continue;
} else {
if(cljs.core.truth_(cljs.compiler.find_ns_starts_with.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine.call(null,cljs.core._hash.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s)),cljs.compiler.shadow_depth.call(null,s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__14930){
var map__14931 = p__14930;
var map__14931__$1 = (((((!((map__14931 == null))))?(((((map__14931.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14931.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14931):map__14931);
var name_var = map__14931__$1;
var name = cljs.core.get.call(null,map__14931__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__14931__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__14933 = info;
var map__14933__$1 = (((((!((map__14933 == null))))?(((((map__14933.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14933.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14933):map__14933);
var ns = cljs.core.get.call(null,map__14933__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__14933__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,"_$_",cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.call(null,cljs.compiler.munge.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$")),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('')));
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if((!((cljs.core.get.call(null,reserved,s) == null)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"$"].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var G__14936 = arguments.length;
switch (G__14936) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.call(null,s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_.call(null,s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if((!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null)))){
return cljs.compiler.fn_self_name.call(null,s);
} else {
var depth = cljs.compiler.shadow_depth.call(null,s);
var code = cljs.compiler.hash_scope.call(null,s);
var renamed = cljs.core.get.call(null,cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?["self__.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):(((!((renamed == null))))?renamed:name
));
var munged_name = cljs.compiler.munge.call(null,name__$1,reserved);
if(((field === true) || ((depth === (0))))){
return munged_name;
} else {
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),"__$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace.call(null,ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved.call(null,reserved);
var ss__$2 = cljs.core.map.call(null,rf,clojure.string.split.call(null,ss__$1,/\./));
var ss__$3 = clojure.string.join.call(null,".",ss__$2);
var ms = new cljs.core.Var(function(){return cljs.core.munge_str;},new cljs.core.Symbol("cljs.core","munge-str","cljs.core/munge-str",-301346665,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",-558947994),new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[true,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"munge-str","munge-str",-2042069652,null),"cljs/core.cljs",17,1,11478,11478,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null)], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)])).call(null,ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.call(null,ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__14938 = cp;
switch (G__14938) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if(((((31) < cp)) && ((cp < (127))))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.call(null,"0000",unpadded.length);
return ["\\u",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pad),cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__14940_14944 = cljs.core.seq.call(null,s);
var chunk__14941_14945 = null;
var count__14942_14946 = (0);
var i__14943_14947 = (0);
while(true){
if((i__14943_14947 < count__14942_14946)){
var c_14948 = cljs.core._nth.call(null,chunk__14941_14945,i__14943_14947);
sb.append(cljs.compiler.escape_char.call(null,c_14948));


var G__14949 = seq__14940_14944;
var G__14950 = chunk__14941_14945;
var G__14951 = count__14942_14946;
var G__14952 = (i__14943_14947 + (1));
seq__14940_14944 = G__14949;
chunk__14941_14945 = G__14950;
count__14942_14946 = G__14951;
i__14943_14947 = G__14952;
continue;
} else {
var temp__5720__auto___14953 = cljs.core.seq.call(null,seq__14940_14944);
if(temp__5720__auto___14953){
var seq__14940_14954__$1 = temp__5720__auto___14953;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14940_14954__$1)){
var c__4550__auto___14955 = cljs.core.chunk_first.call(null,seq__14940_14954__$1);
var G__14956 = cljs.core.chunk_rest.call(null,seq__14940_14954__$1);
var G__14957 = c__4550__auto___14955;
var G__14958 = cljs.core.count.call(null,c__4550__auto___14955);
var G__14959 = (0);
seq__14940_14944 = G__14956;
chunk__14941_14945 = G__14957;
count__14942_14946 = G__14958;
i__14943_14947 = G__14959;
continue;
} else {
var c_14960 = cljs.core.first.call(null,seq__14940_14954__$1);
sb.append(cljs.compiler.escape_char.call(null,c_14960));


var G__14961 = cljs.core.next.call(null,seq__14940_14954__$1);
var G__14962 = null;
var G__14963 = (0);
var G__14964 = (0);
seq__14940_14944 = G__14961;
chunk__14941_14945 = G__14962;
count__14942_14946 = G__14963;
i__14943_14947 = G__14964;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return ["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"\""].join('');
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__14965_14970 = ast;
var map__14965_14971__$1 = (((((!((map__14965_14970 == null))))?(((((map__14965_14970.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14965_14970.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14965_14970):map__14965_14970);
var env_14972 = cljs.core.get.call(null,map__14965_14971__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_14972))){
var map__14967_14973 = env_14972;
var map__14967_14974__$1 = (((((!((map__14967_14973 == null))))?(((((map__14967_14973.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14967_14973.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14967_14973):map__14967_14973);
var line_14975 = cljs.core.get.call(null,map__14967_14974__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_14976 = cljs.core.get.call(null,map__14967_14974__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,((function (map__14967_14973,map__14967_14974__$1,line_14975,column_14976,map__14965_14970,map__14965_14971__$1,env_14972){
return (function (m){
var minfo = (function (){var G__14969 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"binding","binding",539932593),null,new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast)))){
return cljs.core.assoc.call(null,G__14969,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__14969;
}
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_14975 - (1))], null),cljs.core.fnil.call(null,((function (minfo,map__14967_14973,map__14967_14974__$1,line_14975,column_14976,map__14965_14970,map__14965_14971__$1,env_14972){
return (function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_14976)?(column_14976 - (1)):(0))], null),cljs.core.fnil.call(null,((function (minfo,map__14967_14973,map__14967_14974__$1,line_14975,column_14976,map__14965_14970,map__14965_14971__$1,env_14972){
return (function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
});})(minfo,map__14967_14973,map__14967_14974__$1,line_14975,column_14976,map__14965_14970,map__14965_14971__$1,env_14972))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__14967_14973,map__14967_14974__$1,line_14975,column_14976,map__14965_14970,map__14965_14971__$1,env_14972))
,cljs.core.sorted_map.call(null)));
});})(map__14967_14973,map__14967_14974__$1,line_14975,column_14976,map__14965_14970,map__14965_14971__$1,env_14972))
);
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__14985 = arguments.length;
switch (G__14985) {
case 0:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___14992 = arguments.length;
var i__4731__auto___14993 = (0);
while(true){
if((i__4731__auto___14993 < len__4730__auto___14992)){
args_arr__4751__auto__.push((arguments[i__4731__auto___14993]));

var G__14994 = (i__4731__auto___14993 + (1));
i__4731__auto___14993 = G__14994;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
if((a == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,a)){
cljs.compiler.emit.call(null,a);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,a)){
cljs.core.apply.call(null,cljs.compiler.emits,a);
} else {
if(goog.isFunction(a)){
a.call(null);
} else {
var s_14995 = (function (){var G__14986 = a;
if((!(typeof a === 'string'))){
return G__14986.toString();
} else {
return G__14986;
}
})();
var temp__5724__auto___14996 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5724__auto___14996 == null)){
} else {
var sm_data_14997 = temp__5724__auto___14996;
cljs.core.swap_BANG_.call(null,sm_data_14997,cljs.core.update,new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),((function (sm_data_14997,temp__5724__auto___14996,s_14995){
return (function (p1__14977_SHARP_){
return (p1__14977_SHARP_ + s_14995.length);
});})(sm_data_14997,temp__5724__auto___14996,s_14995))
);
}

cljs.core.print.call(null,s_14995);

}
}
}
}

return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

return cljs.compiler.emits.call(null,b);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler.emits.call(null,c);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler.emits.call(null,d);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler.emits.call(null,e);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__14987 = cljs.core.seq.call(null,xs);
var chunk__14988 = null;
var count__14989 = (0);
var i__14990 = (0);
while(true){
if((i__14990 < count__14989)){
var x = cljs.core._nth.call(null,chunk__14988,i__14990);
cljs.compiler.emits.call(null,x);


var G__14998 = seq__14987;
var G__14999 = chunk__14988;
var G__15000 = count__14989;
var G__15001 = (i__14990 + (1));
seq__14987 = G__14998;
chunk__14988 = G__14999;
count__14989 = G__15000;
i__14990 = G__15001;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__14987);
if(temp__5720__auto__){
var seq__14987__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14987__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__14987__$1);
var G__15002 = cljs.core.chunk_rest.call(null,seq__14987__$1);
var G__15003 = c__4550__auto__;
var G__15004 = cljs.core.count.call(null,c__4550__auto__);
var G__15005 = (0);
seq__14987 = G__15002;
chunk__14988 = G__15003;
count__14989 = G__15004;
i__14990 = G__15005;
continue;
} else {
var x = cljs.core.first.call(null,seq__14987__$1);
cljs.compiler.emits.call(null,x);


var G__15006 = cljs.core.next.call(null,seq__14987__$1);
var G__15007 = null;
var G__15008 = (0);
var G__15009 = (0);
seq__14987 = G__15006;
chunk__14988 = G__15007;
count__14989 = G__15008;
i__14990 = G__15009;
continue;
}
} else {
return null;
}
}
break;
}
});

/** @this {Function} */
cljs.compiler.emits.cljs$lang$applyTo = (function (seq14979){
var G__14980 = cljs.core.first.call(null,seq14979);
var seq14979__$1 = cljs.core.next.call(null,seq14979);
var G__14981 = cljs.core.first.call(null,seq14979__$1);
var seq14979__$2 = cljs.core.next.call(null,seq14979__$1);
var G__14982 = cljs.core.first.call(null,seq14979__$2);
var seq14979__$3 = cljs.core.next.call(null,seq14979__$2);
var G__14983 = cljs.core.first.call(null,seq14979__$3);
var seq14979__$4 = cljs.core.next.call(null,seq14979__$3);
var G__14984 = cljs.core.first.call(null,seq14979__$4);
var seq14979__$5 = cljs.core.next.call(null,seq14979__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__14980,G__14981,G__14982,G__14983,G__14984,seq14979__$5);
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (5);

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.call(null);

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__15010){
var map__15011 = p__15010;
var map__15011__$1 = (((((!((map__15011 == null))))?(((((map__15011.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15011.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15011):map__15011);
var m = map__15011__$1;
var gen_line = cljs.core.get.call(null,map__15011__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__15020 = arguments.length;
switch (G__15020) {
case 0:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4751__auto__ = [];
var len__4730__auto___15026 = arguments.length;
var i__4731__auto___15027 = (0);
while(true){
if((i__4731__auto___15027 < len__4730__auto___15026)){
args_arr__4751__auto__.push((arguments[i__4731__auto___15027]));

var G__15028 = (i__4731__auto___15027 + (1));
i__4731__auto___15027 = G__15028;
continue;
} else {
}
break;
}

var argseq__4752__auto__ = (new cljs.core.IndexedSeq(args_arr__4751__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4752__auto__);

}
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.call(null,a);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__15021_15029 = cljs.core.seq.call(null,xs);
var chunk__15022_15030 = null;
var count__15023_15031 = (0);
var i__15024_15032 = (0);
while(true){
if((i__15024_15032 < count__15023_15031)){
var x_15033 = cljs.core._nth.call(null,chunk__15022_15030,i__15024_15032);
cljs.compiler.emits.call(null,x_15033);


var G__15034 = seq__15021_15029;
var G__15035 = chunk__15022_15030;
var G__15036 = count__15023_15031;
var G__15037 = (i__15024_15032 + (1));
seq__15021_15029 = G__15034;
chunk__15022_15030 = G__15035;
count__15023_15031 = G__15036;
i__15024_15032 = G__15037;
continue;
} else {
var temp__5720__auto___15038 = cljs.core.seq.call(null,seq__15021_15029);
if(temp__5720__auto___15038){
var seq__15021_15039__$1 = temp__5720__auto___15038;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15021_15039__$1)){
var c__4550__auto___15040 = cljs.core.chunk_first.call(null,seq__15021_15039__$1);
var G__15041 = cljs.core.chunk_rest.call(null,seq__15021_15039__$1);
var G__15042 = c__4550__auto___15040;
var G__15043 = cljs.core.count.call(null,c__4550__auto___15040);
var G__15044 = (0);
seq__15021_15029 = G__15041;
chunk__15022_15030 = G__15042;
count__15023_15031 = G__15043;
i__15024_15032 = G__15044;
continue;
} else {
var x_15045 = cljs.core.first.call(null,seq__15021_15039__$1);
cljs.compiler.emits.call(null,x_15045);


var G__15046 = cljs.core.next.call(null,seq__15021_15039__$1);
var G__15047 = null;
var G__15048 = (0);
var G__15049 = (0);
seq__15021_15029 = G__15046;
chunk__15022_15030 = G__15047;
count__15023_15031 = G__15048;
i__15024_15032 = G__15049;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln.call(null);
});

/** @this {Function} */
cljs.compiler.emitln.cljs$lang$applyTo = (function (seq15014){
var G__15015 = cljs.core.first.call(null,seq15014);
var seq15014__$1 = cljs.core.next.call(null,seq15014);
var G__15016 = cljs.core.first.call(null,seq15014__$1);
var seq15014__$2 = cljs.core.next.call(null,seq15014__$1);
var G__15017 = cljs.core.first.call(null,seq15014__$2);
var seq15014__$3 = cljs.core.next.call(null,seq15014__$2);
var G__15018 = cljs.core.first.call(null,seq15014__$3);
var seq15014__$4 = cljs.core.next.call(null,seq15014__$3);
var G__15019 = cljs.core.first.call(null,seq15014__$4);
var seq15014__$5 = cljs.core.next.call(null,seq15014__$4);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__15015,G__15016,G__15017,G__15018,G__15019,seq15014__$5);
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (5);

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__15050_15054 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__15051_15055 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__15052_15056 = true;
var _STAR_print_fn_STAR__temp_val__15053_15057 = ((function (_STAR_print_newline_STAR__orig_val__15050_15054,_STAR_print_fn_STAR__orig_val__15051_15055,_STAR_print_newline_STAR__temp_val__15052_15056,sb__4661__auto__){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__15050_15054,_STAR_print_fn_STAR__orig_val__15051_15055,_STAR_print_newline_STAR__temp_val__15052_15056,sb__4661__auto__))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__15052_15056;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__15053_15057;

try{cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__15051_15055;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__15050_15054;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__4613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4614__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4615__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4616__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4617__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit-constant*"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4617__auto__,method_table__4613__auto__,prefer_table__4614__auto__,method_cache__4615__auto__,cached_hierarchy__4616__auto__));
})();
}









cljs.compiler.all_distinct_QMARK_ = (function cljs$compiler$all_distinct_QMARK_(xs){
return cljs.core.apply.call(null,cljs.core.distinct_QMARK_,xs);
});
cljs.compiler.emit_constant_no_meta = (function cljs$compiler$emit_constant_no_meta(x){
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x)){
return cljs.compiler.emit_list.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.core.record_QMARK_.call(null,x)){
var vec__15058 = cljs.analyzer.record_ns_PLUS_name.call(null,x);
var ns = cljs.core.nth.call(null,vec__15058,(0),null);
var name = cljs.core.nth.call(null,vec__15058,(1),null);
return cljs.compiler.emit_record_value.call(null,ns,name,((function (vec__15058,ns,name){
return (function (){
return cljs.compiler.emit_constant.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,x));
});})(vec__15058,ns,name))
);
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x)){
return cljs.compiler.emit_map.call(null,cljs.core.keys.call(null,x),cljs.core.vals.call(null,x),cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
if(cljs.analyzer.cljs_vector_QMARK_.call(null,x)){
return cljs.compiler.emit_vector.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.analyzer.cljs_set_QMARK_.call(null,x)){
return cljs.compiler.emit_set.call(null,x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
return cljs.compiler.emit_constant_STAR_.call(null,x);

}
}
}
}
}
});
cljs.compiler.emit_constant = (function cljs$compiler$emit_constant(v){
var m = cljs.analyzer.elide_irrelevant_meta.call(null,cljs.core.meta.call(null,v));
if((!((cljs.core.seq.call(null,m) == null)))){
return cljs.compiler.emit_with_meta.call(null,((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta.call(null,v);
});})(m))
,((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta.call(null,m);
});})(m))
);
} else {
return cljs.compiler.emit_constant_no_meta.call(null,v);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
throw cljs.core.ex_info.call(null,["failed compiling constant: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"; ",cljs.core.pr_str.call(null,cljs.core.type.call(null,x))," is not a valid ClojureScript constant."].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"constant","constant",-379609303),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type.call(null,x),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,null,(function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Number,(function (x){
if(cljs.core.truth_(isNaN(x))){
return cljs.compiler.emits.call(null,"NaN");
} else {
if(cljs.core.not.call(null,isFinite(x))){
return cljs.compiler.emits.call(null,(((x > (0)))?"Infinity":"-Infinity"));
} else {
return cljs.compiler.emits.call(null,"(",x,")");

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,String,(function (x){
return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Boolean,(function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,RegExp,(function (x){
if(cljs.core._EQ_.call(null,"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))){
return cljs.compiler.emits.call(null,"(new RegExp(\"\"))");
} else {
var vec__15061 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.call(null,vec__15061,(0),null);
var flags = cljs.core.nth.call(null,vec__15061,(1),null);
var pattern = cljs.core.nth.call(null,vec__15061,(2),null);
return cljs.compiler.emits.call(null,pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace.call(null,kw);
var name = cljs.core.name.call(null,kw);
cljs.compiler.emits.call(null,"new cljs.core.Keyword(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,(cljs.core.truth_(ns)?[ns,"/",name].join(''):name));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,kw));

return cljs.compiler.emits.call(null,")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace.call(null,sym);
var name = cljs.core.name.call(null,sym);
var symstr = (((!((ns == null))))?[ns,"/",name].join(''):name);
cljs.compiler.emits.call(null,"new cljs.core.Symbol(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,symstr);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,sym));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,null);

return cljs.compiler.emits.call(null,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Keyword,(function (x){
var temp__5718__auto__ = (function (){var and__4120__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4120__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(temp__5718__auto__)){
var value = temp__5718__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_keyword.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Symbol,(function (x){
var temp__5718__auto__ = (function (){var and__4120__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4120__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(temp__5718__auto__)){
var value = temp__5718__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_symbol.call(null,x);
}
}));
cljs.compiler.emit_constants_comma_sep = (function cljs$compiler$emit_constants_comma_sep(cs){
return (function (){
return cljs.core.doall.call(null,cljs.core.map_indexed.call(null,(function (i,m){
if(cljs.core.even_QMARK_.call(null,i)){
return cljs.compiler.emit_constant.call(null,m);
} else {
return cljs.compiler.emits.call(null,m);
}
}),cljs.compiler.comma_sep.call(null,cs)));
});
});
cljs.compiler.array_map_threshold = (8);
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Date,(function (date){
return cljs.compiler.emits.call(null,"new Date(",date.getTime(),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.call(null,"new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash.call(null,uuid_str),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.tagged_literals.JSValue,(function (v){
var items = v.val;
if(cljs.core.map_QMARK_.call(null,items)){
return cljs.compiler.emit_js_object.call(null,items,((function (items){
return (function (p1__15064_SHARP_){
return ((function (items){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__15064_SHARP_);
});
;})(items))
});})(items))
);
} else {
return cljs.compiler.emit_js_array.call(null,items,cljs.compiler.emit_constants_comma_sep);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__15066){
var map__15067 = p__15066;
var map__15067__$1 = (((((!((map__15067 == null))))?(((((map__15067.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15067.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15067):map__15067);
var ast = map__15067__$1;
var info = cljs.core.get.call(null,map__15067__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__15067__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__15067__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var temp__5718__auto__ = new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292).cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5718__auto__)){
var const_expr = temp__5718__auto__;
return cljs.compiler.emit.call(null,cljs.core.assoc.call(null,const_expr,new cljs.core.Keyword(null,"env","env",-1815813235),env));
} else {
var map__15069 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__15069__$1 = (((((!((map__15069 == null))))?(((((map__15069.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15069.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15069):map__15069);
var cenv = map__15069__$1;
var options = cljs.core.get.call(null,map__15069__$1,new cljs.core.Keyword(null,"options","options",99638489));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name.call(null,var_name),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var or__4131__auto__ = js_module_name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,ast));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var reserved = (function (){var G__15071 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.compiler.es5_GT__EQ_.call(null,new cljs.core.Keyword(null,"language-out","language-out",334619882).cljs$core$IFn$_invoke$arity$1(options));
if(cljs.core.truth_(and__4120__auto__)){
return (!((cljs.core.namespace.call(null,var_name) == null)));
} else {
return and__4120__auto__;
}
})())){
return clojure.set.difference.call(null,G__15071,cljs.analyzer.es5_allowed);
} else {
return G__15071;
}
})();
var js_module = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-namespaces","js-namespaces",-471353612),(function (){var or__4131__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})()], null));
var info__$2 = (function (){var G__15072 = info__$1;
if(cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.call(null,G__15072,reserved);
} else {
return G__15072;
}
})();
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var G__15073_15074 = new cljs.core.Keyword(null,"module-type","module-type",1392760304).cljs$core$IFn$_invoke$arity$1(js_module);
var G__15073_15075__$1 = (((G__15073_15074 instanceof cljs.core.Keyword))?G__15073_15074.fqn:null);
switch (G__15073_15075__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace.call(null,var_name))){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"].",cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved));
} else {
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core._EQ_.call(null,"default",cljs.core.name.call(null,var_name));
} else {
return and__4120__auto__;
}
})())){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"]");
} else {
cljs.compiler.emits.call(null,info__$2);
}

break;
default:
cljs.compiler.emits.call(null,info__$2);

}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"binding","binding",539932593),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"local","local",-1497766724),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"the-var","the-var",1428415613),(function (p__15077){
var map__15078 = p__15077;
var map__15078__$1 = (((((!((map__15078 == null))))?(((((map__15078.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15078.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15078):map__15078);
var arg = map__15078__$1;
var env = cljs.core.get.call(null,map__15078__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__15078__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__15078__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__15078__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__15080 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__15080__$1 = (((((!((map__15080 == null))))?(((((map__15080.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15080.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15080):map__15080);
var name = cljs.core.get.call(null,map__15080__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"with-meta","with-meta",-1566856820),(function (p__15082){
var map__15083 = p__15082;
var map__15083__$1 = (((((!((map__15083 == null))))?(((((map__15083.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15083.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15083):map__15083);
var expr = cljs.core.get.call(null,map__15083__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__15083__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__15083__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_with_meta.call(null,expr,meta);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_.call(null,((function (keys__$1){
return (function (p1__15085_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__15085_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
});})(keys__$1))
,keys__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count.call(null,keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count.call(null,keys) === (0))){
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(distinct_keys_QMARK_.call(null,keys))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,keys),", [",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.createAsIfByAssoc([",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"])");
}
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",comma_sep.call(null,keys),"],[",comma_sep.call(null,vals),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__15086){
var map__15087 = p__15086;
var map__15087__$1 = (((((!((map__15087 == null))))?(((((map__15087.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15087.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15087):map__15087);
var env = cljs.core.get.call(null,map__15087__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__15087__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__15087__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_map.call(null,keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_list = (function cljs$compiler$emit_list(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
return cljs.compiler.emits.call(null,"cljs.core.list(",comma_sep.call(null,items),")");
}
});
cljs.compiler.emit_vector = (function cljs$compiler$emit_vector(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt = cljs.core.count.call(null,items);
if((cnt < (32))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",comma_sep.call(null,items),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",comma_sep.call(null,items),"], true)");
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__15089){
var map__15090 = p__15089;
var map__15090__$1 = (((((!((map__15090 == null))))?(((((map__15090.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15090.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15090):map__15090);
var items = cljs.core.get.call(null,map__15090__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__15090__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_vector.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_.call(null,((function (items__$1){
return (function (p1__15092_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__15092_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
});})(items__$1))
,items__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count.call(null,items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_(distinct_constants_QMARK_.call(null,items))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,items),", [",comma_sep.call(null,cljs.core.interleave.call(null,items,cljs.core.repeat.call(null,"null"))),"], null), null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.createAsIfByAssoc([",comma_sep.call(null,items),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__15093){
var map__15094 = p__15093;
var map__15094__$1 = (((((!((map__15094 == null))))?(((((map__15094.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15094.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15094):map__15094);
var items = cljs.core.get.call(null,map__15094__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__15094__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_set.call(null,items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.call(null,"({");

var temp__5720__auto___15118 = cljs.core.seq.call(null,items);
if(temp__5720__auto___15118){
var items_15119__$1 = temp__5720__auto___15118;
var vec__15096_15120 = items_15119__$1;
var seq__15097_15121 = cljs.core.seq.call(null,vec__15096_15120);
var first__15098_15122 = cljs.core.first.call(null,seq__15097_15121);
var seq__15097_15123__$1 = cljs.core.next.call(null,seq__15097_15121);
var vec__15099_15124 = first__15098_15122;
var k_15125 = cljs.core.nth.call(null,vec__15099_15124,(0),null);
var v_15126 = cljs.core.nth.call(null,vec__15099_15124,(1),null);
var r_15127 = seq__15097_15123__$1;
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_15125),"\": ",emit_js_object_val.call(null,v_15126));

var seq__15102_15128 = cljs.core.seq.call(null,r_15127);
var chunk__15103_15129 = null;
var count__15104_15130 = (0);
var i__15105_15131 = (0);
while(true){
if((i__15105_15131 < count__15104_15130)){
var vec__15112_15132 = cljs.core._nth.call(null,chunk__15103_15129,i__15105_15131);
var k_15133__$1 = cljs.core.nth.call(null,vec__15112_15132,(0),null);
var v_15134__$1 = cljs.core.nth.call(null,vec__15112_15132,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_15133__$1),"\": ",emit_js_object_val.call(null,v_15134__$1));


var G__15135 = seq__15102_15128;
var G__15136 = chunk__15103_15129;
var G__15137 = count__15104_15130;
var G__15138 = (i__15105_15131 + (1));
seq__15102_15128 = G__15135;
chunk__15103_15129 = G__15136;
count__15104_15130 = G__15137;
i__15105_15131 = G__15138;
continue;
} else {
var temp__5720__auto___15139__$1 = cljs.core.seq.call(null,seq__15102_15128);
if(temp__5720__auto___15139__$1){
var seq__15102_15140__$1 = temp__5720__auto___15139__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15102_15140__$1)){
var c__4550__auto___15141 = cljs.core.chunk_first.call(null,seq__15102_15140__$1);
var G__15142 = cljs.core.chunk_rest.call(null,seq__15102_15140__$1);
var G__15143 = c__4550__auto___15141;
var G__15144 = cljs.core.count.call(null,c__4550__auto___15141);
var G__15145 = (0);
seq__15102_15128 = G__15142;
chunk__15103_15129 = G__15143;
count__15104_15130 = G__15144;
i__15105_15131 = G__15145;
continue;
} else {
var vec__15115_15146 = cljs.core.first.call(null,seq__15102_15140__$1);
var k_15147__$1 = cljs.core.nth.call(null,vec__15115_15146,(0),null);
var v_15148__$1 = cljs.core.nth.call(null,vec__15115_15146,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_15147__$1),"\": ",emit_js_object_val.call(null,v_15148__$1));


var G__15149 = cljs.core.next.call(null,seq__15102_15140__$1);
var G__15150 = null;
var G__15151 = (0);
var G__15152 = (0);
seq__15102_15128 = G__15149;
chunk__15103_15129 = G__15150;
count__15104_15130 = G__15151;
i__15105_15131 = G__15152;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_js_array = (function cljs$compiler$emit_js_array(items,comma_sep){
return cljs.compiler.emits.call(null,"[",comma_sep.call(null,items),"]");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-object","js-object",1830199158),(function (p__15153){
var map__15154 = p__15153;
var map__15154__$1 = (((((!((map__15154 == null))))?(((((map__15154.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15154.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15154):map__15154);
var keys = cljs.core.get.call(null,map__15154__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__15154__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env = cljs.core.get.call(null,map__15154__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_object.call(null,cljs.core.map.call(null,cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-array","js-array",-1210185421),(function (p__15156){
var map__15157 = p__15156;
var map__15157__$1 = (((((!((map__15157 == null))))?(((((map__15157.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15157.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15157):map__15157);
var items = cljs.core.get.call(null,map__15157__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__15157__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_array.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.call(null,ns,".map__GT_",name,"(",items,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"quote","quote",-262615245),(function (p__15159){
var map__15160 = p__15159;
var map__15160__$1 = (((((!((map__15160 == null))))?(((((map__15160.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15160.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15160):map__15160);
var expr = cljs.core.get.call(null,map__15160__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
return cljs.compiler.emit.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"const","const",1709929842),(function (p__15162){
var map__15163 = p__15162;
var map__15163__$1 = (((((!((map__15163 == null))))?(((((map__15163.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15163.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15163):map__15163);
var form = cljs.core.get.call(null,map__15163__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__15163__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__15165 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__15165__$1 = (((((!((map__15165 == null))))?(((((map__15165.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15165.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15165):map__15165);
var op = cljs.core.get.call(null,map__15165__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__15165__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__15165__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4131__auto__ = (function (){var and__4120__auto__ = cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842));
if(and__4120__auto__){
var and__4120__auto____$1 = form;
if(cljs.core.truth_(and__4120__auto____$1)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.call(null,form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = (!((const_expr == null)));
if(and__4120__auto__){
return cljs.compiler.truthy_constant_QMARK_.call(null,const_expr);
} else {
return and__4120__auto__;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__15167 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__15167__$1 = (((((!((map__15167 == null))))?(((((map__15167.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15167.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15167):map__15167);
var op = cljs.core.get.call(null,map__15167__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__15167__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__15167__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4131__auto__ = ((cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842))) && (((form === false) || ((form == null)))));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var and__4120__auto__ = (!((const_expr == null)));
if(and__4120__auto__){
return cljs.compiler.falsey_constant_QMARK_.call(null,const_expr);
} else {
return and__4120__auto__;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag.call(null,env,e);
var or__4131__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_.call(null,e);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__15169){
var map__15170 = p__15169;
var map__15170__$1 = (((((!((map__15170 == null))))?(((((map__15170.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15170.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15170):map__15170);
var test = cljs.core.get.call(null,map__15170__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__15170__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__15170__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__15170__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__15170__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not.call(null,(function (){var or__4131__auto__ = unchecked;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.compiler.safe_test_QMARK_.call(null,env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,else$);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else {
if(checked){
cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.call(null,"if(",test,"){");
}

cljs.compiler.emitln.call(null,then,"} else {");

return cljs.compiler.emitln.call(null,else$,"}");
}

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case","case",1143702196),(function (p__15172){
var map__15173 = p__15172;
var map__15173__$1 = (((((!((map__15173 == null))))?(((((map__15173.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15173.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15173):map__15173);
var v = cljs.core.get.call(null,map__15173__$1,new cljs.core.Keyword(null,"test","test",577538877));
var nodes = cljs.core.get.call(null,map__15173__$1,new cljs.core.Keyword(null,"nodes","nodes",-2099585805));
var default$ = cljs.core.get.call(null,map__15173__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__15173__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.call(null,"(function(){");
} else {
}

var gs = cljs.core.gensym.call(null,"caseval__");
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"var ",gs,";");
} else {
}

cljs.compiler.emitln.call(null,"switch (",v,") {");

var seq__15175_15211 = cljs.core.seq.call(null,nodes);
var chunk__15176_15212 = null;
var count__15177_15213 = (0);
var i__15178_15214 = (0);
while(true){
if((i__15178_15214 < count__15177_15213)){
var map__15195_15215 = cljs.core._nth.call(null,chunk__15176_15212,i__15178_15214);
var map__15195_15216__$1 = (((((!((map__15195_15215 == null))))?(((((map__15195_15215.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15195_15215.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15195_15215):map__15195_15215);
var ts_15217 = cljs.core.get.call(null,map__15195_15216__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__15196_15218 = cljs.core.get.call(null,map__15195_15216__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__15196_15219__$1 = (((((!((map__15196_15218 == null))))?(((((map__15196_15218.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15196_15218.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15196_15218):map__15196_15218);
var then_15220 = cljs.core.get.call(null,map__15196_15219__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__15199_15221 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_15217));
var chunk__15200_15222 = null;
var count__15201_15223 = (0);
var i__15202_15224 = (0);
while(true){
if((i__15202_15224 < count__15201_15223)){
var test_15225 = cljs.core._nth.call(null,chunk__15200_15222,i__15202_15224);
cljs.compiler.emitln.call(null,"case ",test_15225,":");


var G__15226 = seq__15199_15221;
var G__15227 = chunk__15200_15222;
var G__15228 = count__15201_15223;
var G__15229 = (i__15202_15224 + (1));
seq__15199_15221 = G__15226;
chunk__15200_15222 = G__15227;
count__15201_15223 = G__15228;
i__15202_15224 = G__15229;
continue;
} else {
var temp__5720__auto___15230 = cljs.core.seq.call(null,seq__15199_15221);
if(temp__5720__auto___15230){
var seq__15199_15231__$1 = temp__5720__auto___15230;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15199_15231__$1)){
var c__4550__auto___15232 = cljs.core.chunk_first.call(null,seq__15199_15231__$1);
var G__15233 = cljs.core.chunk_rest.call(null,seq__15199_15231__$1);
var G__15234 = c__4550__auto___15232;
var G__15235 = cljs.core.count.call(null,c__4550__auto___15232);
var G__15236 = (0);
seq__15199_15221 = G__15233;
chunk__15200_15222 = G__15234;
count__15201_15223 = G__15235;
i__15202_15224 = G__15236;
continue;
} else {
var test_15237 = cljs.core.first.call(null,seq__15199_15231__$1);
cljs.compiler.emitln.call(null,"case ",test_15237,":");


var G__15238 = cljs.core.next.call(null,seq__15199_15231__$1);
var G__15239 = null;
var G__15240 = (0);
var G__15241 = (0);
seq__15199_15221 = G__15238;
chunk__15200_15222 = G__15239;
count__15201_15223 = G__15240;
i__15202_15224 = G__15241;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_15220);
} else {
cljs.compiler.emitln.call(null,then_15220);
}

cljs.compiler.emitln.call(null,"break;");


var G__15242 = seq__15175_15211;
var G__15243 = chunk__15176_15212;
var G__15244 = count__15177_15213;
var G__15245 = (i__15178_15214 + (1));
seq__15175_15211 = G__15242;
chunk__15176_15212 = G__15243;
count__15177_15213 = G__15244;
i__15178_15214 = G__15245;
continue;
} else {
var temp__5720__auto___15246 = cljs.core.seq.call(null,seq__15175_15211);
if(temp__5720__auto___15246){
var seq__15175_15247__$1 = temp__5720__auto___15246;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15175_15247__$1)){
var c__4550__auto___15248 = cljs.core.chunk_first.call(null,seq__15175_15247__$1);
var G__15249 = cljs.core.chunk_rest.call(null,seq__15175_15247__$1);
var G__15250 = c__4550__auto___15248;
var G__15251 = cljs.core.count.call(null,c__4550__auto___15248);
var G__15252 = (0);
seq__15175_15211 = G__15249;
chunk__15176_15212 = G__15250;
count__15177_15213 = G__15251;
i__15178_15214 = G__15252;
continue;
} else {
var map__15203_15253 = cljs.core.first.call(null,seq__15175_15247__$1);
var map__15203_15254__$1 = (((((!((map__15203_15253 == null))))?(((((map__15203_15253.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15203_15253.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15203_15253):map__15203_15253);
var ts_15255 = cljs.core.get.call(null,map__15203_15254__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__15204_15256 = cljs.core.get.call(null,map__15203_15254__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__15204_15257__$1 = (((((!((map__15204_15256 == null))))?(((((map__15204_15256.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15204_15256.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15204_15256):map__15204_15256);
var then_15258 = cljs.core.get.call(null,map__15204_15257__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__15207_15259 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_15255));
var chunk__15208_15260 = null;
var count__15209_15261 = (0);
var i__15210_15262 = (0);
while(true){
if((i__15210_15262 < count__15209_15261)){
var test_15263 = cljs.core._nth.call(null,chunk__15208_15260,i__15210_15262);
cljs.compiler.emitln.call(null,"case ",test_15263,":");


var G__15264 = seq__15207_15259;
var G__15265 = chunk__15208_15260;
var G__15266 = count__15209_15261;
var G__15267 = (i__15210_15262 + (1));
seq__15207_15259 = G__15264;
chunk__15208_15260 = G__15265;
count__15209_15261 = G__15266;
i__15210_15262 = G__15267;
continue;
} else {
var temp__5720__auto___15268__$1 = cljs.core.seq.call(null,seq__15207_15259);
if(temp__5720__auto___15268__$1){
var seq__15207_15269__$1 = temp__5720__auto___15268__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15207_15269__$1)){
var c__4550__auto___15270 = cljs.core.chunk_first.call(null,seq__15207_15269__$1);
var G__15271 = cljs.core.chunk_rest.call(null,seq__15207_15269__$1);
var G__15272 = c__4550__auto___15270;
var G__15273 = cljs.core.count.call(null,c__4550__auto___15270);
var G__15274 = (0);
seq__15207_15259 = G__15271;
chunk__15208_15260 = G__15272;
count__15209_15261 = G__15273;
i__15210_15262 = G__15274;
continue;
} else {
var test_15275 = cljs.core.first.call(null,seq__15207_15269__$1);
cljs.compiler.emitln.call(null,"case ",test_15275,":");


var G__15276 = cljs.core.next.call(null,seq__15207_15269__$1);
var G__15277 = null;
var G__15278 = (0);
var G__15279 = (0);
seq__15207_15259 = G__15276;
chunk__15208_15260 = G__15277;
count__15209_15261 = G__15278;
i__15210_15262 = G__15279;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_15258);
} else {
cljs.compiler.emitln.call(null,then_15258);
}

cljs.compiler.emitln.call(null,"break;");


var G__15280 = cljs.core.next.call(null,seq__15175_15247__$1);
var G__15281 = null;
var G__15282 = (0);
var G__15283 = (0);
seq__15175_15211 = G__15280;
chunk__15176_15212 = G__15281;
count__15177_15213 = G__15282;
i__15178_15214 = G__15283;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.call(null,"default:");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",default$);
} else {
cljs.compiler.emitln.call(null,default$);
}
} else {
}

cljs.compiler.emitln.call(null,"}");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"return ",gs,";})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__15284){
var map__15285 = p__15284;
var map__15285__$1 = (((((!((map__15285 == null))))?(((((map__15285.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15285.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15285):map__15285);
var throw$ = cljs.core.get.call(null,map__15285__$1,new cljs.core.Keyword(null,"exception","exception",-335277064));
var env = cljs.core.get.call(null,map__15285__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.mapped_types,t))){
return cljs.core.get.call(null,cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(1))))].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__15288 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__15288,(0),null);
var rstr = cljs.core.nth.call(null,vec__15288,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs.compiler.resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,((function (idx,vec__15288,fstr,rstr,ret_t,axstr){
return (function (p1__15287_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__15287_SHARP_);
});})(idx,vec__15288,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__15291 = ["function(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,",",args_ts)),")"].join('');
if(cljs.core.truth_(ret_t)){
return [G__15291,":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__15291;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(0),(cljs.core.count.call(null,t) - (1))))),"="].join('');
} else {
return cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.call(null,env,cljs.core.symbol.call(null,t)))));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.call(null,clojure.string.trim.call(null,ts),(1),(cljs.core.count.call(null,ts) - (1)));
var xs = clojure.string.split.call(null,ts__$1,/\|/);
return ["{",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"|",cljs.core.map.call(null,((function (ts__$1,xs){
return (function (p1__15292_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__15292_SHARP_);
});})(ts__$1,xs))
,xs))),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__15293 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__15294 = cljs.core.seq.call(null,vec__15293);
var first__15295 = cljs.core.first.call(null,seq__15294);
var seq__15294__$1 = cljs.core.next.call(null,seq__15294);
var p = first__15295;
var first__15295__$1 = cljs.core.first.call(null,seq__15294__$1);
var seq__15294__$2 = cljs.core.next.call(null,seq__15294__$1);
var ts = first__15295__$1;
var first__15295__$2 = cljs.core.first.call(null,seq__15294__$2);
var seq__15294__$3 = cljs.core.next.call(null,seq__15294__$2);
var n = first__15295__$2;
var xs = seq__15294__$3;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.call(null,"@param",p);
if(and__4120__auto__){
var and__4120__auto____$1 = ts;
if(cljs.core.truth_(and__4120__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts),cljs.compiler.munge.call(null,n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/@return/,line))){
var vec__15296 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__15297 = cljs.core.seq.call(null,vec__15296);
var first__15298 = cljs.core.first.call(null,seq__15297);
var seq__15297__$1 = cljs.core.next.call(null,seq__15297);
var p = first__15298;
var first__15298__$1 = cljs.core.first.call(null,seq__15297__$1);
var seq__15297__$2 = cljs.core.next.call(null,seq__15297__$1);
var ts = first__15298__$1;
var xs = seq__15297__$2;
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.core._EQ_.call(null,"@return",p);
if(and__4120__auto__){
var and__4120__auto____$1 = ts;
if(cljs.core.truth_(and__4120__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning","warning",-1685650671),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__15301 = arguments.length;
switch (G__15301) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.call(null,null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__15309 = cljs.core.map.call(null,((function (docs,docs__$1,docs__$2){
return (function (p1__15299_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__15299_SHARP_);
} else {
return p1__15299_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines.call(null,e));
var seq__15310 = cljs.core.seq.call(null,vec__15309);
var first__15311 = cljs.core.first.call(null,seq__15310);
var seq__15310__$1 = cljs.core.next.call(null,seq__15310);
var x = first__15311;
var ys = seq__15310__$1;
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__15312 = cljs.core.seq.call(null,ys);
var chunk__15313 = null;
var count__15314 = (0);
var i__15315 = (0);
while(true){
if((i__15315 < count__15314)){
var next_line = cljs.core._nth.call(null,chunk__15313,i__15315);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__15321 = seq__15312;
var G__15322 = chunk__15313;
var G__15323 = count__15314;
var G__15324 = (i__15315 + (1));
seq__15312 = G__15321;
chunk__15313 = G__15322;
count__15314 = G__15323;
i__15315 = G__15324;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__15312);
if(temp__5720__auto__){
var seq__15312__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15312__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__15312__$1);
var G__15325 = cljs.core.chunk_rest.call(null,seq__15312__$1);
var G__15326 = c__4550__auto__;
var G__15327 = cljs.core.count.call(null,c__4550__auto__);
var G__15328 = (0);
seq__15312 = G__15325;
chunk__15313 = G__15326;
count__15314 = G__15327;
i__15315 = G__15328;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__15312__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__15329 = cljs.core.next.call(null,seq__15312__$1);
var G__15330 = null;
var G__15331 = (0);
var G__15332 = (0);
seq__15312 = G__15329;
chunk__15313 = G__15330;
count__15314 = G__15331;
i__15315 = G__15332;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq.call(null,docs__$2)){
cljs.compiler.emitln.call(null,"/**");

var seq__15316_15333 = cljs.core.seq.call(null,docs__$2);
var chunk__15317_15334 = null;
var count__15318_15335 = (0);
var i__15319_15336 = (0);
while(true){
if((i__15319_15336 < count__15318_15335)){
var e_15337 = cljs.core._nth.call(null,chunk__15317_15334,i__15319_15336);
if(cljs.core.truth_(e_15337)){
print_comment_lines.call(null,e_15337);
} else {
}


var G__15338 = seq__15316_15333;
var G__15339 = chunk__15317_15334;
var G__15340 = count__15318_15335;
var G__15341 = (i__15319_15336 + (1));
seq__15316_15333 = G__15338;
chunk__15317_15334 = G__15339;
count__15318_15335 = G__15340;
i__15319_15336 = G__15341;
continue;
} else {
var temp__5720__auto___15342 = cljs.core.seq.call(null,seq__15316_15333);
if(temp__5720__auto___15342){
var seq__15316_15343__$1 = temp__5720__auto___15342;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15316_15343__$1)){
var c__4550__auto___15344 = cljs.core.chunk_first.call(null,seq__15316_15343__$1);
var G__15345 = cljs.core.chunk_rest.call(null,seq__15316_15343__$1);
var G__15346 = c__4550__auto___15344;
var G__15347 = cljs.core.count.call(null,c__4550__auto___15344);
var G__15348 = (0);
seq__15316_15333 = G__15345;
chunk__15317_15334 = G__15346;
count__15318_15335 = G__15347;
i__15319_15336 = G__15348;
continue;
} else {
var e_15349 = cljs.core.first.call(null,seq__15316_15343__$1);
if(cljs.core.truth_(e_15349)){
print_comment_lines.call(null,e_15349);
} else {
}


var G__15350 = cljs.core.next.call(null,seq__15316_15343__$1);
var G__15351 = null;
var G__15352 = (0);
var G__15353 = (0);
seq__15316_15333 = G__15350;
chunk__15317_15334 = G__15351;
count__15318_15335 = G__15352;
i__15319_15336 = G__15353;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.call(null," */");
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number'));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__4120__auto__ = cljs.core.some.call(null,((function (opts){
return (function (p1__15355_SHARP_){
return goog.string.startsWith(p1__15355_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = opts;
if(cljs.core.truth_(and__4120__auto____$1)){
var and__4120__auto____$2 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__4120__auto____$2){
var define = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_.call(null,define)){
return cljs.core.pr_str.call(null,define);
} else {
return null;
}
} else {
return and__4120__auto____$2;
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__15356){
var map__15357 = p__15356;
var map__15357__$1 = (((((!((map__15357 == null))))?(((((map__15357.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15357.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15357):map__15357);
var doc = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var test = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"test","test",577538877));
var init = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var name = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var export$ = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"export","export",214356590));
var var$ = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var var_ast = cljs.core.get.call(null,map__15357__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__4131__auto__ = init;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,env,doc,cljs.core.concat.call(null,jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"return (");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.call(null," = ",(function (){var temp__5718__auto__ = cljs.compiler.get_define.call(null,mname,jsdoc);
if(cljs.core.truth_(temp__5718__auto__)){
var define = temp__5718__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"; return (");

cljs.compiler.emits.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"the-var","the-var",1428415613),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.call(null,env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast));

cljs.compiler.emitln.call(null,");})()");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,")");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.call(null,";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(and__4120__auto__){
return test;
} else {
return and__4120__auto__;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,";");
} else {
}

return cljs.compiler.emitln.call(null,var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__15359){
var map__15360 = p__15359;
var map__15360__$1 = (((((!((map__15360 == null))))?(((((map__15360.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15360.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15360):map__15360);
var name = cljs.core.get.call(null,map__15360__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__15360__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__15360__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,name)),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__15362_15386 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__15363_15387 = null;
var count__15364_15388 = (0);
var i__15365_15389 = (0);
while(true){
if((i__15365_15389 < count__15364_15388)){
var vec__15372_15390 = cljs.core._nth.call(null,chunk__15363_15387,i__15365_15389);
var i_15391 = cljs.core.nth.call(null,vec__15372_15390,(0),null);
var param_15392 = cljs.core.nth.call(null,vec__15372_15390,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_15392);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__15393 = seq__15362_15386;
var G__15394 = chunk__15363_15387;
var G__15395 = count__15364_15388;
var G__15396 = (i__15365_15389 + (1));
seq__15362_15386 = G__15393;
chunk__15363_15387 = G__15394;
count__15364_15388 = G__15395;
i__15365_15389 = G__15396;
continue;
} else {
var temp__5720__auto___15397 = cljs.core.seq.call(null,seq__15362_15386);
if(temp__5720__auto___15397){
var seq__15362_15398__$1 = temp__5720__auto___15397;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15362_15398__$1)){
var c__4550__auto___15399 = cljs.core.chunk_first.call(null,seq__15362_15398__$1);
var G__15400 = cljs.core.chunk_rest.call(null,seq__15362_15398__$1);
var G__15401 = c__4550__auto___15399;
var G__15402 = cljs.core.count.call(null,c__4550__auto___15399);
var G__15403 = (0);
seq__15362_15386 = G__15400;
chunk__15363_15387 = G__15401;
count__15364_15388 = G__15402;
i__15365_15389 = G__15403;
continue;
} else {
var vec__15375_15404 = cljs.core.first.call(null,seq__15362_15398__$1);
var i_15405 = cljs.core.nth.call(null,vec__15375_15404,(0),null);
var param_15406 = cljs.core.nth.call(null,vec__15375_15404,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_15406);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__15407 = cljs.core.next.call(null,seq__15362_15398__$1);
var G__15408 = null;
var G__15409 = (0);
var G__15410 = (0);
seq__15362_15386 = G__15407;
chunk__15363_15387 = G__15408;
count__15364_15388 = G__15409;
i__15365_15389 = G__15410;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count.call(null,params))){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,params)));

cljs.compiler.emitln.call(null," = cljs.core.first(",arglist,");");

cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.rest(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__15378_15411 = cljs.core.seq.call(null,params);
var chunk__15379_15412 = null;
var count__15380_15413 = (0);
var i__15381_15414 = (0);
while(true){
if((i__15381_15414 < count__15380_15413)){
var param_15415 = cljs.core._nth.call(null,chunk__15379_15412,i__15381_15414);
cljs.compiler.emit.call(null,param_15415);

if(cljs.core._EQ_.call(null,param_15415,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15416 = seq__15378_15411;
var G__15417 = chunk__15379_15412;
var G__15418 = count__15380_15413;
var G__15419 = (i__15381_15414 + (1));
seq__15378_15411 = G__15416;
chunk__15379_15412 = G__15417;
count__15380_15413 = G__15418;
i__15381_15414 = G__15419;
continue;
} else {
var temp__5720__auto___15420 = cljs.core.seq.call(null,seq__15378_15411);
if(temp__5720__auto___15420){
var seq__15378_15421__$1 = temp__5720__auto___15420;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15378_15421__$1)){
var c__4550__auto___15422 = cljs.core.chunk_first.call(null,seq__15378_15421__$1);
var G__15423 = cljs.core.chunk_rest.call(null,seq__15378_15421__$1);
var G__15424 = c__4550__auto___15422;
var G__15425 = cljs.core.count.call(null,c__4550__auto___15422);
var G__15426 = (0);
seq__15378_15411 = G__15423;
chunk__15379_15412 = G__15424;
count__15380_15413 = G__15425;
i__15381_15414 = G__15426;
continue;
} else {
var param_15427 = cljs.core.first.call(null,seq__15378_15421__$1);
cljs.compiler.emit.call(null,param_15427);

if(cljs.core._EQ_.call(null,param_15427,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15428 = cljs.core.next.call(null,seq__15378_15421__$1);
var G__15429 = null;
var G__15430 = (0);
var G__15431 = (0);
seq__15378_15411 = G__15428;
chunk__15379_15412 = G__15429;
count__15380_15413 = G__15430;
i__15381_15414 = G__15431;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
} else {
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.seq(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__15382_15432 = cljs.core.seq.call(null,params);
var chunk__15383_15433 = null;
var count__15384_15434 = (0);
var i__15385_15435 = (0);
while(true){
if((i__15385_15435 < count__15384_15434)){
var param_15436 = cljs.core._nth.call(null,chunk__15383_15433,i__15385_15435);
cljs.compiler.emit.call(null,param_15436);

if(cljs.core._EQ_.call(null,param_15436,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15437 = seq__15382_15432;
var G__15438 = chunk__15383_15433;
var G__15439 = count__15384_15434;
var G__15440 = (i__15385_15435 + (1));
seq__15382_15432 = G__15437;
chunk__15383_15433 = G__15438;
count__15384_15434 = G__15439;
i__15385_15435 = G__15440;
continue;
} else {
var temp__5720__auto___15441 = cljs.core.seq.call(null,seq__15382_15432);
if(temp__5720__auto___15441){
var seq__15382_15442__$1 = temp__5720__auto___15441;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15382_15442__$1)){
var c__4550__auto___15443 = cljs.core.chunk_first.call(null,seq__15382_15442__$1);
var G__15444 = cljs.core.chunk_rest.call(null,seq__15382_15442__$1);
var G__15445 = c__4550__auto___15443;
var G__15446 = cljs.core.count.call(null,c__4550__auto___15443);
var G__15447 = (0);
seq__15382_15432 = G__15444;
chunk__15383_15433 = G__15445;
count__15384_15434 = G__15446;
i__15385_15435 = G__15447;
continue;
} else {
var param_15448 = cljs.core.first.call(null,seq__15382_15442__$1);
cljs.compiler.emit.call(null,param_15448);

if(cljs.core._EQ_.call(null,param_15448,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15449 = cljs.core.next.call(null,seq__15382_15442__$1);
var G__15450 = null;
var G__15451 = (0);
var G__15452 = (0);
seq__15382_15432 = G__15449;
chunk__15383_15433 = G__15450;
count__15384_15434 = G__15451;
i__15385_15435 = G__15452;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__15453 = cljs.core.seq.call(null,params);
var chunk__15454 = null;
var count__15455 = (0);
var i__15456 = (0);
while(true){
if((i__15456 < count__15455)){
var param = cljs.core._nth.call(null,chunk__15454,i__15456);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15457 = seq__15453;
var G__15458 = chunk__15454;
var G__15459 = count__15455;
var G__15460 = (i__15456 + (1));
seq__15453 = G__15457;
chunk__15454 = G__15458;
count__15455 = G__15459;
i__15456 = G__15460;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__15453);
if(temp__5720__auto__){
var seq__15453__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15453__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__15453__$1);
var G__15461 = cljs.core.chunk_rest.call(null,seq__15453__$1);
var G__15462 = c__4550__auto__;
var G__15463 = cljs.core.count.call(null,c__4550__auto__);
var G__15464 = (0);
seq__15453 = G__15461;
chunk__15454 = G__15462;
count__15455 = G__15463;
i__15456 = G__15464;
continue;
} else {
var param = cljs.core.first.call(null,seq__15453__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15465 = cljs.core.next.call(null,seq__15453__$1);
var G__15466 = null;
var G__15467 = (0);
var G__15468 = (0);
seq__15453 = G__15465;
chunk__15454 = G__15466;
count__15455 = G__15467;
i__15456 = G__15468;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__15469){
var map__15470 = p__15469;
var map__15470__$1 = (((((!((map__15470 == null))))?(((((map__15470.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15470.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15470):map__15470);
var expr = cljs.core.get.call(null,map__15470__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var type = cljs.core.get.call(null,map__15470__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__15470__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__15470__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__15470__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__15470__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(function ",cljs.compiler.munge.call(null,name),"(");

cljs.compiler.emit_fn_params.call(null,params);

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emits.call(null,"})");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if((((startslice >= (0))) && (cljs.core.integer_QMARK_.call(null,startslice)))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__i"].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__a"].join('');
cljs.compiler.emitln.call(null,"var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");");

cljs.compiler.emitln.call(null,"while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}");

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__15472){
var map__15473 = p__15472;
var map__15473__$1 = (((((!((map__15473 == null))))?(((((map__15473.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15473.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15473):map__15473);
var f = map__15473__$1;
var expr = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var max_fixed_arity = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"fixed-arity","fixed-arity",1586445869));
var variadic = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var type = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__15473__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_15483__$1 = (function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_15484 = cljs.compiler.munge.call(null,name_15483__$1);
var delegate_name_15485 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_15484),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_15485," = function (");

var seq__15475_15486 = cljs.core.seq.call(null,params);
var chunk__15476_15487 = null;
var count__15477_15488 = (0);
var i__15478_15489 = (0);
while(true){
if((i__15478_15489 < count__15477_15488)){
var param_15490 = cljs.core._nth.call(null,chunk__15476_15487,i__15478_15489);
cljs.compiler.emit.call(null,param_15490);

if(cljs.core._EQ_.call(null,param_15490,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15491 = seq__15475_15486;
var G__15492 = chunk__15476_15487;
var G__15493 = count__15477_15488;
var G__15494 = (i__15478_15489 + (1));
seq__15475_15486 = G__15491;
chunk__15476_15487 = G__15492;
count__15477_15488 = G__15493;
i__15478_15489 = G__15494;
continue;
} else {
var temp__5720__auto___15495 = cljs.core.seq.call(null,seq__15475_15486);
if(temp__5720__auto___15495){
var seq__15475_15496__$1 = temp__5720__auto___15495;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15475_15496__$1)){
var c__4550__auto___15497 = cljs.core.chunk_first.call(null,seq__15475_15496__$1);
var G__15498 = cljs.core.chunk_rest.call(null,seq__15475_15496__$1);
var G__15499 = c__4550__auto___15497;
var G__15500 = cljs.core.count.call(null,c__4550__auto___15497);
var G__15501 = (0);
seq__15475_15486 = G__15498;
chunk__15476_15487 = G__15499;
count__15477_15488 = G__15500;
i__15478_15489 = G__15501;
continue;
} else {
var param_15502 = cljs.core.first.call(null,seq__15475_15496__$1);
cljs.compiler.emit.call(null,param_15502);

if(cljs.core._EQ_.call(null,param_15502,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15503 = cljs.core.next.call(null,seq__15475_15496__$1);
var G__15504 = null;
var G__15505 = (0);
var G__15506 = (0);
seq__15475_15486 = G__15503;
chunk__15476_15487 = G__15504;
count__15477_15488 = G__15505;
i__15478_15489 = G__15506;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,"var ",mname_15484," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_15507 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_15507,",0,null);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_15485,".call(this,");

var seq__15479_15508 = cljs.core.seq.call(null,params);
var chunk__15480_15509 = null;
var count__15481_15510 = (0);
var i__15482_15511 = (0);
while(true){
if((i__15482_15511 < count__15481_15510)){
var param_15512 = cljs.core._nth.call(null,chunk__15480_15509,i__15482_15511);
cljs.compiler.emit.call(null,param_15512);

if(cljs.core._EQ_.call(null,param_15512,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15513 = seq__15479_15508;
var G__15514 = chunk__15480_15509;
var G__15515 = count__15481_15510;
var G__15516 = (i__15482_15511 + (1));
seq__15479_15508 = G__15513;
chunk__15480_15509 = G__15514;
count__15481_15510 = G__15515;
i__15482_15511 = G__15516;
continue;
} else {
var temp__5720__auto___15517 = cljs.core.seq.call(null,seq__15479_15508);
if(temp__5720__auto___15517){
var seq__15479_15518__$1 = temp__5720__auto___15517;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15479_15518__$1)){
var c__4550__auto___15519 = cljs.core.chunk_first.call(null,seq__15479_15518__$1);
var G__15520 = cljs.core.chunk_rest.call(null,seq__15479_15518__$1);
var G__15521 = c__4550__auto___15519;
var G__15522 = cljs.core.count.call(null,c__4550__auto___15519);
var G__15523 = (0);
seq__15479_15508 = G__15520;
chunk__15480_15509 = G__15521;
count__15481_15510 = G__15522;
i__15482_15511 = G__15523;
continue;
} else {
var param_15524 = cljs.core.first.call(null,seq__15479_15518__$1);
cljs.compiler.emit.call(null,param_15524);

if(cljs.core._EQ_.call(null,param_15524,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__15525 = cljs.core.next.call(null,seq__15479_15518__$1);
var G__15526 = null;
var G__15527 = (0);
var G__15528 = (0);
seq__15479_15508 = G__15525;
chunk__15480_15509 = G__15526;
count__15481_15510 = G__15527;
i__15482_15511 = G__15528;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_15484,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_15484,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_15483__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_15484,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_15485,";");

cljs.compiler.emitln.call(null,"return ",mname_15484,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__15532){
var map__15533 = p__15532;
var map__15533__$1 = (((((!((map__15533 == null))))?(((((map__15533.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15533.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15533):map__15533);
var variadic = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var name = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var recur_frames = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.call(null,map__15533__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,((function (map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__15529_SHARP_){
var and__4120__auto__ = p1__15529_SHARP_;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__15529_SHARP_));
} else {
return and__4120__auto__;
}
});})(map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,recur_frames)),cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),loop_lets))));
if(loop_locals){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.call(null,"return ");
}
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_15586__$1 = (function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_15587 = cljs.compiler.munge.call(null,name_15586__$1);
var maxparams_15588 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_15589 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (name_15586__$1,mname_15587,maxparams_15588,loop_locals,map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_15587),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_15586__$1,mname_15587,maxparams_15588,loop_locals,map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,methods$));
var ms_15590 = cljs.core.sort_by.call(null,((function (name_15586__$1,mname_15587,maxparams_15588,mmap_15589,loop_locals,map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__15530_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__15530_SHARP_)));
});})(name_15586__$1,mname_15587,maxparams_15588,mmap_15589,loop_locals,map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,cljs.core.seq.call(null,mmap_15589));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_15587," = null;");

var seq__15535_15591 = cljs.core.seq.call(null,ms_15590);
var chunk__15536_15592 = null;
var count__15537_15593 = (0);
var i__15538_15594 = (0);
while(true){
if((i__15538_15594 < count__15537_15593)){
var vec__15545_15595 = cljs.core._nth.call(null,chunk__15536_15592,i__15538_15594);
var n_15596 = cljs.core.nth.call(null,vec__15545_15595,(0),null);
var meth_15597 = cljs.core.nth.call(null,vec__15545_15595,(1),null);
cljs.compiler.emits.call(null,"var ",n_15596," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_15597))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_15597);
} else {
cljs.compiler.emit_fn_method.call(null,meth_15597);
}

cljs.compiler.emitln.call(null,";");


var G__15598 = seq__15535_15591;
var G__15599 = chunk__15536_15592;
var G__15600 = count__15537_15593;
var G__15601 = (i__15538_15594 + (1));
seq__15535_15591 = G__15598;
chunk__15536_15592 = G__15599;
count__15537_15593 = G__15600;
i__15538_15594 = G__15601;
continue;
} else {
var temp__5720__auto___15602 = cljs.core.seq.call(null,seq__15535_15591);
if(temp__5720__auto___15602){
var seq__15535_15603__$1 = temp__5720__auto___15602;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15535_15603__$1)){
var c__4550__auto___15604 = cljs.core.chunk_first.call(null,seq__15535_15603__$1);
var G__15605 = cljs.core.chunk_rest.call(null,seq__15535_15603__$1);
var G__15606 = c__4550__auto___15604;
var G__15607 = cljs.core.count.call(null,c__4550__auto___15604);
var G__15608 = (0);
seq__15535_15591 = G__15605;
chunk__15536_15592 = G__15606;
count__15537_15593 = G__15607;
i__15538_15594 = G__15608;
continue;
} else {
var vec__15548_15609 = cljs.core.first.call(null,seq__15535_15603__$1);
var n_15610 = cljs.core.nth.call(null,vec__15548_15609,(0),null);
var meth_15611 = cljs.core.nth.call(null,vec__15548_15609,(1),null);
cljs.compiler.emits.call(null,"var ",n_15610," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_15611))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_15611);
} else {
cljs.compiler.emit_fn_method.call(null,meth_15611);
}

cljs.compiler.emitln.call(null,";");


var G__15612 = cljs.core.next.call(null,seq__15535_15603__$1);
var G__15613 = null;
var G__15614 = (0);
var G__15615 = (0);
seq__15535_15591 = G__15612;
chunk__15536_15592 = G__15613;
count__15537_15593 = G__15614;
i__15538_15594 = G__15615;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_15587," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_15588),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_15588)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_15588));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__15551_15616 = cljs.core.seq.call(null,ms_15590);
var chunk__15552_15617 = null;
var count__15553_15618 = (0);
var i__15554_15619 = (0);
while(true){
if((i__15554_15619 < count__15553_15618)){
var vec__15561_15620 = cljs.core._nth.call(null,chunk__15552_15617,i__15554_15619);
var n_15621 = cljs.core.nth.call(null,vec__15561_15620,(0),null);
var meth_15622 = cljs.core.nth.call(null,vec__15561_15620,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_15622))){
cljs.compiler.emitln.call(null,"default:");

var restarg_15623 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_15623," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_15624 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_15623," = new cljs.core.IndexedSeq(",a_15624,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_15621,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_15588)),(((cljs.core.count.call(null,maxparams_15588) > (1)))?", ":null),restarg_15623,");");
} else {
var pcnt_15625 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_15622));
cljs.compiler.emitln.call(null,"case ",pcnt_15625,":");

cljs.compiler.emitln.call(null,"return ",n_15621,".call(this",(((pcnt_15625 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_15625,maxparams_15588)),null,(1),null)),(2),null))),");");
}


var G__15626 = seq__15551_15616;
var G__15627 = chunk__15552_15617;
var G__15628 = count__15553_15618;
var G__15629 = (i__15554_15619 + (1));
seq__15551_15616 = G__15626;
chunk__15552_15617 = G__15627;
count__15553_15618 = G__15628;
i__15554_15619 = G__15629;
continue;
} else {
var temp__5720__auto___15630 = cljs.core.seq.call(null,seq__15551_15616);
if(temp__5720__auto___15630){
var seq__15551_15631__$1 = temp__5720__auto___15630;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15551_15631__$1)){
var c__4550__auto___15632 = cljs.core.chunk_first.call(null,seq__15551_15631__$1);
var G__15633 = cljs.core.chunk_rest.call(null,seq__15551_15631__$1);
var G__15634 = c__4550__auto___15632;
var G__15635 = cljs.core.count.call(null,c__4550__auto___15632);
var G__15636 = (0);
seq__15551_15616 = G__15633;
chunk__15552_15617 = G__15634;
count__15553_15618 = G__15635;
i__15554_15619 = G__15636;
continue;
} else {
var vec__15564_15637 = cljs.core.first.call(null,seq__15551_15631__$1);
var n_15638 = cljs.core.nth.call(null,vec__15564_15637,(0),null);
var meth_15639 = cljs.core.nth.call(null,vec__15564_15637,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_15639))){
cljs.compiler.emitln.call(null,"default:");

var restarg_15640 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_15640," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_15641 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_15640," = new cljs.core.IndexedSeq(",a_15641,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_15638,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_15588)),(((cljs.core.count.call(null,maxparams_15588) > (1)))?", ":null),restarg_15640,");");
} else {
var pcnt_15642 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_15639));
cljs.compiler.emitln.call(null,"case ",pcnt_15642,":");

cljs.compiler.emitln.call(null,"return ",n_15638,".call(this",(((pcnt_15642 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_15642,maxparams_15588)),null,(1),null)),(2),null))),");");
}


var G__15643 = cljs.core.next.call(null,seq__15551_15631__$1);
var G__15644 = null;
var G__15645 = (0);
var G__15646 = (0);
seq__15551_15616 = G__15643;
chunk__15552_15617 = G__15644;
count__15553_15618 = G__15645;
i__15554_15619 = G__15646;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"}");

var arg_count_js_15647 = ((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"self__","self__",-153190816,null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,cljs.core.first.call(null,ms_15590)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + ",arg_count_js_15647,"));");

cljs.compiler.emitln.call(null,"};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.call(null,mname_15587,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_15587,".cljs$lang$applyTo = ",cljs.core.some.call(null,((function (name_15586__$1,mname_15587,maxparams_15588,mmap_15589,ms_15590,loop_locals,map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__15531_SHARP_){
var vec__15567 = p1__15531_SHARP_;
var n = cljs.core.nth.call(null,vec__15567,(0),null);
var m = cljs.core.nth.call(null,vec__15567,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_15586__$1,mname_15587,maxparams_15588,mmap_15589,ms_15590,loop_locals,map__15533,map__15533__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,ms_15590),".cljs$lang$applyTo;");
} else {
}

var seq__15570_15648 = cljs.core.seq.call(null,ms_15590);
var chunk__15571_15649 = null;
var count__15572_15650 = (0);
var i__15573_15651 = (0);
while(true){
if((i__15573_15651 < count__15572_15650)){
var vec__15580_15652 = cljs.core._nth.call(null,chunk__15571_15649,i__15573_15651);
var n_15653 = cljs.core.nth.call(null,vec__15580_15652,(0),null);
var meth_15654 = cljs.core.nth.call(null,vec__15580_15652,(1),null);
var c_15655 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_15654));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_15654))){
cljs.compiler.emitln.call(null,mname_15587,".cljs$core$IFn$_invoke$arity$variadic = ",n_15653,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_15587,".cljs$core$IFn$_invoke$arity$",c_15655," = ",n_15653,";");
}


var G__15656 = seq__15570_15648;
var G__15657 = chunk__15571_15649;
var G__15658 = count__15572_15650;
var G__15659 = (i__15573_15651 + (1));
seq__15570_15648 = G__15656;
chunk__15571_15649 = G__15657;
count__15572_15650 = G__15658;
i__15573_15651 = G__15659;
continue;
} else {
var temp__5720__auto___15660 = cljs.core.seq.call(null,seq__15570_15648);
if(temp__5720__auto___15660){
var seq__15570_15661__$1 = temp__5720__auto___15660;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15570_15661__$1)){
var c__4550__auto___15662 = cljs.core.chunk_first.call(null,seq__15570_15661__$1);
var G__15663 = cljs.core.chunk_rest.call(null,seq__15570_15661__$1);
var G__15664 = c__4550__auto___15662;
var G__15665 = cljs.core.count.call(null,c__4550__auto___15662);
var G__15666 = (0);
seq__15570_15648 = G__15663;
chunk__15571_15649 = G__15664;
count__15572_15650 = G__15665;
i__15573_15651 = G__15666;
continue;
} else {
var vec__15583_15667 = cljs.core.first.call(null,seq__15570_15661__$1);
var n_15668 = cljs.core.nth.call(null,vec__15583_15667,(0),null);
var meth_15669 = cljs.core.nth.call(null,vec__15583_15667,(1),null);
var c_15670 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_15669));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_15669))){
cljs.compiler.emitln.call(null,mname_15587,".cljs$core$IFn$_invoke$arity$variadic = ",n_15668,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_15587,".cljs$core$IFn$_invoke$arity$",c_15670," = ",n_15668,";");
}


var G__15671 = cljs.core.next.call(null,seq__15570_15661__$1);
var G__15672 = null;
var G__15673 = (0);
var G__15674 = (0);
seq__15570_15648 = G__15671;
chunk__15571_15649 = G__15672;
count__15572_15650 = G__15673;
i__15573_15651 = G__15674;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_15587,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__15675){
var map__15676 = p__15675;
var map__15676__$1 = (((((!((map__15676 == null))))?(((((map__15676.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15676.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15676):map__15676);
var statements = cljs.core.get.call(null,map__15676__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__15676__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__15676__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

var seq__15678_15682 = cljs.core.seq.call(null,statements);
var chunk__15679_15683 = null;
var count__15680_15684 = (0);
var i__15681_15685 = (0);
while(true){
if((i__15681_15685 < count__15680_15684)){
var s_15686 = cljs.core._nth.call(null,chunk__15679_15683,i__15681_15685);
cljs.compiler.emitln.call(null,s_15686);


var G__15687 = seq__15678_15682;
var G__15688 = chunk__15679_15683;
var G__15689 = count__15680_15684;
var G__15690 = (i__15681_15685 + (1));
seq__15678_15682 = G__15687;
chunk__15679_15683 = G__15688;
count__15680_15684 = G__15689;
i__15681_15685 = G__15690;
continue;
} else {
var temp__5720__auto___15691 = cljs.core.seq.call(null,seq__15678_15682);
if(temp__5720__auto___15691){
var seq__15678_15692__$1 = temp__5720__auto___15691;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15678_15692__$1)){
var c__4550__auto___15693 = cljs.core.chunk_first.call(null,seq__15678_15692__$1);
var G__15694 = cljs.core.chunk_rest.call(null,seq__15678_15692__$1);
var G__15695 = c__4550__auto___15693;
var G__15696 = cljs.core.count.call(null,c__4550__auto___15693);
var G__15697 = (0);
seq__15678_15682 = G__15694;
chunk__15679_15683 = G__15695;
count__15680_15684 = G__15696;
i__15681_15685 = G__15697;
continue;
} else {
var s_15698 = cljs.core.first.call(null,seq__15678_15692__$1);
cljs.compiler.emitln.call(null,s_15698);


var G__15699 = cljs.core.next.call(null,seq__15678_15692__$1);
var G__15700 = null;
var G__15701 = (0);
var G__15702 = (0);
seq__15678_15682 = G__15699;
chunk__15679_15683 = G__15700;
count__15680_15684 = G__15701;
i__15681_15685 = G__15702;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit.call(null,ret);

if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
return cljs.compiler.emitln.call(null,"})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__15703){
var map__15704 = p__15703;
var map__15704__$1 = (((((!((map__15704 == null))))?(((((map__15704.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15704.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15704):map__15704);
var try$ = cljs.core.get.call(null,map__15704__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var env = cljs.core.get.call(null,map__15704__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var catch$ = cljs.core.get.call(null,map__15704__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__15704__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__15704__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,"try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"const","const",1709929842),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.unwrap_quote.call(null,finally$)))){
} else {
throw (new Error(["Assert failed: ","finally block cannot contain constant","\n","(not= :const (:op (ana/unwrap-quote finally)))"].join('')));
}

cljs.compiler.emits.call(null,"finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.call(null,try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__15706,is_loop){
var map__15707 = p__15706;
var map__15707__$1 = (((((!((map__15707 == null))))?(((((map__15707.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15707.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15707):map__15707);
var expr = cljs.core.get.call(null,map__15707__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__15707__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__15707__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__15709_15723 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__15710_15724 = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,((function (_STAR_lexical_renames_STAR__orig_val__15709_15723,context,map__15707,map__15707__$1,expr,bindings,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
});})(_STAR_lexical_renames_STAR__orig_val__15709_15723,context,map__15707,map__15707__$1,expr,bindings,env))
,bindings):null));
cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__15710_15724;

try{var seq__15711_15725 = cljs.core.seq.call(null,bindings);
var chunk__15712_15726 = null;
var count__15713_15727 = (0);
var i__15714_15728 = (0);
while(true){
if((i__15714_15728 < count__15713_15727)){
var map__15719_15729 = cljs.core._nth.call(null,chunk__15712_15726,i__15714_15728);
var map__15719_15730__$1 = (((((!((map__15719_15729 == null))))?(((((map__15719_15729.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15719_15729.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15719_15729):map__15719_15729);
var binding_15731 = map__15719_15730__$1;
var init_15732 = cljs.core.get.call(null,map__15719_15730__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_15731);

cljs.compiler.emitln.call(null," = ",init_15732,";");


var G__15733 = seq__15711_15725;
var G__15734 = chunk__15712_15726;
var G__15735 = count__15713_15727;
var G__15736 = (i__15714_15728 + (1));
seq__15711_15725 = G__15733;
chunk__15712_15726 = G__15734;
count__15713_15727 = G__15735;
i__15714_15728 = G__15736;
continue;
} else {
var temp__5720__auto___15737 = cljs.core.seq.call(null,seq__15711_15725);
if(temp__5720__auto___15737){
var seq__15711_15738__$1 = temp__5720__auto___15737;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15711_15738__$1)){
var c__4550__auto___15739 = cljs.core.chunk_first.call(null,seq__15711_15738__$1);
var G__15740 = cljs.core.chunk_rest.call(null,seq__15711_15738__$1);
var G__15741 = c__4550__auto___15739;
var G__15742 = cljs.core.count.call(null,c__4550__auto___15739);
var G__15743 = (0);
seq__15711_15725 = G__15740;
chunk__15712_15726 = G__15741;
count__15713_15727 = G__15742;
i__15714_15728 = G__15743;
continue;
} else {
var map__15721_15744 = cljs.core.first.call(null,seq__15711_15738__$1);
var map__15721_15745__$1 = (((((!((map__15721_15744 == null))))?(((((map__15721_15744.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15721_15744.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15721_15744):map__15721_15744);
var binding_15746 = map__15721_15745__$1;
var init_15747 = cljs.core.get.call(null,map__15721_15745__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_15746);

cljs.compiler.emitln.call(null," = ",init_15747,";");


var G__15748 = cljs.core.next.call(null,seq__15711_15738__$1);
var G__15749 = null;
var G__15750 = (0);
var G__15751 = (0);
seq__15711_15725 = G__15748;
chunk__15712_15726 = G__15749;
count__15713_15727 = G__15750;
i__15714_15728 = G__15751;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__15709_15723;
}
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let.call(null,ast,false);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let.call(null,ast,true);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__15752){
var map__15753 = p__15752;
var map__15753__$1 = (((((!((map__15753 == null))))?(((((map__15753.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15753.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15753):map__15753);
var frame = cljs.core.get.call(null,map__15753__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__15753__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__15753__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__4607__auto___15755 = cljs.core.count.call(null,exprs);
var i_15756 = (0);
while(true){
if((i_15756 < n__4607__auto___15755)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_15756)," = ",exprs.call(null,i_15756),";");

var G__15757 = (i_15756 + (1));
i_15756 = G__15757;
continue;
} else {
}
break;
}

var n__4607__auto___15758 = cljs.core.count.call(null,exprs);
var i_15759 = (0);
while(true){
if((i_15759 < n__4607__auto___15758)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_15759))," = ",temps.call(null,i_15759),";");

var G__15760 = (i_15759 + (1));
i_15759 = G__15760;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__15761){
var map__15762 = p__15761;
var map__15762__$1 = (((((!((map__15762 == null))))?(((((map__15762.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15762.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15762):map__15762);
var expr = cljs.core.get.call(null,map__15762__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__15762__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__15762__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__15764_15776 = cljs.core.seq.call(null,bindings);
var chunk__15765_15777 = null;
var count__15766_15778 = (0);
var i__15767_15779 = (0);
while(true){
if((i__15767_15779 < count__15766_15778)){
var map__15772_15780 = cljs.core._nth.call(null,chunk__15765_15777,i__15767_15779);
var map__15772_15781__$1 = (((((!((map__15772_15780 == null))))?(((((map__15772_15780.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15772_15780.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15772_15780):map__15772_15780);
var binding_15782 = map__15772_15781__$1;
var init_15783 = cljs.core.get.call(null,map__15772_15781__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_15782)," = ",init_15783,";");


var G__15784 = seq__15764_15776;
var G__15785 = chunk__15765_15777;
var G__15786 = count__15766_15778;
var G__15787 = (i__15767_15779 + (1));
seq__15764_15776 = G__15784;
chunk__15765_15777 = G__15785;
count__15766_15778 = G__15786;
i__15767_15779 = G__15787;
continue;
} else {
var temp__5720__auto___15788 = cljs.core.seq.call(null,seq__15764_15776);
if(temp__5720__auto___15788){
var seq__15764_15789__$1 = temp__5720__auto___15788;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15764_15789__$1)){
var c__4550__auto___15790 = cljs.core.chunk_first.call(null,seq__15764_15789__$1);
var G__15791 = cljs.core.chunk_rest.call(null,seq__15764_15789__$1);
var G__15792 = c__4550__auto___15790;
var G__15793 = cljs.core.count.call(null,c__4550__auto___15790);
var G__15794 = (0);
seq__15764_15776 = G__15791;
chunk__15765_15777 = G__15792;
count__15766_15778 = G__15793;
i__15767_15779 = G__15794;
continue;
} else {
var map__15774_15795 = cljs.core.first.call(null,seq__15764_15789__$1);
var map__15774_15796__$1 = (((((!((map__15774_15795 == null))))?(((((map__15774_15795.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15774_15795.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15774_15795):map__15774_15795);
var binding_15797 = map__15774_15796__$1;
var init_15798 = cljs.core.get.call(null,map__15774_15796__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_15797)," = ",init_15798,";");


var G__15799 = cljs.core.next.call(null,seq__15764_15789__$1);
var G__15800 = null;
var G__15801 = (0);
var G__15802 = (0);
seq__15764_15776 = G__15799;
chunk__15765_15777 = G__15800;
count__15766_15778 = G__15801;
i__15767_15779 = G__15802;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,expr);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym).replace((new RegExp("\\.","g")),"$").replace("/","$")),"$"].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__15805){
var map__15806 = p__15805;
var map__15806__$1 = (((((!((map__15806 == null))))?(((((map__15806.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15806.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15806):map__15806);
var expr = map__15806__$1;
var f = cljs.core.get.call(null,map__15806__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var args = cljs.core.get.call(null,map__15806__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__15806__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__4120__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto__){
var and__4120__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__4120__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__4120__auto__ = protocol;
if(cljs.core.truth_(and__4120__auto__)){
var and__4120__auto____$1 = tag;
if(cljs.core.truth_(and__4120__auto____$1)){
var or__4131__auto__ = (function (){var and__4120__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto____$2){
var and__4120__auto____$3 = protocol;
if(cljs.core.truth_(and__4120__auto____$3)){
return cljs.core._EQ_.call(null,tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__4120__auto____$3;
}
} else {
return and__4120__auto____$2;
}
})();
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto____$2 = (function (){var or__4131__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__4120__auto____$2)){
var or__4131__auto____$1 = cljs.core._EQ_.call(null,protocol,tag);
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
var and__4120__auto____$3 = (!(cljs.core.set_QMARK_.call(null,tag)));
if(and__4120__auto____$3){
var and__4120__auto____$4 = cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"clj","clj",980036099,null),"null",new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),"null",new cljs.core.Symbol(null,"object","object",-1179821820,null),"null",new cljs.core.Symbol(null,"any","any",-948528346,null),"null",new cljs.core.Symbol(null,"js","js",-886355190,null),"null",new cljs.core.Symbol(null,"number","number",-1084057331,null),"null",new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),"null",new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null",new cljs.core.Symbol(null,"function","function",-486723946,null),"null",new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),"null"], null), null).call(null,tag));
if(and__4120__auto____$4){
var temp__5720__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var.call(null,env,tag));
if(cljs.core.truth_(temp__5720__auto__)){
var ps = temp__5720__auto__;
return ps.call(null,protocol);
} else {
return null;
}
} else {
return and__4120__auto____$4;
}
} else {
return and__4120__auto____$3;
}
}
} else {
return and__4120__auto____$2;
}
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
})();
var opt_not_QMARK_ = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.call(null,cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null))));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = ((cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null))));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__4131__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = (function (){var temp__5720__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5720__auto__)){
var ns_str = temp__5720__auto__;
return cljs.core._EQ_.call(null,cljs.core.get.call(null,clojure.string.split.call(null,ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__4131__auto__ = cljs.core._EQ_.call(null,new cljs.core.Symbol("cljs.core","Keyword","cljs.core/Keyword",-451434488,null),cljs.analyzer.infer_tag.call(null,env,f));
if(or__4131__auto__){
return or__4131__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote.call(null,f);
return ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"const","const",1709929842))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__15808 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not.call(null,variadic_QMARK_)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__4120__auto__)){
return (arity > mfa);
} else {
return and__4120__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env){
return (function (p1__15803_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__15803_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env){
return (function (p1__15804_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__15804_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__15806,map__15806__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__15808,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__15808,(1),null);
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"(!(",cljs.core.first.call(null,args),"))");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_15811 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_15811,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_15812 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_15812,args)),(((mfa_15812 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_15812,args)),"], 0))");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = js_QMARK_;
if(or__4131__auto____$1){
return or__4131__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_((function (){var and__4120__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4120__auto__){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1));
} else {
return and__4120__auto__;
}
})())){
var fprop_15813 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
if(cljs.analyzer._STAR_fn_invoke_direct_STAR_){
cljs.compiler.emits.call(null,"(",f__$1,fprop_15813," ? ",f__$1,fprop_15813,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,"(",cljs.compiler.comma_sep.call(null,args),"))");
} else {
cljs.compiler.emits.call(null,"(",f__$1,fprop_15813," ? ",f__$1,fprop_15813,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
}
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__15814){
var map__15815 = p__15814;
var map__15815__$1 = (((((!((map__15815 == null))))?(((((map__15815.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15815.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15815):map__15815);
var ctor = cljs.core.get.call(null,map__15815__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var args = cljs.core.get.call(null,map__15815__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__15815__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__15817){
var map__15818 = p__15817;
var map__15818__$1 = (((((!((map__15818 == null))))?(((((map__15818.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15818.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15818):map__15818);
var target = cljs.core.get.call(null,map__15818__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__15818__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__15818__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,target," = ",val);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
return cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_global_export.call(null,lib)," = goog.global",cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.call(null,cljs.core.name.call(null,(function (){var or__4131__auto__ = cljs.core.get.call(null,global_exports,cljs.core.symbol.call(null,lib));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.get.call(null,global_exports,cljs.core.name.call(null,lib));
}
})()),/\./))),";");
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__15820 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__15820__$1 = (((((!((map__15820 == null))))?(((((map__15820.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15820.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15820):map__15820);
var options = cljs.core.get.call(null,map__15820__$1,new cljs.core.Keyword(null,"options","options",99638489));
var js_dependency_index = cljs.core.get.call(null,map__15820__$1,new cljs.core.Keyword(null,"js-dependency-index","js-dependency-index",-1887042131));
var map__15821 = options;
var map__15821__$1 = (((((!((map__15821 == null))))?(((((map__15821.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15821.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15821):map__15821);
var target = cljs.core.get.call(null,map__15821__$1,new cljs.core.Keyword(null,"target","target",253001721));
var optimizations = cljs.core.get.call(null,map__15821__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
var loaded_libs = cljs.compiler.munge.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.call(null,cljs.core.gensym.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
var vec__15822 = (function (){var libs__$1 = cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.filter.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,libs)),deps));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"nodejs","nodejs",321212524),target)){
var map__15827 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__15827__$1 = (((((!((map__15827 == null))))?(((((map__15827.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15827.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15827):map__15827);
var node_libs = cljs.core.get.call(null,map__15827__$1,true);
var libs_to_load = cljs.core.get.call(null,map__15827__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.call(null,vec__15822,(0),null);
var libs_to_load = cljs.core.nth.call(null,vec__15822,(1),null);
var global_exports_libs = cljs.core.filter.call(null,cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load);
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__15829_15849 = cljs.core.seq.call(null,libs_to_load);
var chunk__15830_15850 = null;
var count__15831_15851 = (0);
var i__15832_15852 = (0);
while(true){
if((i__15832_15852 < count__15831_15851)){
var lib_15853 = cljs.core._nth.call(null,chunk__15830_15850,i__15832_15852);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_15853)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_15853),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_15853),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_15853),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_15853),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_15853,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_15853),"');");
}

}
}
}


var G__15854 = seq__15829_15849;
var G__15855 = chunk__15830_15850;
var G__15856 = count__15831_15851;
var G__15857 = (i__15832_15852 + (1));
seq__15829_15849 = G__15854;
chunk__15830_15850 = G__15855;
count__15831_15851 = G__15856;
i__15832_15852 = G__15857;
continue;
} else {
var temp__5720__auto___15858 = cljs.core.seq.call(null,seq__15829_15849);
if(temp__5720__auto___15858){
var seq__15829_15859__$1 = temp__5720__auto___15858;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15829_15859__$1)){
var c__4550__auto___15860 = cljs.core.chunk_first.call(null,seq__15829_15859__$1);
var G__15861 = cljs.core.chunk_rest.call(null,seq__15829_15859__$1);
var G__15862 = c__4550__auto___15860;
var G__15863 = cljs.core.count.call(null,c__4550__auto___15860);
var G__15864 = (0);
seq__15829_15849 = G__15861;
chunk__15830_15850 = G__15862;
count__15831_15851 = G__15863;
i__15832_15852 = G__15864;
continue;
} else {
var lib_15865 = cljs.core.first.call(null,seq__15829_15859__$1);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_15865)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_15865),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_15865),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_15865),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_15865),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_15865,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_15865),"');");
}

}
}
}


var G__15866 = cljs.core.next.call(null,seq__15829_15859__$1);
var G__15867 = null;
var G__15868 = (0);
var G__15869 = (0);
seq__15829_15849 = G__15866;
chunk__15830_15850 = G__15867;
count__15831_15851 = G__15868;
i__15832_15852 = G__15869;
continue;
}
} else {
}
}
break;
}

var seq__15833_15870 = cljs.core.seq.call(null,node_libs);
var chunk__15834_15871 = null;
var count__15835_15872 = (0);
var i__15836_15873 = (0);
while(true){
if((i__15836_15873 < count__15835_15872)){
var lib_15874 = cljs.core._nth.call(null,chunk__15834_15871,i__15836_15873);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_15874)," = require('",lib_15874,"');");


var G__15875 = seq__15833_15870;
var G__15876 = chunk__15834_15871;
var G__15877 = count__15835_15872;
var G__15878 = (i__15836_15873 + (1));
seq__15833_15870 = G__15875;
chunk__15834_15871 = G__15876;
count__15835_15872 = G__15877;
i__15836_15873 = G__15878;
continue;
} else {
var temp__5720__auto___15879 = cljs.core.seq.call(null,seq__15833_15870);
if(temp__5720__auto___15879){
var seq__15833_15880__$1 = temp__5720__auto___15879;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15833_15880__$1)){
var c__4550__auto___15881 = cljs.core.chunk_first.call(null,seq__15833_15880__$1);
var G__15882 = cljs.core.chunk_rest.call(null,seq__15833_15880__$1);
var G__15883 = c__4550__auto___15881;
var G__15884 = cljs.core.count.call(null,c__4550__auto___15881);
var G__15885 = (0);
seq__15833_15870 = G__15882;
chunk__15834_15871 = G__15883;
count__15835_15872 = G__15884;
i__15836_15873 = G__15885;
continue;
} else {
var lib_15886 = cljs.core.first.call(null,seq__15833_15880__$1);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_15886)," = require('",lib_15886,"');");


var G__15887 = cljs.core.next.call(null,seq__15833_15880__$1);
var G__15888 = null;
var G__15889 = (0);
var G__15890 = (0);
seq__15833_15870 = G__15887;
chunk__15834_15871 = G__15888;
count__15835_15872 = G__15889;
i__15836_15873 = G__15890;
continue;
}
} else {
}
}
break;
}

var seq__15837_15891 = cljs.core.seq.call(null,global_exports_libs);
var chunk__15838_15892 = null;
var count__15839_15893 = (0);
var i__15840_15894 = (0);
while(true){
if((i__15840_15894 < count__15839_15893)){
var lib_15895 = cljs.core._nth.call(null,chunk__15838_15892,i__15840_15894);
var map__15845_15896 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,lib_15895));
var map__15845_15897__$1 = (((((!((map__15845_15896 == null))))?(((((map__15845_15896.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15845_15896.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15845_15896):map__15845_15896);
var global_exports_15898 = cljs.core.get.call(null,map__15845_15897__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_15898,lib_15895);


var G__15899 = seq__15837_15891;
var G__15900 = chunk__15838_15892;
var G__15901 = count__15839_15893;
var G__15902 = (i__15840_15894 + (1));
seq__15837_15891 = G__15899;
chunk__15838_15892 = G__15900;
count__15839_15893 = G__15901;
i__15840_15894 = G__15902;
continue;
} else {
var temp__5720__auto___15903 = cljs.core.seq.call(null,seq__15837_15891);
if(temp__5720__auto___15903){
var seq__15837_15904__$1 = temp__5720__auto___15903;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15837_15904__$1)){
var c__4550__auto___15905 = cljs.core.chunk_first.call(null,seq__15837_15904__$1);
var G__15906 = cljs.core.chunk_rest.call(null,seq__15837_15904__$1);
var G__15907 = c__4550__auto___15905;
var G__15908 = cljs.core.count.call(null,c__4550__auto___15905);
var G__15909 = (0);
seq__15837_15891 = G__15906;
chunk__15838_15892 = G__15907;
count__15839_15893 = G__15908;
i__15840_15894 = G__15909;
continue;
} else {
var lib_15910 = cljs.core.first.call(null,seq__15837_15904__$1);
var map__15847_15911 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,lib_15910));
var map__15847_15912__$1 = (((((!((map__15847_15911 == null))))?(((((map__15847_15911.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15847_15911.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15847_15911):map__15847_15911);
var global_exports_15913 = cljs.core.get.call(null,map__15847_15912__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_15913,lib_15910);


var G__15914 = cljs.core.next.call(null,seq__15837_15904__$1);
var G__15915 = null;
var G__15916 = (0);
var G__15917 = (0);
seq__15837_15891 = G__15914;
chunk__15838_15892 = G__15915;
count__15839_15893 = G__15916;
i__15840_15894 = G__15917;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
return cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__15918){
var map__15919 = p__15918;
var map__15919__$1 = (((((!((map__15919 == null))))?(((((map__15919.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15919.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15919):map__15919);
var name = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__15919__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-env","repl-env",-1976503928).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"'nil';");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__15921){
var map__15922 = p__15921;
var map__15922__$1 = (((((!((map__15922 == null))))?(((((map__15922.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15922.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15922):map__15922);
var name = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__15922__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");
} else {
}
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype","deftype",340294561),(function (p__15924){
var map__15925 = p__15924;
var map__15925__$1 = (((((!((map__15925 == null))))?(((((map__15925.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15925.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15925):map__15925);
var t = cljs.core.get.call(null,map__15925__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__15925__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__15925__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__15925__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__15925__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__15927_15951 = cljs.core.seq.call(null,protocols);
var chunk__15928_15952 = null;
var count__15929_15953 = (0);
var i__15930_15954 = (0);
while(true){
if((i__15930_15954 < count__15929_15953)){
var protocol_15955 = cljs.core._nth.call(null,chunk__15928_15952,i__15930_15954);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_15955)),"}");


var G__15956 = seq__15927_15951;
var G__15957 = chunk__15928_15952;
var G__15958 = count__15929_15953;
var G__15959 = (i__15930_15954 + (1));
seq__15927_15951 = G__15956;
chunk__15928_15952 = G__15957;
count__15929_15953 = G__15958;
i__15930_15954 = G__15959;
continue;
} else {
var temp__5720__auto___15960 = cljs.core.seq.call(null,seq__15927_15951);
if(temp__5720__auto___15960){
var seq__15927_15961__$1 = temp__5720__auto___15960;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15927_15961__$1)){
var c__4550__auto___15962 = cljs.core.chunk_first.call(null,seq__15927_15961__$1);
var G__15963 = cljs.core.chunk_rest.call(null,seq__15927_15961__$1);
var G__15964 = c__4550__auto___15962;
var G__15965 = cljs.core.count.call(null,c__4550__auto___15962);
var G__15966 = (0);
seq__15927_15951 = G__15963;
chunk__15928_15952 = G__15964;
count__15929_15953 = G__15965;
i__15930_15954 = G__15966;
continue;
} else {
var protocol_15967 = cljs.core.first.call(null,seq__15927_15961__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_15967)),"}");


var G__15968 = cljs.core.next.call(null,seq__15927_15961__$1);
var G__15969 = null;
var G__15970 = (0);
var G__15971 = (0);
seq__15927_15951 = G__15968;
chunk__15928_15952 = G__15969;
count__15929_15953 = G__15970;
i__15930_15954 = G__15971;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__15931_15972 = cljs.core.seq.call(null,fields__$1);
var chunk__15932_15973 = null;
var count__15933_15974 = (0);
var i__15934_15975 = (0);
while(true){
if((i__15934_15975 < count__15933_15974)){
var fld_15976 = cljs.core._nth.call(null,chunk__15932_15973,i__15934_15975);
cljs.compiler.emitln.call(null,"this.",fld_15976," = ",fld_15976,";");


var G__15977 = seq__15931_15972;
var G__15978 = chunk__15932_15973;
var G__15979 = count__15933_15974;
var G__15980 = (i__15934_15975 + (1));
seq__15931_15972 = G__15977;
chunk__15932_15973 = G__15978;
count__15933_15974 = G__15979;
i__15934_15975 = G__15980;
continue;
} else {
var temp__5720__auto___15981 = cljs.core.seq.call(null,seq__15931_15972);
if(temp__5720__auto___15981){
var seq__15931_15982__$1 = temp__5720__auto___15981;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15931_15982__$1)){
var c__4550__auto___15983 = cljs.core.chunk_first.call(null,seq__15931_15982__$1);
var G__15984 = cljs.core.chunk_rest.call(null,seq__15931_15982__$1);
var G__15985 = c__4550__auto___15983;
var G__15986 = cljs.core.count.call(null,c__4550__auto___15983);
var G__15987 = (0);
seq__15931_15972 = G__15984;
chunk__15932_15973 = G__15985;
count__15933_15974 = G__15986;
i__15934_15975 = G__15987;
continue;
} else {
var fld_15988 = cljs.core.first.call(null,seq__15931_15982__$1);
cljs.compiler.emitln.call(null,"this.",fld_15988," = ",fld_15988,";");


var G__15989 = cljs.core.next.call(null,seq__15931_15982__$1);
var G__15990 = null;
var G__15991 = (0);
var G__15992 = (0);
seq__15931_15972 = G__15989;
chunk__15932_15973 = G__15990;
count__15933_15974 = G__15991;
i__15934_15975 = G__15992;
continue;
}
} else {
}
}
break;
}

var seq__15935_15993 = cljs.core.seq.call(null,pmasks);
var chunk__15936_15994 = null;
var count__15937_15995 = (0);
var i__15938_15996 = (0);
while(true){
if((i__15938_15996 < count__15937_15995)){
var vec__15945_15997 = cljs.core._nth.call(null,chunk__15936_15994,i__15938_15996);
var pno_15998 = cljs.core.nth.call(null,vec__15945_15997,(0),null);
var pmask_15999 = cljs.core.nth.call(null,vec__15945_15997,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_15998,"$ = ",pmask_15999,";");


var G__16000 = seq__15935_15993;
var G__16001 = chunk__15936_15994;
var G__16002 = count__15937_15995;
var G__16003 = (i__15938_15996 + (1));
seq__15935_15993 = G__16000;
chunk__15936_15994 = G__16001;
count__15937_15995 = G__16002;
i__15938_15996 = G__16003;
continue;
} else {
var temp__5720__auto___16004 = cljs.core.seq.call(null,seq__15935_15993);
if(temp__5720__auto___16004){
var seq__15935_16005__$1 = temp__5720__auto___16004;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15935_16005__$1)){
var c__4550__auto___16006 = cljs.core.chunk_first.call(null,seq__15935_16005__$1);
var G__16007 = cljs.core.chunk_rest.call(null,seq__15935_16005__$1);
var G__16008 = c__4550__auto___16006;
var G__16009 = cljs.core.count.call(null,c__4550__auto___16006);
var G__16010 = (0);
seq__15935_15993 = G__16007;
chunk__15936_15994 = G__16008;
count__15937_15995 = G__16009;
i__15938_15996 = G__16010;
continue;
} else {
var vec__15948_16011 = cljs.core.first.call(null,seq__15935_16005__$1);
var pno_16012 = cljs.core.nth.call(null,vec__15948_16011,(0),null);
var pmask_16013 = cljs.core.nth.call(null,vec__15948_16011,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_16012,"$ = ",pmask_16013,";");


var G__16014 = cljs.core.next.call(null,seq__15935_16005__$1);
var G__16015 = null;
var G__16016 = (0);
var G__16017 = (0);
seq__15935_15993 = G__16014;
chunk__15936_15994 = G__16015;
count__15937_15995 = G__16016;
i__15938_15996 = G__16017;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord","defrecord",-1367493418),(function (p__16018){
var map__16019 = p__16018;
var map__16019__$1 = (((((!((map__16019 == null))))?(((((map__16019.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16019.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16019):map__16019);
var t = cljs.core.get.call(null,map__16019__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__16019__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__16019__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__16019__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__16019__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__16021_16045 = cljs.core.seq.call(null,protocols);
var chunk__16022_16046 = null;
var count__16023_16047 = (0);
var i__16024_16048 = (0);
while(true){
if((i__16024_16048 < count__16023_16047)){
var protocol_16049 = cljs.core._nth.call(null,chunk__16022_16046,i__16024_16048);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_16049)),"}");


var G__16050 = seq__16021_16045;
var G__16051 = chunk__16022_16046;
var G__16052 = count__16023_16047;
var G__16053 = (i__16024_16048 + (1));
seq__16021_16045 = G__16050;
chunk__16022_16046 = G__16051;
count__16023_16047 = G__16052;
i__16024_16048 = G__16053;
continue;
} else {
var temp__5720__auto___16054 = cljs.core.seq.call(null,seq__16021_16045);
if(temp__5720__auto___16054){
var seq__16021_16055__$1 = temp__5720__auto___16054;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16021_16055__$1)){
var c__4550__auto___16056 = cljs.core.chunk_first.call(null,seq__16021_16055__$1);
var G__16057 = cljs.core.chunk_rest.call(null,seq__16021_16055__$1);
var G__16058 = c__4550__auto___16056;
var G__16059 = cljs.core.count.call(null,c__4550__auto___16056);
var G__16060 = (0);
seq__16021_16045 = G__16057;
chunk__16022_16046 = G__16058;
count__16023_16047 = G__16059;
i__16024_16048 = G__16060;
continue;
} else {
var protocol_16061 = cljs.core.first.call(null,seq__16021_16055__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_16061)),"}");


var G__16062 = cljs.core.next.call(null,seq__16021_16055__$1);
var G__16063 = null;
var G__16064 = (0);
var G__16065 = (0);
seq__16021_16045 = G__16062;
chunk__16022_16046 = G__16063;
count__16023_16047 = G__16064;
i__16024_16048 = G__16065;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__16025_16066 = cljs.core.seq.call(null,fields__$1);
var chunk__16026_16067 = null;
var count__16027_16068 = (0);
var i__16028_16069 = (0);
while(true){
if((i__16028_16069 < count__16027_16068)){
var fld_16070 = cljs.core._nth.call(null,chunk__16026_16067,i__16028_16069);
cljs.compiler.emitln.call(null,"this.",fld_16070," = ",fld_16070,";");


var G__16071 = seq__16025_16066;
var G__16072 = chunk__16026_16067;
var G__16073 = count__16027_16068;
var G__16074 = (i__16028_16069 + (1));
seq__16025_16066 = G__16071;
chunk__16026_16067 = G__16072;
count__16027_16068 = G__16073;
i__16028_16069 = G__16074;
continue;
} else {
var temp__5720__auto___16075 = cljs.core.seq.call(null,seq__16025_16066);
if(temp__5720__auto___16075){
var seq__16025_16076__$1 = temp__5720__auto___16075;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16025_16076__$1)){
var c__4550__auto___16077 = cljs.core.chunk_first.call(null,seq__16025_16076__$1);
var G__16078 = cljs.core.chunk_rest.call(null,seq__16025_16076__$1);
var G__16079 = c__4550__auto___16077;
var G__16080 = cljs.core.count.call(null,c__4550__auto___16077);
var G__16081 = (0);
seq__16025_16066 = G__16078;
chunk__16026_16067 = G__16079;
count__16027_16068 = G__16080;
i__16028_16069 = G__16081;
continue;
} else {
var fld_16082 = cljs.core.first.call(null,seq__16025_16076__$1);
cljs.compiler.emitln.call(null,"this.",fld_16082," = ",fld_16082,";");


var G__16083 = cljs.core.next.call(null,seq__16025_16076__$1);
var G__16084 = null;
var G__16085 = (0);
var G__16086 = (0);
seq__16025_16066 = G__16083;
chunk__16026_16067 = G__16084;
count__16027_16068 = G__16085;
i__16028_16069 = G__16086;
continue;
}
} else {
}
}
break;
}

var seq__16029_16087 = cljs.core.seq.call(null,pmasks);
var chunk__16030_16088 = null;
var count__16031_16089 = (0);
var i__16032_16090 = (0);
while(true){
if((i__16032_16090 < count__16031_16089)){
var vec__16039_16091 = cljs.core._nth.call(null,chunk__16030_16088,i__16032_16090);
var pno_16092 = cljs.core.nth.call(null,vec__16039_16091,(0),null);
var pmask_16093 = cljs.core.nth.call(null,vec__16039_16091,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_16092,"$ = ",pmask_16093,";");


var G__16094 = seq__16029_16087;
var G__16095 = chunk__16030_16088;
var G__16096 = count__16031_16089;
var G__16097 = (i__16032_16090 + (1));
seq__16029_16087 = G__16094;
chunk__16030_16088 = G__16095;
count__16031_16089 = G__16096;
i__16032_16090 = G__16097;
continue;
} else {
var temp__5720__auto___16098 = cljs.core.seq.call(null,seq__16029_16087);
if(temp__5720__auto___16098){
var seq__16029_16099__$1 = temp__5720__auto___16098;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16029_16099__$1)){
var c__4550__auto___16100 = cljs.core.chunk_first.call(null,seq__16029_16099__$1);
var G__16101 = cljs.core.chunk_rest.call(null,seq__16029_16099__$1);
var G__16102 = c__4550__auto___16100;
var G__16103 = cljs.core.count.call(null,c__4550__auto___16100);
var G__16104 = (0);
seq__16029_16087 = G__16101;
chunk__16030_16088 = G__16102;
count__16031_16089 = G__16103;
i__16032_16090 = G__16104;
continue;
} else {
var vec__16042_16105 = cljs.core.first.call(null,seq__16029_16099__$1);
var pno_16106 = cljs.core.nth.call(null,vec__16042_16105,(0),null);
var pmask_16107 = cljs.core.nth.call(null,vec__16042_16105,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_16106,"$ = ",pmask_16107,";");


var G__16108 = cljs.core.next.call(null,seq__16029_16099__$1);
var G__16109 = null;
var G__16110 = (0);
var G__16111 = (0);
seq__16029_16087 = G__16108;
chunk__16030_16088 = G__16109;
count__16031_16089 = G__16110;
i__16032_16090 = G__16111;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__16112){
var map__16113 = p__16112;
var map__16113__$1 = (((((!((map__16113 == null))))?(((((map__16113.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16113.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16113):map__16113);
var target = cljs.core.get.call(null,map__16113__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__16113__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__16113__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__16113__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__16113__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-field","host-field",-72662140),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-call","host-call",1059629755),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__16115){
var map__16116 = p__16115;
var map__16116__$1 = (((((!((map__16116 == null))))?(((((map__16116.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__16116.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16116):map__16116);
var op = cljs.core.get.call(null,map__16116__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__16116__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__16116__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__16116__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__16116__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__4120__auto__ = code;
if(cljs.core.truth_(and__4120__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__4120__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__14910__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14910__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

var seq__16122 = cljs.core.seq.call(null,table);
var chunk__16123 = null;
var count__16124 = (0);
var i__16125 = (0);
while(true){
if((i__16125 < count__16124)){
var vec__16132 = cljs.core._nth.call(null,chunk__16123,i__16125);
var sym = cljs.core.nth.call(null,vec__16132,(0),null);
var value = cljs.core.nth.call(null,vec__16132,(1),null);
var ns_16138 = cljs.core.namespace.call(null,sym);
var name_16139 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__16140 = seq__16122;
var G__16141 = chunk__16123;
var G__16142 = count__16124;
var G__16143 = (i__16125 + (1));
seq__16122 = G__16140;
chunk__16123 = G__16141;
count__16124 = G__16142;
i__16125 = G__16143;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__16122);
if(temp__5720__auto__){
var seq__16122__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16122__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__16122__$1);
var G__16144 = cljs.core.chunk_rest.call(null,seq__16122__$1);
var G__16145 = c__4550__auto__;
var G__16146 = cljs.core.count.call(null,c__4550__auto__);
var G__16147 = (0);
seq__16122 = G__16144;
chunk__16123 = G__16145;
count__16124 = G__16146;
i__16125 = G__16147;
continue;
} else {
var vec__16135 = cljs.core.first.call(null,seq__16122__$1);
var sym = cljs.core.nth.call(null,vec__16135,(0),null);
var value = cljs.core.nth.call(null,vec__16135,(1),null);
var ns_16148 = cljs.core.namespace.call(null,sym);
var name_16149 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),new cljs.core.Keyword(null,"compilation","compilation",-1328774561)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__16150 = cljs.core.next.call(null,seq__16122__$1);
var G__16151 = null;
var G__16152 = (0);
var G__16153 = (0);
seq__16122 = G__16150;
chunk__16123 = G__16151;
count__16124 = G__16152;
i__16125 = G__16153;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var G__16155 = arguments.length;
switch (G__16155) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.call(null,cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?new cljs.core.Keyword("cljs.analyzer","externs","cljs.analyzer/externs",893359239).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)):null));
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq.call(null,cljs.core.keys.call(null,externs));
while(true){
if(ks){
var k_16160 = cljs.core.first.call(null,ks);
var vec__16156_16161 = cljs.core.conj.call(null,prefix,k_16160);
var top_16162 = cljs.core.nth.call(null,vec__16156_16161,(0),null);
var prefix_SINGLEQUOTE__16163 = vec__16156_16161;
if(((cljs.core.not_EQ_.call(null,new cljs.core.Symbol(null,"prototype","prototype",519166522,null),k_16160)) && ((cljs.core.get_in.call(null,known_externs,prefix_SINGLEQUOTE__16163) == null)))){
if((!(((cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,top_level),top_16162)) || (cljs.core.contains_QMARK_.call(null,known_externs,top_16162)))))){
cljs.compiler.emitln.call(null,"var ",clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__16163)),";");

cljs.core.swap_BANG_.call(null,top_level,cljs.core.conj,top_16162);
} else {
cljs.compiler.emitln.call(null,clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__16163)),";");
}
} else {
}

var m_16164 = cljs.core.get.call(null,externs,k_16160);
if(cljs.core.empty_QMARK_.call(null,m_16164)){
} else {
cljs.compiler.emit_externs.call(null,prefix_SINGLEQUOTE__16163,m_16164,top_level,known_externs);
}

var G__16165 = cljs.core.next.call(null,ks);
ks = G__16165;
continue;
} else {
return null;
}
break;
}
});

cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4;

