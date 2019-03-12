// Compiled by ClojureScript 1.10.520 {}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.call(null,(function (m,p__13808){
var vec__13809 = p__13808;
var i = cljs.core.nth.call(null,vec__13809,(0),null);
var v = cljs.core.nth.call(null,vec__13809,(1),null);
return cljs.core.assoc.call(null,m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.call(null,(function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources.call(null,sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare.call(null,sources__$1.call(null,a),sources__$1.call(null,b));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__13812 = seg;
var gcol = cljs.core.nth.call(null,vec__13812,(0),null);
var source = cljs.core.nth.call(null,vec__13812,(1),null);
var line = cljs.core.nth.call(null,vec__13812,(2),null);
var col = cljs.core.nth.call(null,vec__13812,(3),null);
var name = cljs.core.nth.call(null,vec__13812,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__5720__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,seg));
if(cljs.core.truth_(temp__5720__auto__)){
var name__$1 = temp__5720__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__13815 = seg;
var gcol = cljs.core.nth.call(null,vec__13815,(0),null);
var source = cljs.core.nth.call(null,vec__13815,(1),null);
var line = cljs.core.nth.call(null,vec__13815,(2),null);
var col = cljs.core.nth.call(null,vec__13815,(3),null);
var name = cljs.core.nth.call(null,vec__13815,(4),null);
var vec__13818 = relseg;
var rgcol = cljs.core.nth.call(null,vec__13818,(0),null);
var rsource = cljs.core.nth.call(null,vec__13818,(1),null);
var rline = cljs.core.nth.call(null,vec__13818,(2),null);
var rcol = cljs.core.nth.call(null,vec__13818,(3),null);
var rname = cljs.core.nth.call(null,vec__13818,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__4131__auto__ = source;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__4131__auto__ = line;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__4131__auto__ = col;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta.call(null,nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__13821 = segmap;
var map__13821__$1 = (((((!((map__13821 == null))))?(((((map__13821.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13821.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13821):map__13821);
var gcol = cljs.core.get.call(null,map__13821__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__13821__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__13821__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__13821__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__13821__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,((function (map__13821,map__13821__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,((function (map__13821,map__13821__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,((function (map__13821,map__13821__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.call(null,v,d__$1);
});})(map__13821,map__13821__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13821,map__13821__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});})(map__13821,map__13821__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__13824 = arguments.length;
switch (G__13824) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by.call(null,cljs.source_map.source_compare.call(null,sources));
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__13828 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__13832 = cljs.core.next.call(null,segs__$1);
var G__13833 = nrelseg;
var G__13834 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__13832;
relseg__$1 = G__13833;
result__$1 = G__13834;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__13828,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__13828,(1),null);
var G__13835 = (gline + (1));
var G__13836 = cljs.core.next.call(null,lines__$1);
var G__13837 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__13838 = result__$1;
gline = G__13835;
lines__$1 = G__13836;
relseg = G__13837;
result = G__13838;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__13840 = segmap;
var map__13840__$1 = (((((!((map__13840 == null))))?(((((map__13840.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13840.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13840):map__13840);
var gcol = cljs.core.get.call(null,map__13840__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__13840__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__13840__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__13840__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__13840__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,((function (map__13840,map__13840__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,((function (map__13840,map__13840__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__13839_SHARP_){
return cljs.core.conj.call(null,p1__13839_SHARP_,d__$1);
});})(map__13840,map__13840__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13840,map__13840__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__13843 = arguments.length;
switch (G__13843) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__13847 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__13851 = cljs.core.next.call(null,segs__$1);
var G__13852 = nrelseg;
var G__13853 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__13851;
relseg__$1 = G__13852;
result__$1 = G__13853;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__13847,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__13847,(1),null);
var G__13854 = (gline + (1));
var G__13855 = cljs.core.next.call(null,lines__$1);
var G__13856 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__13857 = result__$1;
gline = G__13854;
lines__$1 = G__13855;
relseg = G__13856;
result = G__13857;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.call(null,((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.call(null,relseg,((function (relseg){
return (function (p__13858){
var vec__13859 = p__13858;
var _ = cljs.core.nth.call(null,vec__13859,(0),null);
var source = cljs.core.nth.call(null,vec__13859,(1),null);
var line = cljs.core.nth.call(null,vec__13859,(2),null);
var col = cljs.core.nth.call(null,vec__13859,(3),null);
var name = cljs.core.nth.call(null,vec__13859,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,((function (relseg){
return (function (cols__$1,p__13862){
var vec__13863 = p__13862;
var gcol = cljs.core.nth.call(null,vec__13863,(0),null);
var sidx = cljs.core.nth.call(null,vec__13863,(1),null);
var line = cljs.core.nth.call(null,vec__13863,(2),null);
var col = cljs.core.nth.call(null,vec__13863,(3),null);
var name = cljs.core.nth.call(null,vec__13863,(4),null);
var seg = vec__13863;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,((function (offset,vec__13863,gcol,sidx,line,col,name,seg,relseg){
return (function (p__13866){
var vec__13867 = p__13866;
var _ = cljs.core.nth.call(null,vec__13867,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__13867,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__13867,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__13867,(3),null);
var lname = cljs.core.nth.call(null,vec__13867,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__4131__auto__ = name;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__13863,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.call(null,cols__$1,cljs.source_map.base64_vlq.encode.call(null,offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.call(null,(0));
var preamble_lines = cljs.core.take.call(null,(function (){var or__4131__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.call(null,cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__5718__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5718__auto__)){
var name = temp__5718__auto__;
var idx = (function (){var temp__5718__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,names__GT_idx),name);
if(cljs.core.truth_(temp__5718__auto____$1)){
var idx = temp__5718__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref.call(null,name_idx);
cljs.core.swap_BANG_.call(null,names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.call(null,name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.call(null,segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__13873 = cljs.core.seq.call(null,infos);
var chunk__13874 = null;
var count__13875 = (0);
var i__13876 = (0);
while(true){
if((i__13876 < count__13875)){
var info = cljs.core._nth.call(null,chunk__13874,i__13876);
var segv_14227 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_14228 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_14229 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_14228 > (lc_14229 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__13873,chunk__13874,count__13875,i__13876,segv_14227,gline_14228,lc_14229,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_14228 - (lc_14229 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_14227], null));
});})(seq__13873,chunk__13874,count__13875,i__13876,segv_14227,gline_14228,lc_14229,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__13873,chunk__13874,count__13875,i__13876,segv_14227,gline_14228,lc_14229,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14228], null),cljs.core.conj,segv_14227);
});})(seq__13873,chunk__13874,count__13875,i__13876,segv_14227,gline_14228,lc_14229,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__14230 = seq__13873;
var G__14231 = chunk__13874;
var G__14232 = count__13875;
var G__14233 = (i__13876 + (1));
seq__13873 = G__14230;
chunk__13874 = G__14231;
count__13875 = G__14232;
i__13876 = G__14233;
continue;
} else {
var temp__5720__auto__ = cljs.core.seq.call(null,seq__13873);
if(temp__5720__auto__){
var seq__13873__$1 = temp__5720__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13873__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__13873__$1);
var G__14234 = cljs.core.chunk_rest.call(null,seq__13873__$1);
var G__14235 = c__4550__auto__;
var G__14236 = cljs.core.count.call(null,c__4550__auto__);
var G__14237 = (0);
seq__13873 = G__14234;
chunk__13874 = G__14235;
count__13875 = G__14236;
i__13876 = G__14237;
continue;
} else {
var info = cljs.core.first.call(null,seq__13873__$1);
var segv_14238 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_14239 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_14240 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_14239 > (lc_14240 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__13873,chunk__13874,count__13875,i__13876,segv_14238,gline_14239,lc_14240,info,seq__13873__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_14239 - (lc_14240 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_14238], null));
});})(seq__13873,chunk__13874,count__13875,i__13876,segv_14238,gline_14239,lc_14240,info,seq__13873__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__13873,chunk__13874,count__13875,i__13876,segv_14238,gline_14239,lc_14240,info,seq__13873__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14239], null),cljs.core.conj,segv_14238);
});})(seq__13873,chunk__13874,count__13875,i__13876,segv_14238,gline_14239,lc_14240,info,seq__13873__$1,temp__5720__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__14241 = cljs.core.next.call(null,seq__13873__$1);
var G__14242 = null;
var G__14243 = (0);
var G__14244 = (0);
seq__13873 = G__14241;
chunk__13874 = G__14242;
count__13875 = G__14243;
i__13876 = G__14244;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__13877_14245 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__13878_14246 = null;
var count__13879_14247 = (0);
var i__13880_14248 = (0);
while(true){
if((i__13880_14248 < count__13879_14247)){
var vec__14053_14249 = cljs.core._nth.call(null,chunk__13878_14246,i__13880_14248);
var source_idx_14250 = cljs.core.nth.call(null,vec__14053_14249,(0),null);
var vec__14056_14251 = cljs.core.nth.call(null,vec__14053_14249,(1),null);
var __14252 = cljs.core.nth.call(null,vec__14056_14251,(0),null);
var lines_14253__$1 = cljs.core.nth.call(null,vec__14056_14251,(1),null);
var seq__14059_14254 = cljs.core.seq.call(null,lines_14253__$1);
var chunk__14060_14255 = null;
var count__14061_14256 = (0);
var i__14062_14257 = (0);
while(true){
if((i__14062_14257 < count__14061_14256)){
var vec__14101_14258 = cljs.core._nth.call(null,chunk__14060_14255,i__14062_14257);
var line_14259 = cljs.core.nth.call(null,vec__14101_14258,(0),null);
var cols_14260 = cljs.core.nth.call(null,vec__14101_14258,(1),null);
var seq__14104_14261 = cljs.core.seq.call(null,cols_14260);
var chunk__14105_14262 = null;
var count__14106_14263 = (0);
var i__14107_14264 = (0);
while(true){
if((i__14107_14264 < count__14106_14263)){
var vec__14114_14265 = cljs.core._nth.call(null,chunk__14105_14262,i__14107_14264);
var col_14266 = cljs.core.nth.call(null,vec__14114_14265,(0),null);
var infos_14267 = cljs.core.nth.call(null,vec__14114_14265,(1),null);
encode_cols.call(null,infos_14267,source_idx_14250,line_14259,col_14266);


var G__14268 = seq__14104_14261;
var G__14269 = chunk__14105_14262;
var G__14270 = count__14106_14263;
var G__14271 = (i__14107_14264 + (1));
seq__14104_14261 = G__14268;
chunk__14105_14262 = G__14269;
count__14106_14263 = G__14270;
i__14107_14264 = G__14271;
continue;
} else {
var temp__5720__auto___14272 = cljs.core.seq.call(null,seq__14104_14261);
if(temp__5720__auto___14272){
var seq__14104_14273__$1 = temp__5720__auto___14272;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14104_14273__$1)){
var c__4550__auto___14274 = cljs.core.chunk_first.call(null,seq__14104_14273__$1);
var G__14275 = cljs.core.chunk_rest.call(null,seq__14104_14273__$1);
var G__14276 = c__4550__auto___14274;
var G__14277 = cljs.core.count.call(null,c__4550__auto___14274);
var G__14278 = (0);
seq__14104_14261 = G__14275;
chunk__14105_14262 = G__14276;
count__14106_14263 = G__14277;
i__14107_14264 = G__14278;
continue;
} else {
var vec__14117_14279 = cljs.core.first.call(null,seq__14104_14273__$1);
var col_14280 = cljs.core.nth.call(null,vec__14117_14279,(0),null);
var infos_14281 = cljs.core.nth.call(null,vec__14117_14279,(1),null);
encode_cols.call(null,infos_14281,source_idx_14250,line_14259,col_14280);


var G__14282 = cljs.core.next.call(null,seq__14104_14273__$1);
var G__14283 = null;
var G__14284 = (0);
var G__14285 = (0);
seq__14104_14261 = G__14282;
chunk__14105_14262 = G__14283;
count__14106_14263 = G__14284;
i__14107_14264 = G__14285;
continue;
}
} else {
}
}
break;
}


var G__14286 = seq__14059_14254;
var G__14287 = chunk__14060_14255;
var G__14288 = count__14061_14256;
var G__14289 = (i__14062_14257 + (1));
seq__14059_14254 = G__14286;
chunk__14060_14255 = G__14287;
count__14061_14256 = G__14288;
i__14062_14257 = G__14289;
continue;
} else {
var temp__5720__auto___14290 = cljs.core.seq.call(null,seq__14059_14254);
if(temp__5720__auto___14290){
var seq__14059_14291__$1 = temp__5720__auto___14290;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14059_14291__$1)){
var c__4550__auto___14292 = cljs.core.chunk_first.call(null,seq__14059_14291__$1);
var G__14293 = cljs.core.chunk_rest.call(null,seq__14059_14291__$1);
var G__14294 = c__4550__auto___14292;
var G__14295 = cljs.core.count.call(null,c__4550__auto___14292);
var G__14296 = (0);
seq__14059_14254 = G__14293;
chunk__14060_14255 = G__14294;
count__14061_14256 = G__14295;
i__14062_14257 = G__14296;
continue;
} else {
var vec__14120_14297 = cljs.core.first.call(null,seq__14059_14291__$1);
var line_14298 = cljs.core.nth.call(null,vec__14120_14297,(0),null);
var cols_14299 = cljs.core.nth.call(null,vec__14120_14297,(1),null);
var seq__14123_14300 = cljs.core.seq.call(null,cols_14299);
var chunk__14124_14301 = null;
var count__14125_14302 = (0);
var i__14126_14303 = (0);
while(true){
if((i__14126_14303 < count__14125_14302)){
var vec__14133_14304 = cljs.core._nth.call(null,chunk__14124_14301,i__14126_14303);
var col_14305 = cljs.core.nth.call(null,vec__14133_14304,(0),null);
var infos_14306 = cljs.core.nth.call(null,vec__14133_14304,(1),null);
encode_cols.call(null,infos_14306,source_idx_14250,line_14298,col_14305);


var G__14307 = seq__14123_14300;
var G__14308 = chunk__14124_14301;
var G__14309 = count__14125_14302;
var G__14310 = (i__14126_14303 + (1));
seq__14123_14300 = G__14307;
chunk__14124_14301 = G__14308;
count__14125_14302 = G__14309;
i__14126_14303 = G__14310;
continue;
} else {
var temp__5720__auto___14311__$1 = cljs.core.seq.call(null,seq__14123_14300);
if(temp__5720__auto___14311__$1){
var seq__14123_14312__$1 = temp__5720__auto___14311__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14123_14312__$1)){
var c__4550__auto___14313 = cljs.core.chunk_first.call(null,seq__14123_14312__$1);
var G__14314 = cljs.core.chunk_rest.call(null,seq__14123_14312__$1);
var G__14315 = c__4550__auto___14313;
var G__14316 = cljs.core.count.call(null,c__4550__auto___14313);
var G__14317 = (0);
seq__14123_14300 = G__14314;
chunk__14124_14301 = G__14315;
count__14125_14302 = G__14316;
i__14126_14303 = G__14317;
continue;
} else {
var vec__14136_14318 = cljs.core.first.call(null,seq__14123_14312__$1);
var col_14319 = cljs.core.nth.call(null,vec__14136_14318,(0),null);
var infos_14320 = cljs.core.nth.call(null,vec__14136_14318,(1),null);
encode_cols.call(null,infos_14320,source_idx_14250,line_14298,col_14319);


var G__14321 = cljs.core.next.call(null,seq__14123_14312__$1);
var G__14322 = null;
var G__14323 = (0);
var G__14324 = (0);
seq__14123_14300 = G__14321;
chunk__14124_14301 = G__14322;
count__14125_14302 = G__14323;
i__14126_14303 = G__14324;
continue;
}
} else {
}
}
break;
}


var G__14325 = cljs.core.next.call(null,seq__14059_14291__$1);
var G__14326 = null;
var G__14327 = (0);
var G__14328 = (0);
seq__14059_14254 = G__14325;
chunk__14060_14255 = G__14326;
count__14061_14256 = G__14327;
i__14062_14257 = G__14328;
continue;
}
} else {
}
}
break;
}


var G__14329 = seq__13877_14245;
var G__14330 = chunk__13878_14246;
var G__14331 = count__13879_14247;
var G__14332 = (i__13880_14248 + (1));
seq__13877_14245 = G__14329;
chunk__13878_14246 = G__14330;
count__13879_14247 = G__14331;
i__13880_14248 = G__14332;
continue;
} else {
var temp__5720__auto___14333 = cljs.core.seq.call(null,seq__13877_14245);
if(temp__5720__auto___14333){
var seq__13877_14334__$1 = temp__5720__auto___14333;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13877_14334__$1)){
var c__4550__auto___14335 = cljs.core.chunk_first.call(null,seq__13877_14334__$1);
var G__14336 = cljs.core.chunk_rest.call(null,seq__13877_14334__$1);
var G__14337 = c__4550__auto___14335;
var G__14338 = cljs.core.count.call(null,c__4550__auto___14335);
var G__14339 = (0);
seq__13877_14245 = G__14336;
chunk__13878_14246 = G__14337;
count__13879_14247 = G__14338;
i__13880_14248 = G__14339;
continue;
} else {
var vec__14139_14340 = cljs.core.first.call(null,seq__13877_14334__$1);
var source_idx_14341 = cljs.core.nth.call(null,vec__14139_14340,(0),null);
var vec__14142_14342 = cljs.core.nth.call(null,vec__14139_14340,(1),null);
var __14343 = cljs.core.nth.call(null,vec__14142_14342,(0),null);
var lines_14344__$1 = cljs.core.nth.call(null,vec__14142_14342,(1),null);
var seq__14145_14345 = cljs.core.seq.call(null,lines_14344__$1);
var chunk__14146_14346 = null;
var count__14147_14347 = (0);
var i__14148_14348 = (0);
while(true){
if((i__14148_14348 < count__14147_14347)){
var vec__14187_14349 = cljs.core._nth.call(null,chunk__14146_14346,i__14148_14348);
var line_14350 = cljs.core.nth.call(null,vec__14187_14349,(0),null);
var cols_14351 = cljs.core.nth.call(null,vec__14187_14349,(1),null);
var seq__14190_14352 = cljs.core.seq.call(null,cols_14351);
var chunk__14191_14353 = null;
var count__14192_14354 = (0);
var i__14193_14355 = (0);
while(true){
if((i__14193_14355 < count__14192_14354)){
var vec__14200_14356 = cljs.core._nth.call(null,chunk__14191_14353,i__14193_14355);
var col_14357 = cljs.core.nth.call(null,vec__14200_14356,(0),null);
var infos_14358 = cljs.core.nth.call(null,vec__14200_14356,(1),null);
encode_cols.call(null,infos_14358,source_idx_14341,line_14350,col_14357);


var G__14359 = seq__14190_14352;
var G__14360 = chunk__14191_14353;
var G__14361 = count__14192_14354;
var G__14362 = (i__14193_14355 + (1));
seq__14190_14352 = G__14359;
chunk__14191_14353 = G__14360;
count__14192_14354 = G__14361;
i__14193_14355 = G__14362;
continue;
} else {
var temp__5720__auto___14363__$1 = cljs.core.seq.call(null,seq__14190_14352);
if(temp__5720__auto___14363__$1){
var seq__14190_14364__$1 = temp__5720__auto___14363__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14190_14364__$1)){
var c__4550__auto___14365 = cljs.core.chunk_first.call(null,seq__14190_14364__$1);
var G__14366 = cljs.core.chunk_rest.call(null,seq__14190_14364__$1);
var G__14367 = c__4550__auto___14365;
var G__14368 = cljs.core.count.call(null,c__4550__auto___14365);
var G__14369 = (0);
seq__14190_14352 = G__14366;
chunk__14191_14353 = G__14367;
count__14192_14354 = G__14368;
i__14193_14355 = G__14369;
continue;
} else {
var vec__14203_14370 = cljs.core.first.call(null,seq__14190_14364__$1);
var col_14371 = cljs.core.nth.call(null,vec__14203_14370,(0),null);
var infos_14372 = cljs.core.nth.call(null,vec__14203_14370,(1),null);
encode_cols.call(null,infos_14372,source_idx_14341,line_14350,col_14371);


var G__14373 = cljs.core.next.call(null,seq__14190_14364__$1);
var G__14374 = null;
var G__14375 = (0);
var G__14376 = (0);
seq__14190_14352 = G__14373;
chunk__14191_14353 = G__14374;
count__14192_14354 = G__14375;
i__14193_14355 = G__14376;
continue;
}
} else {
}
}
break;
}


var G__14377 = seq__14145_14345;
var G__14378 = chunk__14146_14346;
var G__14379 = count__14147_14347;
var G__14380 = (i__14148_14348 + (1));
seq__14145_14345 = G__14377;
chunk__14146_14346 = G__14378;
count__14147_14347 = G__14379;
i__14148_14348 = G__14380;
continue;
} else {
var temp__5720__auto___14381__$1 = cljs.core.seq.call(null,seq__14145_14345);
if(temp__5720__auto___14381__$1){
var seq__14145_14382__$1 = temp__5720__auto___14381__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14145_14382__$1)){
var c__4550__auto___14383 = cljs.core.chunk_first.call(null,seq__14145_14382__$1);
var G__14384 = cljs.core.chunk_rest.call(null,seq__14145_14382__$1);
var G__14385 = c__4550__auto___14383;
var G__14386 = cljs.core.count.call(null,c__4550__auto___14383);
var G__14387 = (0);
seq__14145_14345 = G__14384;
chunk__14146_14346 = G__14385;
count__14147_14347 = G__14386;
i__14148_14348 = G__14387;
continue;
} else {
var vec__14206_14388 = cljs.core.first.call(null,seq__14145_14382__$1);
var line_14389 = cljs.core.nth.call(null,vec__14206_14388,(0),null);
var cols_14390 = cljs.core.nth.call(null,vec__14206_14388,(1),null);
var seq__14209_14391 = cljs.core.seq.call(null,cols_14390);
var chunk__14210_14392 = null;
var count__14211_14393 = (0);
var i__14212_14394 = (0);
while(true){
if((i__14212_14394 < count__14211_14393)){
var vec__14219_14395 = cljs.core._nth.call(null,chunk__14210_14392,i__14212_14394);
var col_14396 = cljs.core.nth.call(null,vec__14219_14395,(0),null);
var infos_14397 = cljs.core.nth.call(null,vec__14219_14395,(1),null);
encode_cols.call(null,infos_14397,source_idx_14341,line_14389,col_14396);


var G__14398 = seq__14209_14391;
var G__14399 = chunk__14210_14392;
var G__14400 = count__14211_14393;
var G__14401 = (i__14212_14394 + (1));
seq__14209_14391 = G__14398;
chunk__14210_14392 = G__14399;
count__14211_14393 = G__14400;
i__14212_14394 = G__14401;
continue;
} else {
var temp__5720__auto___14402__$2 = cljs.core.seq.call(null,seq__14209_14391);
if(temp__5720__auto___14402__$2){
var seq__14209_14403__$1 = temp__5720__auto___14402__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14209_14403__$1)){
var c__4550__auto___14404 = cljs.core.chunk_first.call(null,seq__14209_14403__$1);
var G__14405 = cljs.core.chunk_rest.call(null,seq__14209_14403__$1);
var G__14406 = c__4550__auto___14404;
var G__14407 = cljs.core.count.call(null,c__4550__auto___14404);
var G__14408 = (0);
seq__14209_14391 = G__14405;
chunk__14210_14392 = G__14406;
count__14211_14393 = G__14407;
i__14212_14394 = G__14408;
continue;
} else {
var vec__14222_14409 = cljs.core.first.call(null,seq__14209_14403__$1);
var col_14410 = cljs.core.nth.call(null,vec__14222_14409,(0),null);
var infos_14411 = cljs.core.nth.call(null,vec__14222_14409,(1),null);
encode_cols.call(null,infos_14411,source_idx_14341,line_14389,col_14410);


var G__14412 = cljs.core.next.call(null,seq__14209_14403__$1);
var G__14413 = null;
var G__14414 = (0);
var G__14415 = (0);
seq__14209_14391 = G__14412;
chunk__14210_14392 = G__14413;
count__14211_14393 = G__14414;
i__14212_14394 = G__14415;
continue;
}
} else {
}
}
break;
}


var G__14416 = cljs.core.next.call(null,seq__14145_14382__$1);
var G__14417 = null;
var G__14418 = (0);
var G__14419 = (0);
seq__14145_14345 = G__14416;
chunk__14146_14346 = G__14417;
count__14147_14347 = G__14418;
i__14148_14348 = G__14419;
continue;
}
} else {
}
}
break;
}


var G__14420 = cljs.core.next.call(null,seq__13877_14334__$1);
var G__14421 = null;
var G__14422 = (0);
var G__14423 = (0);
seq__13877_14245 = G__14420;
chunk__13878_14246 = G__14421;
count__13879_14247 = G__14422;
i__13880_14248 = G__14423;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__14225 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13870_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__13870_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13871_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__13871_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13872_SHARP_){
return clojure.string.join.call(null,",",p1__13872_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__14226 = G__14225;
goog.object.set(G__14226,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__14226;
} else {
return G__14225;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq.call(null,cljs_map);
var new_lines = cljs.core.sorted_map.call(null);
while(true){
if(line_map_seq){
var vec__14424 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__14424,(0),null);
var col_map = cljs.core.nth.call(null,vec__14424,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__14427 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__14427,(0),null);
var infos = cljs.core.nth.call(null,vec__14427,(1),null);
var G__14433 = cljs.core.next.call(null,col_map_seq);
var G__14434 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__14427,col,infos,vec__14424,line,col_map){
return (function (v,p__14430){
var map__14431 = p__14430;
var map__14431__$1 = (((((!((map__14431 == null))))?(((((map__14431.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14431.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14431):map__14431);
var gline = cljs.core.get.call(null,map__14431__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__14431__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__14427,col,infos,vec__14424,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__14433;
new_cols = G__14434;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__14435 = cljs.core.next.call(null,line_map_seq);
var G__14436 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__14435;
new_lines = G__14436;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
var seq__14437_14709 = cljs.core.seq.call(null,reverse_map);
var chunk__14438_14710 = null;
var count__14439_14711 = (0);
var i__14440_14712 = (0);
while(true){
if((i__14440_14712 < count__14439_14711)){
var vec__14575_14713 = cljs.core._nth.call(null,chunk__14438_14710,i__14440_14712);
var line_14714 = cljs.core.nth.call(null,vec__14575_14713,(0),null);
var columns_14715 = cljs.core.nth.call(null,vec__14575_14713,(1),null);
var seq__14578_14716 = cljs.core.seq.call(null,columns_14715);
var chunk__14579_14717 = null;
var count__14580_14718 = (0);
var i__14581_14719 = (0);
while(true){
if((i__14581_14719 < count__14580_14718)){
var vec__14612_14720 = cljs.core._nth.call(null,chunk__14579_14717,i__14581_14719);
var column_14721 = cljs.core.nth.call(null,vec__14612_14720,(0),null);
var column_info_14722 = cljs.core.nth.call(null,vec__14612_14720,(1),null);
var seq__14615_14723 = cljs.core.seq.call(null,column_info_14722);
var chunk__14616_14724 = null;
var count__14617_14725 = (0);
var i__14618_14726 = (0);
while(true){
if((i__14618_14726 < count__14617_14725)){
var map__14623_14727 = cljs.core._nth.call(null,chunk__14616_14724,i__14618_14726);
var map__14623_14728__$1 = (((((!((map__14623_14727 == null))))?(((((map__14623_14727.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14623_14727.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14623_14727):map__14623_14727);
var gline_14729 = cljs.core.get.call(null,map__14623_14728__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14730 = cljs.core.get.call(null,map__14623_14728__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14731 = cljs.core.get.call(null,map__14623_14728__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14729], null),cljs.core.fnil.call(null,((function (seq__14615_14723,chunk__14616_14724,count__14617_14725,i__14618_14726,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14623_14727,map__14623_14728__$1,gline_14729,gcol_14730,name_14731,vec__14612_14720,column_14721,column_info_14722,vec__14575_14713,line_14714,columns_14715,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14730], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14714,new cljs.core.Keyword(null,"col","col",-1959363084),column_14721,new cljs.core.Keyword(null,"name","name",1843675177),name_14731], null));
});})(seq__14615_14723,chunk__14616_14724,count__14617_14725,i__14618_14726,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14623_14727,map__14623_14728__$1,gline_14729,gcol_14730,name_14731,vec__14612_14720,column_14721,column_info_14722,vec__14575_14713,line_14714,columns_14715,inverted))
,cljs.core.sorted_map.call(null)));


var G__14732 = seq__14615_14723;
var G__14733 = chunk__14616_14724;
var G__14734 = count__14617_14725;
var G__14735 = (i__14618_14726 + (1));
seq__14615_14723 = G__14732;
chunk__14616_14724 = G__14733;
count__14617_14725 = G__14734;
i__14618_14726 = G__14735;
continue;
} else {
var temp__5720__auto___14736 = cljs.core.seq.call(null,seq__14615_14723);
if(temp__5720__auto___14736){
var seq__14615_14737__$1 = temp__5720__auto___14736;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14615_14737__$1)){
var c__4550__auto___14738 = cljs.core.chunk_first.call(null,seq__14615_14737__$1);
var G__14739 = cljs.core.chunk_rest.call(null,seq__14615_14737__$1);
var G__14740 = c__4550__auto___14738;
var G__14741 = cljs.core.count.call(null,c__4550__auto___14738);
var G__14742 = (0);
seq__14615_14723 = G__14739;
chunk__14616_14724 = G__14740;
count__14617_14725 = G__14741;
i__14618_14726 = G__14742;
continue;
} else {
var map__14625_14743 = cljs.core.first.call(null,seq__14615_14737__$1);
var map__14625_14744__$1 = (((((!((map__14625_14743 == null))))?(((((map__14625_14743.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14625_14743.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14625_14743):map__14625_14743);
var gline_14745 = cljs.core.get.call(null,map__14625_14744__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14746 = cljs.core.get.call(null,map__14625_14744__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14747 = cljs.core.get.call(null,map__14625_14744__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14745], null),cljs.core.fnil.call(null,((function (seq__14615_14723,chunk__14616_14724,count__14617_14725,i__14618_14726,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14625_14743,map__14625_14744__$1,gline_14745,gcol_14746,name_14747,seq__14615_14737__$1,temp__5720__auto___14736,vec__14612_14720,column_14721,column_info_14722,vec__14575_14713,line_14714,columns_14715,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14746], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14714,new cljs.core.Keyword(null,"col","col",-1959363084),column_14721,new cljs.core.Keyword(null,"name","name",1843675177),name_14747], null));
});})(seq__14615_14723,chunk__14616_14724,count__14617_14725,i__14618_14726,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14625_14743,map__14625_14744__$1,gline_14745,gcol_14746,name_14747,seq__14615_14737__$1,temp__5720__auto___14736,vec__14612_14720,column_14721,column_info_14722,vec__14575_14713,line_14714,columns_14715,inverted))
,cljs.core.sorted_map.call(null)));


var G__14748 = cljs.core.next.call(null,seq__14615_14737__$1);
var G__14749 = null;
var G__14750 = (0);
var G__14751 = (0);
seq__14615_14723 = G__14748;
chunk__14616_14724 = G__14749;
count__14617_14725 = G__14750;
i__14618_14726 = G__14751;
continue;
}
} else {
}
}
break;
}


var G__14752 = seq__14578_14716;
var G__14753 = chunk__14579_14717;
var G__14754 = count__14580_14718;
var G__14755 = (i__14581_14719 + (1));
seq__14578_14716 = G__14752;
chunk__14579_14717 = G__14753;
count__14580_14718 = G__14754;
i__14581_14719 = G__14755;
continue;
} else {
var temp__5720__auto___14756 = cljs.core.seq.call(null,seq__14578_14716);
if(temp__5720__auto___14756){
var seq__14578_14757__$1 = temp__5720__auto___14756;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14578_14757__$1)){
var c__4550__auto___14758 = cljs.core.chunk_first.call(null,seq__14578_14757__$1);
var G__14759 = cljs.core.chunk_rest.call(null,seq__14578_14757__$1);
var G__14760 = c__4550__auto___14758;
var G__14761 = cljs.core.count.call(null,c__4550__auto___14758);
var G__14762 = (0);
seq__14578_14716 = G__14759;
chunk__14579_14717 = G__14760;
count__14580_14718 = G__14761;
i__14581_14719 = G__14762;
continue;
} else {
var vec__14627_14763 = cljs.core.first.call(null,seq__14578_14757__$1);
var column_14764 = cljs.core.nth.call(null,vec__14627_14763,(0),null);
var column_info_14765 = cljs.core.nth.call(null,vec__14627_14763,(1),null);
var seq__14630_14766 = cljs.core.seq.call(null,column_info_14765);
var chunk__14631_14767 = null;
var count__14632_14768 = (0);
var i__14633_14769 = (0);
while(true){
if((i__14633_14769 < count__14632_14768)){
var map__14638_14770 = cljs.core._nth.call(null,chunk__14631_14767,i__14633_14769);
var map__14638_14771__$1 = (((((!((map__14638_14770 == null))))?(((((map__14638_14770.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14638_14770.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14638_14770):map__14638_14770);
var gline_14772 = cljs.core.get.call(null,map__14638_14771__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14773 = cljs.core.get.call(null,map__14638_14771__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14774 = cljs.core.get.call(null,map__14638_14771__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14772], null),cljs.core.fnil.call(null,((function (seq__14630_14766,chunk__14631_14767,count__14632_14768,i__14633_14769,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14638_14770,map__14638_14771__$1,gline_14772,gcol_14773,name_14774,vec__14627_14763,column_14764,column_info_14765,seq__14578_14757__$1,temp__5720__auto___14756,vec__14575_14713,line_14714,columns_14715,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14773], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14714,new cljs.core.Keyword(null,"col","col",-1959363084),column_14764,new cljs.core.Keyword(null,"name","name",1843675177),name_14774], null));
});})(seq__14630_14766,chunk__14631_14767,count__14632_14768,i__14633_14769,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14638_14770,map__14638_14771__$1,gline_14772,gcol_14773,name_14774,vec__14627_14763,column_14764,column_info_14765,seq__14578_14757__$1,temp__5720__auto___14756,vec__14575_14713,line_14714,columns_14715,inverted))
,cljs.core.sorted_map.call(null)));


var G__14775 = seq__14630_14766;
var G__14776 = chunk__14631_14767;
var G__14777 = count__14632_14768;
var G__14778 = (i__14633_14769 + (1));
seq__14630_14766 = G__14775;
chunk__14631_14767 = G__14776;
count__14632_14768 = G__14777;
i__14633_14769 = G__14778;
continue;
} else {
var temp__5720__auto___14779__$1 = cljs.core.seq.call(null,seq__14630_14766);
if(temp__5720__auto___14779__$1){
var seq__14630_14780__$1 = temp__5720__auto___14779__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14630_14780__$1)){
var c__4550__auto___14781 = cljs.core.chunk_first.call(null,seq__14630_14780__$1);
var G__14782 = cljs.core.chunk_rest.call(null,seq__14630_14780__$1);
var G__14783 = c__4550__auto___14781;
var G__14784 = cljs.core.count.call(null,c__4550__auto___14781);
var G__14785 = (0);
seq__14630_14766 = G__14782;
chunk__14631_14767 = G__14783;
count__14632_14768 = G__14784;
i__14633_14769 = G__14785;
continue;
} else {
var map__14640_14786 = cljs.core.first.call(null,seq__14630_14780__$1);
var map__14640_14787__$1 = (((((!((map__14640_14786 == null))))?(((((map__14640_14786.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14640_14786.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14640_14786):map__14640_14786);
var gline_14788 = cljs.core.get.call(null,map__14640_14787__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14789 = cljs.core.get.call(null,map__14640_14787__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14790 = cljs.core.get.call(null,map__14640_14787__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14788], null),cljs.core.fnil.call(null,((function (seq__14630_14766,chunk__14631_14767,count__14632_14768,i__14633_14769,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14640_14786,map__14640_14787__$1,gline_14788,gcol_14789,name_14790,seq__14630_14780__$1,temp__5720__auto___14779__$1,vec__14627_14763,column_14764,column_info_14765,seq__14578_14757__$1,temp__5720__auto___14756,vec__14575_14713,line_14714,columns_14715,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14789], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14714,new cljs.core.Keyword(null,"col","col",-1959363084),column_14764,new cljs.core.Keyword(null,"name","name",1843675177),name_14790], null));
});})(seq__14630_14766,chunk__14631_14767,count__14632_14768,i__14633_14769,seq__14578_14716,chunk__14579_14717,count__14580_14718,i__14581_14719,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14640_14786,map__14640_14787__$1,gline_14788,gcol_14789,name_14790,seq__14630_14780__$1,temp__5720__auto___14779__$1,vec__14627_14763,column_14764,column_info_14765,seq__14578_14757__$1,temp__5720__auto___14756,vec__14575_14713,line_14714,columns_14715,inverted))
,cljs.core.sorted_map.call(null)));


var G__14791 = cljs.core.next.call(null,seq__14630_14780__$1);
var G__14792 = null;
var G__14793 = (0);
var G__14794 = (0);
seq__14630_14766 = G__14791;
chunk__14631_14767 = G__14792;
count__14632_14768 = G__14793;
i__14633_14769 = G__14794;
continue;
}
} else {
}
}
break;
}


var G__14795 = cljs.core.next.call(null,seq__14578_14757__$1);
var G__14796 = null;
var G__14797 = (0);
var G__14798 = (0);
seq__14578_14716 = G__14795;
chunk__14579_14717 = G__14796;
count__14580_14718 = G__14797;
i__14581_14719 = G__14798;
continue;
}
} else {
}
}
break;
}


var G__14799 = seq__14437_14709;
var G__14800 = chunk__14438_14710;
var G__14801 = count__14439_14711;
var G__14802 = (i__14440_14712 + (1));
seq__14437_14709 = G__14799;
chunk__14438_14710 = G__14800;
count__14439_14711 = G__14801;
i__14440_14712 = G__14802;
continue;
} else {
var temp__5720__auto___14803 = cljs.core.seq.call(null,seq__14437_14709);
if(temp__5720__auto___14803){
var seq__14437_14804__$1 = temp__5720__auto___14803;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14437_14804__$1)){
var c__4550__auto___14805 = cljs.core.chunk_first.call(null,seq__14437_14804__$1);
var G__14806 = cljs.core.chunk_rest.call(null,seq__14437_14804__$1);
var G__14807 = c__4550__auto___14805;
var G__14808 = cljs.core.count.call(null,c__4550__auto___14805);
var G__14809 = (0);
seq__14437_14709 = G__14806;
chunk__14438_14710 = G__14807;
count__14439_14711 = G__14808;
i__14440_14712 = G__14809;
continue;
} else {
var vec__14642_14810 = cljs.core.first.call(null,seq__14437_14804__$1);
var line_14811 = cljs.core.nth.call(null,vec__14642_14810,(0),null);
var columns_14812 = cljs.core.nth.call(null,vec__14642_14810,(1),null);
var seq__14645_14813 = cljs.core.seq.call(null,columns_14812);
var chunk__14646_14814 = null;
var count__14647_14815 = (0);
var i__14648_14816 = (0);
while(true){
if((i__14648_14816 < count__14647_14815)){
var vec__14679_14817 = cljs.core._nth.call(null,chunk__14646_14814,i__14648_14816);
var column_14818 = cljs.core.nth.call(null,vec__14679_14817,(0),null);
var column_info_14819 = cljs.core.nth.call(null,vec__14679_14817,(1),null);
var seq__14682_14820 = cljs.core.seq.call(null,column_info_14819);
var chunk__14683_14821 = null;
var count__14684_14822 = (0);
var i__14685_14823 = (0);
while(true){
if((i__14685_14823 < count__14684_14822)){
var map__14690_14824 = cljs.core._nth.call(null,chunk__14683_14821,i__14685_14823);
var map__14690_14825__$1 = (((((!((map__14690_14824 == null))))?(((((map__14690_14824.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14690_14824.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14690_14824):map__14690_14824);
var gline_14826 = cljs.core.get.call(null,map__14690_14825__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14827 = cljs.core.get.call(null,map__14690_14825__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14828 = cljs.core.get.call(null,map__14690_14825__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14826], null),cljs.core.fnil.call(null,((function (seq__14682_14820,chunk__14683_14821,count__14684_14822,i__14685_14823,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14690_14824,map__14690_14825__$1,gline_14826,gcol_14827,name_14828,vec__14679_14817,column_14818,column_info_14819,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14827], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14811,new cljs.core.Keyword(null,"col","col",-1959363084),column_14818,new cljs.core.Keyword(null,"name","name",1843675177),name_14828], null));
});})(seq__14682_14820,chunk__14683_14821,count__14684_14822,i__14685_14823,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14690_14824,map__14690_14825__$1,gline_14826,gcol_14827,name_14828,vec__14679_14817,column_14818,column_info_14819,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted))
,cljs.core.sorted_map.call(null)));


var G__14829 = seq__14682_14820;
var G__14830 = chunk__14683_14821;
var G__14831 = count__14684_14822;
var G__14832 = (i__14685_14823 + (1));
seq__14682_14820 = G__14829;
chunk__14683_14821 = G__14830;
count__14684_14822 = G__14831;
i__14685_14823 = G__14832;
continue;
} else {
var temp__5720__auto___14833__$1 = cljs.core.seq.call(null,seq__14682_14820);
if(temp__5720__auto___14833__$1){
var seq__14682_14834__$1 = temp__5720__auto___14833__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14682_14834__$1)){
var c__4550__auto___14835 = cljs.core.chunk_first.call(null,seq__14682_14834__$1);
var G__14836 = cljs.core.chunk_rest.call(null,seq__14682_14834__$1);
var G__14837 = c__4550__auto___14835;
var G__14838 = cljs.core.count.call(null,c__4550__auto___14835);
var G__14839 = (0);
seq__14682_14820 = G__14836;
chunk__14683_14821 = G__14837;
count__14684_14822 = G__14838;
i__14685_14823 = G__14839;
continue;
} else {
var map__14692_14840 = cljs.core.first.call(null,seq__14682_14834__$1);
var map__14692_14841__$1 = (((((!((map__14692_14840 == null))))?(((((map__14692_14840.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14692_14840.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14692_14840):map__14692_14840);
var gline_14842 = cljs.core.get.call(null,map__14692_14841__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14843 = cljs.core.get.call(null,map__14692_14841__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14844 = cljs.core.get.call(null,map__14692_14841__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14842], null),cljs.core.fnil.call(null,((function (seq__14682_14820,chunk__14683_14821,count__14684_14822,i__14685_14823,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14692_14840,map__14692_14841__$1,gline_14842,gcol_14843,name_14844,seq__14682_14834__$1,temp__5720__auto___14833__$1,vec__14679_14817,column_14818,column_info_14819,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14843], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14811,new cljs.core.Keyword(null,"col","col",-1959363084),column_14818,new cljs.core.Keyword(null,"name","name",1843675177),name_14844], null));
});})(seq__14682_14820,chunk__14683_14821,count__14684_14822,i__14685_14823,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14692_14840,map__14692_14841__$1,gline_14842,gcol_14843,name_14844,seq__14682_14834__$1,temp__5720__auto___14833__$1,vec__14679_14817,column_14818,column_info_14819,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted))
,cljs.core.sorted_map.call(null)));


var G__14845 = cljs.core.next.call(null,seq__14682_14834__$1);
var G__14846 = null;
var G__14847 = (0);
var G__14848 = (0);
seq__14682_14820 = G__14845;
chunk__14683_14821 = G__14846;
count__14684_14822 = G__14847;
i__14685_14823 = G__14848;
continue;
}
} else {
}
}
break;
}


var G__14849 = seq__14645_14813;
var G__14850 = chunk__14646_14814;
var G__14851 = count__14647_14815;
var G__14852 = (i__14648_14816 + (1));
seq__14645_14813 = G__14849;
chunk__14646_14814 = G__14850;
count__14647_14815 = G__14851;
i__14648_14816 = G__14852;
continue;
} else {
var temp__5720__auto___14853__$1 = cljs.core.seq.call(null,seq__14645_14813);
if(temp__5720__auto___14853__$1){
var seq__14645_14854__$1 = temp__5720__auto___14853__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14645_14854__$1)){
var c__4550__auto___14855 = cljs.core.chunk_first.call(null,seq__14645_14854__$1);
var G__14856 = cljs.core.chunk_rest.call(null,seq__14645_14854__$1);
var G__14857 = c__4550__auto___14855;
var G__14858 = cljs.core.count.call(null,c__4550__auto___14855);
var G__14859 = (0);
seq__14645_14813 = G__14856;
chunk__14646_14814 = G__14857;
count__14647_14815 = G__14858;
i__14648_14816 = G__14859;
continue;
} else {
var vec__14694_14860 = cljs.core.first.call(null,seq__14645_14854__$1);
var column_14861 = cljs.core.nth.call(null,vec__14694_14860,(0),null);
var column_info_14862 = cljs.core.nth.call(null,vec__14694_14860,(1),null);
var seq__14697_14863 = cljs.core.seq.call(null,column_info_14862);
var chunk__14698_14864 = null;
var count__14699_14865 = (0);
var i__14700_14866 = (0);
while(true){
if((i__14700_14866 < count__14699_14865)){
var map__14705_14867 = cljs.core._nth.call(null,chunk__14698_14864,i__14700_14866);
var map__14705_14868__$1 = (((((!((map__14705_14867 == null))))?(((((map__14705_14867.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14705_14867.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14705_14867):map__14705_14867);
var gline_14869 = cljs.core.get.call(null,map__14705_14868__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14870 = cljs.core.get.call(null,map__14705_14868__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14871 = cljs.core.get.call(null,map__14705_14868__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14869], null),cljs.core.fnil.call(null,((function (seq__14697_14863,chunk__14698_14864,count__14699_14865,i__14700_14866,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14705_14867,map__14705_14868__$1,gline_14869,gcol_14870,name_14871,vec__14694_14860,column_14861,column_info_14862,seq__14645_14854__$1,temp__5720__auto___14853__$1,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14870], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14811,new cljs.core.Keyword(null,"col","col",-1959363084),column_14861,new cljs.core.Keyword(null,"name","name",1843675177),name_14871], null));
});})(seq__14697_14863,chunk__14698_14864,count__14699_14865,i__14700_14866,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14705_14867,map__14705_14868__$1,gline_14869,gcol_14870,name_14871,vec__14694_14860,column_14861,column_info_14862,seq__14645_14854__$1,temp__5720__auto___14853__$1,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted))
,cljs.core.sorted_map.call(null)));


var G__14872 = seq__14697_14863;
var G__14873 = chunk__14698_14864;
var G__14874 = count__14699_14865;
var G__14875 = (i__14700_14866 + (1));
seq__14697_14863 = G__14872;
chunk__14698_14864 = G__14873;
count__14699_14865 = G__14874;
i__14700_14866 = G__14875;
continue;
} else {
var temp__5720__auto___14876__$2 = cljs.core.seq.call(null,seq__14697_14863);
if(temp__5720__auto___14876__$2){
var seq__14697_14877__$1 = temp__5720__auto___14876__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14697_14877__$1)){
var c__4550__auto___14878 = cljs.core.chunk_first.call(null,seq__14697_14877__$1);
var G__14879 = cljs.core.chunk_rest.call(null,seq__14697_14877__$1);
var G__14880 = c__4550__auto___14878;
var G__14881 = cljs.core.count.call(null,c__4550__auto___14878);
var G__14882 = (0);
seq__14697_14863 = G__14879;
chunk__14698_14864 = G__14880;
count__14699_14865 = G__14881;
i__14700_14866 = G__14882;
continue;
} else {
var map__14707_14883 = cljs.core.first.call(null,seq__14697_14877__$1);
var map__14707_14884__$1 = (((((!((map__14707_14883 == null))))?(((((map__14707_14883.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14707_14883.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14707_14883):map__14707_14883);
var gline_14885 = cljs.core.get.call(null,map__14707_14884__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14886 = cljs.core.get.call(null,map__14707_14884__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14887 = cljs.core.get.call(null,map__14707_14884__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14885], null),cljs.core.fnil.call(null,((function (seq__14697_14863,chunk__14698_14864,count__14699_14865,i__14700_14866,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14707_14883,map__14707_14884__$1,gline_14885,gcol_14886,name_14887,seq__14697_14877__$1,temp__5720__auto___14876__$2,vec__14694_14860,column_14861,column_info_14862,seq__14645_14854__$1,temp__5720__auto___14853__$1,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14886], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_14811,new cljs.core.Keyword(null,"col","col",-1959363084),column_14861,new cljs.core.Keyword(null,"name","name",1843675177),name_14887], null));
});})(seq__14697_14863,chunk__14698_14864,count__14699_14865,i__14700_14866,seq__14645_14813,chunk__14646_14814,count__14647_14815,i__14648_14816,seq__14437_14709,chunk__14438_14710,count__14439_14711,i__14440_14712,map__14707_14883,map__14707_14884__$1,gline_14885,gcol_14886,name_14887,seq__14697_14877__$1,temp__5720__auto___14876__$2,vec__14694_14860,column_14861,column_info_14862,seq__14645_14854__$1,temp__5720__auto___14853__$1,vec__14642_14810,line_14811,columns_14812,seq__14437_14804__$1,temp__5720__auto___14803,inverted))
,cljs.core.sorted_map.call(null)));


var G__14888 = cljs.core.next.call(null,seq__14697_14877__$1);
var G__14889 = null;
var G__14890 = (0);
var G__14891 = (0);
seq__14697_14863 = G__14888;
chunk__14698_14864 = G__14889;
count__14699_14865 = G__14890;
i__14700_14866 = G__14891;
continue;
}
} else {
}
}
break;
}


var G__14892 = cljs.core.next.call(null,seq__14645_14854__$1);
var G__14893 = null;
var G__14894 = (0);
var G__14895 = (0);
seq__14645_14813 = G__14892;
chunk__14646_14814 = G__14893;
count__14647_14815 = G__14894;
i__14648_14816 = G__14895;
continue;
}
} else {
}
}
break;
}


var G__14896 = cljs.core.next.call(null,seq__14437_14804__$1);
var G__14897 = null;
var G__14898 = (0);
var G__14899 = (0);
seq__14437_14709 = G__14896;
chunk__14438_14710 = G__14897;
count__14439_14711 = G__14898;
i__14440_14712 = G__14899;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});
