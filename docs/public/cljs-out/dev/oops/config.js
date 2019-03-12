// Compiled by ClojureScript 1.10.520 {}
goog.provide('oops.config');
goog.require('cljs.core');
oops.config.get_initial_runtime_config = (function oops$config$get_initial_runtime_config(){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"unexpected-empty-selector","unexpected-empty-selector",-572791900),new cljs.core.Keyword(null,"warning-reporting","warning-reporting",-319054391),new cljs.core.Keyword(null,"use-envelope","use-envelope",-2007197780),new cljs.core.Keyword(null,"error-reporting","error-reporting",1274700782),new cljs.core.Keyword(null,"object-is-frozen","object-is-frozen",-1391578096),new cljs.core.Keyword(null,"expected-function-value","expected-function-value",-1399123630),new cljs.core.Keyword(null,"child-factory","child-factory",-1019029066),new cljs.core.Keyword(null,"invalid-selector","invalid-selector",1262807990),new cljs.core.Keyword(null,"unexpected-punching-selector","unexpected-punching-selector",-1934135338),new cljs.core.Keyword(null,"throw-errors-from-macro-call-sites","throw-errors-from-macro-call-sites",-1338743049),new cljs.core.Keyword(null,"object-is-sealed","object-is-sealed",-1791813926),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.Keyword(null,"unexpected-soft-selector","unexpected-soft-selector",-1117708580),new cljs.core.Keyword(null,"missing-object-key","missing-object-key",-1300201731),new cljs.core.Keyword(null,"object-key-not-writable","object-key-not-writable",206336031)],[new cljs.core.Keyword(null,"warn","warn",-436710552),new cljs.core.Keyword(null,"console","console",1228072057),true,new cljs.core.Keyword(null,"throw","throw",-1044625833),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"js-obj","js-obj",-1298148277),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"warn","warn",-436710552),true,new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"warn","warn",-436710552),new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"error","error",-978969032)]);
});
oops.config._STAR_runtime_config_STAR_ = oops.config.get_initial_runtime_config.call(null);
oops.config.set_current_runtime_config_BANG_ = (function oops$config$set_current_runtime_config_BANG_(new_config){
if(cljs.core.map_QMARK_.call(null,new_config)){
} else {
throw (new Error("Assert failed: (map? new-config)"));
}

oops.config._STAR_runtime_config_STAR_ = new_config;

return new_config;
});
oops.config.get_current_runtime_config = (function oops$config$get_current_runtime_config(){
return oops.config._STAR_runtime_config_STAR_;
});
oops.config.update_current_runtime_config_BANG_ = (function oops$config$update_current_runtime_config_BANG_(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16718 = arguments.length;
var i__4731__auto___16719 = (0);
while(true){
if((i__4731__auto___16719 < len__4730__auto___16718)){
args__4736__auto__.push((arguments[i__4731__auto___16719]));

var G__16720 = (i__4731__auto___16719 + (1));
i__4731__auto___16719 = G__16720;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return oops.config.update_current_runtime_config_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

oops.config.update_current_runtime_config_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (f_or_map,args){
if(cljs.core.map_QMARK_.call(null,f_or_map)){
return oops.config.update_current_runtime_config_BANG_.call(null,cljs.core.merge,f_or_map);
} else {
return oops.config.set_current_runtime_config_BANG_.call(null,cljs.core.apply.call(null,f_or_map,oops.config.get_current_runtime_config.call(null),args));
}
});

oops.config.update_current_runtime_config_BANG_.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
oops.config.update_current_runtime_config_BANG_.cljs$lang$applyTo = (function (seq16716){
var G__16717 = cljs.core.first.call(null,seq16716);
var seq16716__$1 = cljs.core.next.call(null,seq16716);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16717,seq16716__$1);
});

oops.config.get_config_key = (function oops$config$get_config_key(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16727 = arguments.length;
var i__4731__auto___16728 = (0);
while(true){
if((i__4731__auto___16728 < len__4730__auto___16727)){
args__4736__auto__.push((arguments[i__4731__auto___16728]));

var G__16729 = (i__4731__auto___16728 + (1));
i__4731__auto___16728 = G__16729;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return oops.config.get_config_key.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

oops.config.get_config_key.cljs$core$IFn$_invoke$arity$variadic = (function (key,p__16723){
var vec__16724 = p__16723;
var config = cljs.core.nth.call(null,vec__16724,(0),null);
return key.call(null,(function (){var or__4131__auto__ = config;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return oops.config.get_current_runtime_config.call(null);
}
})());
});

oops.config.get_config_key.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
oops.config.get_config_key.cljs$lang$applyTo = (function (seq16721){
var G__16722 = cljs.core.first.call(null,seq16721);
var seq16721__$1 = cljs.core.next.call(null,seq16721);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16722,seq16721__$1);
});

oops.config.has_config_key_QMARK_ = (function oops$config$has_config_key_QMARK_(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16736 = arguments.length;
var i__4731__auto___16737 = (0);
while(true){
if((i__4731__auto___16737 < len__4730__auto___16736)){
args__4736__auto__.push((arguments[i__4731__auto___16737]));

var G__16738 = (i__4731__auto___16737 + (1));
i__4731__auto___16737 = G__16738;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return oops.config.has_config_key_QMARK_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

oops.config.has_config_key_QMARK_.cljs$core$IFn$_invoke$arity$variadic = (function (key,p__16732){
var vec__16733 = p__16732;
var config = cljs.core.nth.call(null,vec__16733,(0),null);
return cljs.core.not_EQ_.call(null,new cljs.core.Keyword("oops.config","not-found","oops.config/not-found",105443457),cljs.core.get.call(null,(function (){var or__4131__auto__ = config;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return oops.config.get_current_runtime_config.call(null);
}
})(),key,new cljs.core.Keyword("oops.config","not-found","oops.config/not-found",105443457)));
});

oops.config.has_config_key_QMARK_.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
oops.config.has_config_key_QMARK_.cljs$lang$applyTo = (function (seq16730){
var G__16731 = cljs.core.first.call(null,seq16730);
var seq16730__$1 = cljs.core.next.call(null,seq16730);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__16731,seq16730__$1);
});

oops.config.get_error_reporting = (function oops$config$get_error_reporting(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16744 = arguments.length;
var i__4731__auto___16745 = (0);
while(true){
if((i__4731__auto___16745 < len__4730__auto___16744)){
args__4736__auto__.push((arguments[i__4731__auto___16745]));

var G__16746 = (i__4731__auto___16745 + (1));
i__4731__auto___16745 = G__16746;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return oops.config.get_error_reporting.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

oops.config.get_error_reporting.cljs$core$IFn$_invoke$arity$variadic = (function (p__16740){
var vec__16741 = p__16740;
var config = cljs.core.nth.call(null,vec__16741,(0),null);
return oops.config.get_config_key.call(null,new cljs.core.Keyword(null,"error-reporting","error-reporting",1274700782),config);
});

oops.config.get_error_reporting.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
oops.config.get_error_reporting.cljs$lang$applyTo = (function (seq16739){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16739));
});

oops.config.get_warning_reporting = (function oops$config$get_warning_reporting(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16752 = arguments.length;
var i__4731__auto___16753 = (0);
while(true){
if((i__4731__auto___16753 < len__4730__auto___16752)){
args__4736__auto__.push((arguments[i__4731__auto___16753]));

var G__16754 = (i__4731__auto___16753 + (1));
i__4731__auto___16753 = G__16754;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return oops.config.get_warning_reporting.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

oops.config.get_warning_reporting.cljs$core$IFn$_invoke$arity$variadic = (function (p__16748){
var vec__16749 = p__16748;
var config = cljs.core.nth.call(null,vec__16749,(0),null);
return oops.config.get_config_key.call(null,new cljs.core.Keyword(null,"warning-reporting","warning-reporting",-319054391),config);
});

oops.config.get_warning_reporting.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
oops.config.get_warning_reporting.cljs$lang$applyTo = (function (seq16747){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16747));
});

oops.config.get_suppress_reporting = (function oops$config$get_suppress_reporting(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16760 = arguments.length;
var i__4731__auto___16761 = (0);
while(true){
if((i__4731__auto___16761 < len__4730__auto___16760)){
args__4736__auto__.push((arguments[i__4731__auto___16761]));

var G__16762 = (i__4731__auto___16761 + (1));
i__4731__auto___16761 = G__16762;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return oops.config.get_suppress_reporting.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

oops.config.get_suppress_reporting.cljs$core$IFn$_invoke$arity$variadic = (function (p__16756){
var vec__16757 = p__16756;
var config = cljs.core.nth.call(null,vec__16757,(0),null);
return oops.config.get_config_key.call(null,new cljs.core.Keyword(null,"suppress-reporting","suppress-reporting",43885458),config);
});

oops.config.get_suppress_reporting.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
oops.config.get_suppress_reporting.cljs$lang$applyTo = (function (seq16755){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16755));
});

oops.config.get_child_factory = (function oops$config$get_child_factory(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16768 = arguments.length;
var i__4731__auto___16769 = (0);
while(true){
if((i__4731__auto___16769 < len__4730__auto___16768)){
args__4736__auto__.push((arguments[i__4731__auto___16769]));

var G__16770 = (i__4731__auto___16769 + (1));
i__4731__auto___16769 = G__16770;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return oops.config.get_child_factory.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

oops.config.get_child_factory.cljs$core$IFn$_invoke$arity$variadic = (function (p__16764){
var vec__16765 = p__16764;
var config = cljs.core.nth.call(null,vec__16765,(0),null);
return oops.config.get_config_key.call(null,new cljs.core.Keyword(null,"child-factory","child-factory",-1019029066),config);
});

oops.config.get_child_factory.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
oops.config.get_child_factory.cljs$lang$applyTo = (function (seq16763){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16763));
});

oops.config.set_child_factory_BANG_ = (function oops$config$set_child_factory_BANG_(new_factory_fn){
return oops.config.update_current_runtime_config_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"child-factory","child-factory",-1019029066),new_factory_fn], null));
});
oops.config.throw_errors_from_macro_call_sites_QMARK_ = (function oops$config$throw_errors_from_macro_call_sites_QMARK_(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16776 = arguments.length;
var i__4731__auto___16777 = (0);
while(true){
if((i__4731__auto___16777 < len__4730__auto___16776)){
args__4736__auto__.push((arguments[i__4731__auto___16777]));

var G__16778 = (i__4731__auto___16777 + (1));
i__4731__auto___16777 = G__16778;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return oops.config.throw_errors_from_macro_call_sites_QMARK_.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

oops.config.throw_errors_from_macro_call_sites_QMARK_.cljs$core$IFn$_invoke$arity$variadic = (function (p__16772){
var vec__16773 = p__16772;
var config = cljs.core.nth.call(null,vec__16773,(0),null);
return oops.config.get_config_key.call(null,new cljs.core.Keyword(null,"throw-errors-from-macro-call-sites","throw-errors-from-macro-call-sites",-1338743049),config) === true;
});

oops.config.throw_errors_from_macro_call_sites_QMARK_.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
oops.config.throw_errors_from_macro_call_sites_QMARK_.cljs$lang$applyTo = (function (seq16771){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16771));
});

oops.config.use_envelope_QMARK_ = (function oops$config$use_envelope_QMARK_(var_args){
var args__4736__auto__ = [];
var len__4730__auto___16784 = arguments.length;
var i__4731__auto___16785 = (0);
while(true){
if((i__4731__auto___16785 < len__4730__auto___16784)){
args__4736__auto__.push((arguments[i__4731__auto___16785]));

var G__16786 = (i__4731__auto___16785 + (1));
i__4731__auto___16785 = G__16786;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return oops.config.use_envelope_QMARK_.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

oops.config.use_envelope_QMARK_.cljs$core$IFn$_invoke$arity$variadic = (function (p__16780){
var vec__16781 = p__16780;
var config = cljs.core.nth.call(null,vec__16781,(0),null);
return oops.config.get_config_key.call(null,new cljs.core.Keyword(null,"use-envelope","use-envelope",-2007197780),config) === true;
});

oops.config.use_envelope_QMARK_.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
oops.config.use_envelope_QMARK_.cljs$lang$applyTo = (function (seq16779){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16779));
});

