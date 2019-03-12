// Compiled by ClojureScript 1.10.520 {}
goog.provide('oops.core');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.object');
goog.require('oops.sdefs');
goog.require('oops.state');
goog.require('oops.config');
goog.require('oops.messages');
goog.require('oops.helpers');
goog.require('oops.schema');
oops.core.report_error_dynamically = (function oops$core$report_error_dynamically(msg,data){
if(oops.state.was_error_reported_QMARK_.call(null)){
return null;
} else {
oops.state.mark_error_reported_BANG_.call(null);

var G__18625 = oops.config.get_error_reporting.call(null);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"throw","throw",-1044625833),G__18625)){
throw oops.state.prepare_error_from_call_site.call(null,msg,oops.helpers.wrap_data_in_enveloper_if_possible.call(null,oops.config.use_envelope_QMARK_.call(null),data));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"console","console",1228072057),G__18625)){
return oops.state.get_console_reporter.call(null).call(null,(console["error"]),msg,oops.helpers.wrap_data_in_enveloper_if_possible.call(null,oops.config.use_envelope_QMARK_.call(null),data));
} else {
if(cljs.core._EQ_.call(null,false,G__18625)){
return null;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18625)].join('')));

}
}
}
}
});
oops.core.report_warning_dynamically = (function oops$core$report_warning_dynamically(msg,data){
var G__18626 = oops.config.get_warning_reporting.call(null);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"throw","throw",-1044625833),G__18626)){
throw oops.state.prepare_error_from_call_site.call(null,msg,oops.helpers.wrap_data_in_enveloper_if_possible.call(null,oops.config.use_envelope_QMARK_.call(null),data));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"console","console",1228072057),G__18626)){
return oops.state.get_console_reporter.call(null).call(null,(console["warn"]),msg,oops.helpers.wrap_data_in_enveloper_if_possible.call(null,oops.config.use_envelope_QMARK_.call(null),data));
} else {
if(cljs.core._EQ_.call(null,false,G__18626)){
return null;
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18626)].join('')));

}
}
}
});
oops.core.report_if_needed_dynamically = (function oops$core$report_if_needed_dynamically(var_args){
var args__4736__auto__ = [];
var len__4730__auto___18634 = arguments.length;
var i__4731__auto___18635 = (0);
while(true){
if((i__4731__auto___18635 < len__4730__auto___18634)){
args__4736__auto__.push((arguments[i__4731__auto___18635]));

var G__18636 = (i__4731__auto___18635 + (1));
i__4731__auto___18635 = G__18636;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return oops.core.report_if_needed_dynamically.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

oops.core.report_if_needed_dynamically.cljs$core$IFn$_invoke$arity$variadic = (function (msg_id,p__18629){
var vec__18630 = p__18629;
var info = cljs.core.nth.call(null,vec__18630,(0),null);

if(cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),msg_id)){
} else {
var G__18633_18637 = oops.config.get_config_key.call(null,msg_id);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),G__18633_18637)){
oops.core.report_warning_dynamically.call(null,oops.messages.runtime_message.call(null,msg_id,info),info);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"error","error",-978969032),G__18633_18637)){
oops.core.report_error_dynamically.call(null,oops.messages.runtime_message.call(null,msg_id,info),info);
} else {
if(cljs.core._EQ_.call(null,false,G__18633_18637)){
} else {
if(cljs.core._EQ_.call(null,null,G__18633_18637)){
} else {
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18633_18637)].join('')));

}
}
}
}
}

return null;
});

oops.core.report_if_needed_dynamically.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
oops.core.report_if_needed_dynamically.cljs$lang$applyTo = (function (seq18627){
var G__18628 = cljs.core.first.call(null,seq18627);
var seq18627__$1 = cljs.core.next.call(null,seq18627);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18628,seq18627__$1);
});

oops.core.validate_object_access_dynamically = (function oops$core$validate_object_access_dynamically(obj,mode,key,push_QMARK_,check_key_read_QMARK_,check_key_write_QMARK_){
if(((((cljs.core._EQ_.call(null,mode,(0))) && ((void 0 === obj))))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"undefined",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return false;
})()
):((((cljs.core._EQ_.call(null,mode,(0))) && ((obj == null))))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"nil",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return false;
})()
):(cljs.core.truth_(goog.isBoolean(obj))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"boolean",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return false;
})()
):(cljs.core.truth_(goog.isNumber(obj))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"number",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return false;
})()
):(cljs.core.truth_(goog.isString(obj))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"string",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return false;
})()
):((cljs.core.not.call(null,goog.isObject(obj)))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"non-object",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return false;
})()
):(cljs.core.truth_(goog.isDateLike(obj))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"date-like",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return true;
})()
):(cljs.core.truth_(oops.helpers.cljs_type_QMARK_.call(null,obj))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"cljs type",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return true;
})()
):(cljs.core.truth_(oops.helpers.cljs_instance_QMARK_.call(null,obj))?((cljs.core.contains_QMARK_.call(null,oops.config.get_suppress_reporting.call(null),new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301)))?true:(function (){
oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"unexpected-object-value","unexpected-object-value",-1214439301),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"flavor","flavor",-1331636636),"cljs instance",new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

return true;
})()
):true
)))))))))){
if(cljs.core.truth_(push_QMARK_)){
oops.state.add_key_to_current_path_BANG_.call(null,key);

oops.state.set_last_access_modifier_BANG_.call(null,mode);
} else {
}

var and__4120__auto__ = (cljs.core.truth_(check_key_read_QMARK_)?((((cljs.core._EQ_.call(null,mode,(0))) && (cljs.core.not.call(null,goog.object.containsKey(obj,key)))))?oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"missing-object-key","missing-object-key",-1300201731),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null)):true):true);
if(cljs.core.truth_(and__4120__auto__)){
if(cljs.core.truth_(check_key_write_QMARK_)){
var temp__5722__auto__ = oops.helpers.get_property_descriptor.call(null,obj,key);
if((temp__5722__auto__ == null)){
if(cljs.core.truth_(oops.helpers.is_object_frozen_QMARK_.call(null,obj))){
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"object-is-frozen","object-is-frozen",-1391578096),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));
} else {
if(cljs.core.truth_(oops.helpers.is_object_sealed_QMARK_.call(null,obj))){
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"object-is-sealed","object-is-sealed",-1791813926),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));
} else {
return true;

}
}
} else {
var descriptor_18638 = temp__5722__auto__;
var temp__5722__auto____$1 = oops.helpers.determine_property_non_writable_reason.call(null,descriptor_18638);
if((temp__5722__auto____$1 == null)){
return true;
} else {
var reason_18639 = temp__5722__auto____$1;
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"object-key-not-writable","object-key-not-writable",206336031),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"frozen?","frozen?",613726824),oops.helpers.is_object_frozen_QMARK_.call(null,obj),new cljs.core.Keyword(null,"reason","reason",-2070751759),reason_18639,new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));
}
}
} else {
return true;
}
} else {
return and__4120__auto__;
}
} else {
return null;
}
});
oops.core.validate_fn_call_dynamically = (function oops$core$validate_fn_call_dynamically(fn,mode){
if(((cljs.core._EQ_.call(null,mode,(1))) && ((fn == null)))){
return true;
} else {
if(cljs.core.truth_(goog.isFunction(fn))){
return true;
} else {
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"expected-function-value","expected-function-value",-1399123630),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"path","path",-188191168),oops.state.get_key_path_str.call(null),new cljs.core.Keyword(null,"soft?","soft?",-1339668477),cljs.core._EQ_.call(null,mode,(1)),new cljs.core.Keyword(null,"fn","fn",-1175266204),fn,new cljs.core.Keyword(null,"obj","obj",981763962),oops.state.get_target_object.call(null)], null));

}
}
});
oops.core.punch_key_dynamically_BANG_ = (function oops$core$punch_key_dynamically_BANG_(obj,key){
var child_factory_18641 = oops.config.get_child_factory.call(null);
var child_factory_18641__$1 = (function (){var G__18642 = child_factory_18641;
var G__18642__$1 = (((G__18642 instanceof cljs.core.Keyword))?G__18642.fqn:null);
switch (G__18642__$1) {
case "js-obj":
return ((function (G__18642,G__18642__$1,child_factory_18641){
return (function (){
return ({});
});
;})(G__18642,G__18642__$1,child_factory_18641))

break;
case "js-array":
return ((function (G__18642,G__18642__$1,child_factory_18641){
return (function (){
return [];
});
;})(G__18642,G__18642__$1,child_factory_18641))

break;
default:
return child_factory_18641;

}
})();

var child_obj_18640 = child_factory_18641__$1.call(null,obj,key);
if(oops.core.validate_object_access_dynamically.call(null,obj,(2),key,false,true,true)){
(obj[key] = child_obj_18640);
} else {
}

return child_obj_18640;
});
oops.core.build_path_dynamically = (function oops$core$build_path_dynamically(selector){
if(((typeof selector === 'string') || ((selector instanceof cljs.core.Keyword)))){
var selector_path_18646 = [];
oops.schema.prepare_simple_path_BANG_.call(null,selector,selector_path_18646);

return selector_path_18646;
} else {
var selector_path_18647 = [];
oops.schema.prepare_path_BANG_.call(null,selector,selector_path_18647);

return selector_path_18647;

}
});
oops.core.check_path_dynamically = (function oops$core$check_path_dynamically(path,op){
var temp__5724__auto__ = oops.schema.check_dynamic_path_BANG_.call(null,path,op);
if((temp__5724__auto__ == null)){
return null;
} else {
var issue_18648 = temp__5724__auto__;
return cljs.core.apply.call(null,oops.core.report_if_needed_dynamically,issue_18648);
}
});
oops.core.get_key_dynamically = (function oops$core$get_key_dynamically(obj,key,mode){
if(oops.core.validate_object_access_dynamically.call(null,obj,mode,key,true,true,false)){
return (obj[key]);
} else {
return null;
}
});
oops.core.set_key_dynamically = (function oops$core$set_key_dynamically(obj,key,val,mode){
if(oops.core.validate_object_access_dynamically.call(null,obj,mode,key,true,true,true)){
return (obj[key] = val);
} else {
return null;
}
});
oops.core.get_selector_dynamically = (function oops$core$get_selector_dynamically(obj,selector){
if(cljs.core.truth_((((!(cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("oops.sdefs","obj-selector","oops.sdefs/obj-selector",655346305),selector))))?(function (){var explanation_18657 = cljs.spec.alpha.explain_data.call(null,new cljs.core.Keyword("oops.sdefs","obj-selector","oops.sdefs/obj-selector",655346305),selector);
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"invalid-selector","invalid-selector",1262807990),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"explanation","explanation",-1426612608),explanation_18657,new cljs.core.Keyword(null,"selector","selector",762528866),selector], null));
})():true))){
var path_18650 = (function (){var path_18649 = oops.core.build_path_dynamically.call(null,selector);
oops.core.check_path_dynamically.call(null,path_18649,(0));

return path_18649;
})();
var len_18651 = path_18650.length;
var i_18652 = (0);
var obj_18653 = obj;
while(true){
if((i_18652 < len_18651)){
var mode_18654 = (path_18650[i_18652]);
var key_18655 = (path_18650[(i_18652 + (1))]);
var next_obj_18656 = oops.core.get_key_dynamically.call(null,obj_18653,key_18655,mode_18654);
var G__18658 = mode_18654;
switch (G__18658) {
case (0):
var G__18660 = (i_18652 + (2));
var G__18661 = next_obj_18656;
i_18652 = G__18660;
obj_18653 = G__18661;
continue;

break;
case (1):
if((!((next_obj_18656 == null)))){
var G__18662 = (i_18652 + (2));
var G__18663 = next_obj_18656;
i_18652 = G__18662;
obj_18653 = G__18663;
continue;
} else {
return null;
}

break;
case (2):
if((!((next_obj_18656 == null)))){
var G__18664 = (i_18652 + (2));
var G__18665 = next_obj_18656;
i_18652 = G__18664;
obj_18653 = G__18665;
continue;
} else {
var G__18666 = (i_18652 + (2));
var G__18667 = oops.core.punch_key_dynamically_BANG_.call(null,obj_18653,key_18655);
i_18652 = G__18666;
obj_18653 = G__18667;
continue;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18658)].join('')));

}
} else {
return obj_18653;
}
break;
}
} else {
return null;
}
});
oops.core.get_selector_call_info_dynamically = (function oops$core$get_selector_call_info_dynamically(obj,selector){
if(cljs.core.truth_((((!(cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("oops.sdefs","obj-selector","oops.sdefs/obj-selector",655346305),selector))))?(function (){var explanation_18693 = cljs.spec.alpha.explain_data.call(null,new cljs.core.Keyword("oops.sdefs","obj-selector","oops.sdefs/obj-selector",655346305),selector);
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"invalid-selector","invalid-selector",1262807990),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"explanation","explanation",-1426612608),explanation_18693,new cljs.core.Keyword(null,"selector","selector",762528866),selector], null));
})():true))){
var path_18669 = (function (){var path_18668 = oops.core.build_path_dynamically.call(null,selector);
oops.core.check_path_dynamically.call(null,path_18668,(0));

return path_18668;
})();
var len_18670 = path_18669.length;
if((len_18670 < (4))){
return [obj,(function (){var path_18672 = path_18669;
var len_18673 = path_18672.length;
var i_18674 = (0);
var obj_18675 = obj;
while(true){
if((i_18674 < len_18673)){
var mode_18676 = (path_18672[i_18674]);
var key_18677 = (path_18672[(i_18674 + (1))]);
var next_obj_18678 = oops.core.get_key_dynamically.call(null,obj_18675,key_18677,mode_18676);
var G__18694 = mode_18676;
switch (G__18694) {
case (0):
var G__18698 = (i_18674 + (2));
var G__18699 = next_obj_18678;
i_18674 = G__18698;
obj_18675 = G__18699;
continue;

break;
case (1):
if((!((next_obj_18678 == null)))){
var G__18700 = (i_18674 + (2));
var G__18701 = next_obj_18678;
i_18674 = G__18700;
obj_18675 = G__18701;
continue;
} else {
return null;
}

break;
case (2):
if((!((next_obj_18678 == null)))){
var G__18702 = (i_18674 + (2));
var G__18703 = next_obj_18678;
i_18674 = G__18702;
obj_18675 = G__18703;
continue;
} else {
var G__18704 = (i_18674 + (2));
var G__18705 = oops.core.punch_key_dynamically_BANG_.call(null,obj_18675,key_18677);
i_18674 = G__18704;
obj_18675 = G__18705;
continue;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18694)].join('')));

}
} else {
return obj_18675;
}
break;
}
})()];
} else {
var target_obj_18671 = (function (){var path_18679 = path_18669.slice((0),(len_18670 - (2)));
var len_18680 = path_18679.length;
var i_18681 = (0);
var obj_18682 = obj;
while(true){
if((i_18681 < len_18680)){
var mode_18683 = (path_18679[i_18681]);
var key_18684 = (path_18679[(i_18681 + (1))]);
var next_obj_18685 = oops.core.get_key_dynamically.call(null,obj_18682,key_18684,mode_18683);
var G__18695 = mode_18683;
switch (G__18695) {
case (0):
var G__18707 = (i_18681 + (2));
var G__18708 = next_obj_18685;
i_18681 = G__18707;
obj_18682 = G__18708;
continue;

break;
case (1):
if((!((next_obj_18685 == null)))){
var G__18709 = (i_18681 + (2));
var G__18710 = next_obj_18685;
i_18681 = G__18709;
obj_18682 = G__18710;
continue;
} else {
return null;
}

break;
case (2):
if((!((next_obj_18685 == null)))){
var G__18711 = (i_18681 + (2));
var G__18712 = next_obj_18685;
i_18681 = G__18711;
obj_18682 = G__18712;
continue;
} else {
var G__18713 = (i_18681 + (2));
var G__18714 = oops.core.punch_key_dynamically_BANG_.call(null,obj_18682,key_18684);
i_18681 = G__18713;
obj_18682 = G__18714;
continue;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18695)].join('')));

}
} else {
return obj_18682;
}
break;
}
})();
return [target_obj_18671,(function (){var path_18686 = [(path_18669[(len_18670 - (2))]),(path_18669[(len_18670 - (1))])];
var len_18687 = path_18686.length;
var i_18688 = (0);
var obj_18689 = target_obj_18671;
while(true){
if((i_18688 < len_18687)){
var mode_18690 = (path_18686[i_18688]);
var key_18691 = (path_18686[(i_18688 + (1))]);
var next_obj_18692 = oops.core.get_key_dynamically.call(null,obj_18689,key_18691,mode_18690);
var G__18696 = mode_18690;
switch (G__18696) {
case (0):
var G__18716 = (i_18688 + (2));
var G__18717 = next_obj_18692;
i_18688 = G__18716;
obj_18689 = G__18717;
continue;

break;
case (1):
if((!((next_obj_18692 == null)))){
var G__18718 = (i_18688 + (2));
var G__18719 = next_obj_18692;
i_18688 = G__18718;
obj_18689 = G__18719;
continue;
} else {
return null;
}

break;
case (2):
if((!((next_obj_18692 == null)))){
var G__18720 = (i_18688 + (2));
var G__18721 = next_obj_18692;
i_18688 = G__18720;
obj_18689 = G__18721;
continue;
} else {
var G__18722 = (i_18688 + (2));
var G__18723 = oops.core.punch_key_dynamically_BANG_.call(null,obj_18689,key_18691);
i_18688 = G__18722;
obj_18689 = G__18723;
continue;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18696)].join('')));

}
} else {
return obj_18689;
}
break;
}
})()];
}
} else {
return null;
}
});
oops.core.set_selector_dynamically = (function oops$core$set_selector_dynamically(obj,selector,val){
if(cljs.core.truth_((((!(cljs.spec.alpha.valid_QMARK_.call(null,new cljs.core.Keyword("oops.sdefs","obj-selector","oops.sdefs/obj-selector",655346305),selector))))?(function (){var explanation_18738 = cljs.spec.alpha.explain_data.call(null,new cljs.core.Keyword("oops.sdefs","obj-selector","oops.sdefs/obj-selector",655346305),selector);
return oops.core.report_if_needed_dynamically.call(null,new cljs.core.Keyword(null,"invalid-selector","invalid-selector",1262807990),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"explanation","explanation",-1426612608),explanation_18738,new cljs.core.Keyword(null,"selector","selector",762528866),selector], null));
})():true))){
var path_18725 = (function (){var path_18724 = oops.core.build_path_dynamically.call(null,selector);
oops.core.check_path_dynamically.call(null,path_18724,(1));

return path_18724;
})();
var len_18728 = path_18725.length;
var parent_obj_path_18729 = path_18725.slice((0),(len_18728 - (2)));
var key_18726 = (path_18725[(len_18728 - (1))]);
var mode_18727 = (path_18725[(len_18728 - (2))]);
var parent_obj_18730 = (function (){var path_18731 = parent_obj_path_18729;
var len_18732 = path_18731.length;
var i_18733 = (0);
var obj_18734 = obj;
while(true){
if((i_18733 < len_18732)){
var mode_18735 = (path_18731[i_18733]);
var key_18736 = (path_18731[(i_18733 + (1))]);
var next_obj_18737 = oops.core.get_key_dynamically.call(null,obj_18734,key_18736,mode_18735);
var G__18739 = mode_18735;
switch (G__18739) {
case (0):
var G__18741 = (i_18733 + (2));
var G__18742 = next_obj_18737;
i_18733 = G__18741;
obj_18734 = G__18742;
continue;

break;
case (1):
if((!((next_obj_18737 == null)))){
var G__18743 = (i_18733 + (2));
var G__18744 = next_obj_18737;
i_18733 = G__18743;
obj_18734 = G__18744;
continue;
} else {
return null;
}

break;
case (2):
if((!((next_obj_18737 == null)))){
var G__18745 = (i_18733 + (2));
var G__18746 = next_obj_18737;
i_18733 = G__18745;
obj_18734 = G__18746;
continue;
} else {
var G__18747 = (i_18733 + (2));
var G__18748 = oops.core.punch_key_dynamically_BANG_.call(null,obj_18734,key_18736);
i_18733 = G__18747;
obj_18734 = G__18748;
continue;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18739)].join('')));

}
} else {
return obj_18734;
}
break;
}
})();
return oops.core.set_key_dynamically.call(null,parent_obj_18730,key_18726,val,mode_18727);
} else {
return null;
}
});
