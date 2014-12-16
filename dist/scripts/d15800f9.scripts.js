"use strict";angular.module("gettext").run(["gettextCatalog",function(a){a.setStrings("it_IT",{Autoreply:"Risposta automatica",Configure:"Configura","Twitter ingestion":"Ingestion da Twitter"})}]),angular.module("citizendeskFrontendApp",["ngRoute","ngResource","ngMessages","ngSanitize","ngCookies","gettext","eveApi","ui.bootstrap","luegg.directives","matchMedia","duScroll"]).constant("config",{server:{url:"https://cd2.sourcefabric.net/citizendesk-interface/"}}).config(["$routeProvider","$httpProvider","apiProvider",function(a,b,c){["steps","reports","users","citizen_aliases","coverages","twt_oauths","twt_streams","twt_filters","core_config","citizen_lists","report_statuses","identity_records"].forEach(function(a){c.api(a,{type:"http",backend:{rel:a}})}),c.api("twt_searches",{type:"http",backend:{rel:"twt-searches"}}),b.interceptors.push("errorHttpInterceptor"),b.interceptors.push("AuthInterceptor"),b.interceptors.push("cacheBuster"),a.when("/new-report",{templateUrl:"views/new-report.html",controller:"NewReportCtrl"}).when("/report-sms/:id",{templateUrl:"views/report-sms.html",controller:"ReportSmsCtrl"}).when("/report-plain/:id",{templateUrl:"views/report-sms.html",controller:"ReportSmsCtrl"}).when("/report-web_link/:id",{templateUrl:"views/report-web-link.html",controller:"ReportWebLinkCtrl"}).when("/report-tweet/:id",{templateUrl:"views/report-tweet.html",controller:"ReportTweetCtrl"}).when("/monitor/:id?",{templateUrl:"views/monitor.html",controller:"MonitorCtrl"}).when("/twitter-search/:id?",{templateUrl:"views/twitter-search.html",controller:"TwitterSearchCtrl"}).when("/citizen-card/:authority/:id",{templateUrl:"views/citizen-card.html",controller:"CitizenCardCtrl"}).when("/generic-report-list/:query",{templateUrl:"views/simple-report-list.html",controller:"GenericReportListCtrl"}).when("/assigned-to/:id/:name",{templateUrl:"views/simple-report-list.html",controller:"AssignedToCtrl"}).when("/select-media-to-publish/:type/:id",{templateUrl:"views/select-media-to-publish.html",controller:"SelectMediaToPublishCtrl"}).when("/reports-in-coverage/:uniqueId",{templateUrl:"views/simple-report-list.html",controller:"ReportsInCoverageCtrl"}).when("/associate-alias/:aliasId/:identityId",{templateUrl:"views/associate-alias.html",controller:"AssociateAliasCtrl"}).when("/identity-record/:id?",{templateUrl:"views/identity-record.html",controller:"IdentityRecordCtrl"}).when("/list-identity-records/:aliasId?",{templateUrl:"views/list-identity-records.html",controller:"ListIdentityRecordsCtrl"}).when("/session/:session*",{templateUrl:"views/session.html",controller:"SessionCtrl"}).when("/list-from-the-web/",{templateUrl:"views/list-from-the-web.html",controller:"ListFromTheWebCtrl"}).when("/mobile-queue/",{templateUrl:"views/mobile-queue.html",controller:"MobileQueueCtrl"}).when("/configure",{templateUrl:"views/configure.html",controller:"ConfigureCtrl"}).when("/configure-autoreply",{templateUrl:"views/configure-autoreply.html",controller:"ConfigureAutoreplyCtrl"}).when("/configure-steps",{templateUrl:"views/configure-steps.html",controller:"ConfigureStepsCtrl"}).when("/configure-status-presentation",{templateUrl:"views/configure-status-presentation.html",controller:"ConfigureStatusPresentationCtrl"}).when("/configure-coverages",{templateUrl:"views/configure-coverages.html",controller:"ConfigureCoveragesCtrl"}).when("/configure-twitter-ingestion-oauths",{templateUrl:"views/configure-twitter-ingestion-oauths.html",controller:"ConfigureTwitterIngestionOauthsCtrl"}).when("/configure-lists",{templateUrl:"views/configure-lists.html",controller:"ConfigureListsCtrl"}).when("/configure-lists-specific",{templateUrl:"views/configure-lists-specific.html",controller:"ConfigureListsSpecificCtrl"}).when("/configure-time-zone",{templateUrl:"views/configure-time-zone.html",controller:"ConfigureTimeZoneCtrl"}).when("/configure-account",{templateUrl:"views/configure-account.html",controller:"ConfigureAccountCtrl"}).when("/edit-user-lists",{templateUrl:"views/edit-user-lists.html",controller:"EditUserListsCtrl"}).when("/new-twitter-search",{templateUrl:"views/new-twitter-search.html",controller:"NewTwitterSearchCtrl"}).when("/assigned-to-me",{templateUrl:"views/assigned-to-me.html",controller:"AssignedToMeCtrl"}).when("/assign/",{templateUrl:"views/assign.html",controller:"AssignCtrl"}).when("/assigned/",{templateUrl:"views/assigned.html",controller:"AssignedCtrl"}).when("/queues/",{templateUrl:"views/queues.html",controller:"QueuesCtrl"}).when("/my-monitor/",{templateUrl:"views/my-monitor.html",controller:"MyMonitorCtrl"}).when("/processed-queues",{templateUrl:"views/processed-queues.html",controller:"ProcessedQueuesCtrl"}).when("/ingest-from-location",{templateUrl:"views/ingest-from-location.html",controller:"IngestFromLocationCtrl"}).when("/error-no-monitors",{templateUrl:"views/error-no-monitors.html"}).when("/error-no-searches",{templateUrl:"views/error-no-searches.html"}).when("/help-tweet-queues",{templateUrl:"views/help-tweet-queues.html"}).otherwise({redirectTo:"/assigned-to-me"})}]).run(["gettextCatalog","Raven","initAuth",function(a,b,c){a.debug=!0,b.install(),c()}]),angular.module("citizendeskFrontendApp").controller("MainCtrl",function(){}),angular.module("citizendeskFrontendApp").controller("QueuesCtrl",["$scope","TwitterSearches","Monitors","session",function(a,b,c,d){a.session=d,a.collapseSearches=!0,c.promise.then(function(b){a.monitors=b}),b.promise.then(function(b){a.searches=b})}]),angular.module("citizendeskFrontendApp").controller("ConfigureCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("citizendeskFrontendApp").controller("ConfigureTwitterIngestionOauthsCtrl",["api","$scope","session",function(a,b,c){a.twt_oauths.query({where:JSON.stringify({user_id:c.identity._id})}).then(function(a){b.key=a._items.pop(),b.key?b.disabled=!0:b.noKey=!0}),b.add=function(){b.key={user_id:c.identity._id,spec:{}},b.noKey=!1,b.edit()},b.edit=function(){b.disabled=!1,b.copy=angular.copy(b.key),b.editing=!0,b.key.spec={}},b.cancelEdit=function(){b.disabled=!0,b.editing=!1,b.key=b.copy},b.save=function(){b.disabled=!0,a.twt_oauths.save(b.key).then(function(){b.disabled=!1,b.editing=!1})}}]),angular.module("citizendeskFrontendApp").controller("ConfigureAutoreplyCtrl",["$scope","api",function(a,b){a.disabled=!0,b.core_config.query({where:'{"type":"sms"}'}).then(function(b){a.config=b._items.pop(),a.disabled=!1}),a.save=function(){a.disabled=!0,b.core_config.save(a.config).then(function(){a.disabled=!1})}}]),angular.module("citizendeskFrontendApp").provider("Raven",function(){var a=this;this.disabled=!1,this.$get=["$location","session","onRavenSuccess",function(b,c,d){if(a.disabled)return{install:function(){},raven:{captureException:function(){},captureMessage:function(){}}};var e={},f="https://b1901abf077d476ba253bce45dd5bf91@sentry.sourcefabric.org/8";return e.dataCallback=function(a){var d;return d=c.identity?c.identity.username:"username not available because of missing identity",a.tags={location:b.url(),username:d},a},e.install=function(){Raven.config(f,{ignoreErrors:[],dataCallback:e.dataCallback}).install(),e.raven=Raven,document.addEventListener("ravenSuccess",d)},e}]}),angular.module("citizendeskFrontendApp").controller("ConfigureStepsCtrl",["$scope","api","lodash",function(a,b,c){var d=c;b.steps.query().then(function(b){a.steps=b._items}),a.disabled=!1,a.add=function(){a.steps.push({description:"",mandatory:!1})},a.save=function(c){a.disabled=!0,b.steps.save(c).then(function(){a.disabled=!1})},a.remove=function(c){a.disabled=!0,b.steps.remove(c).then(function(){d.remove(a.steps,c),a.disabled=!1})}}]),angular.module("citizendeskFrontendApp").controller("ReportSmsCtrl",["$scope","$routeParams","Raven","api","$location","Report","Coverages","$window","screenSize","superdeskDate","SharedReport",function(a,b,c,d,e,f,g,h,i,j,k){var l=k.get(b.id);l.property.onValue(function(b){a.report=b,a.encodedSession=encodeURIComponent(b.session),a.hasTranscript=Boolean(a.report.texts[0].transcript)}),a.startTranscript=function(){var b;b=a.hasTranscript?a.report.texts[0].transcript:angular.copy(a.report.texts[0].original),a.transcriptCandidate=b,a.editingTranscript=!0},a.cancelTranscriptEditing=function(){a.editingTranscript=!1},a.saveTranscript=function(){a.disableTranscript=!0;var b=angular.copy(a.report.texts);b[0].transcript=a.transcriptCandidate,d.reports.update(a.report,{texts:b}).then(function(b){a.disableTranscript=!1,a.editingTranscript=!1,l.stream.push(b)})},a.discardTranscript=function(){a.disableTranscript=!0;var b=angular.copy(a.report.texts);delete b[0].transcript,d.reports.update(a.report,{texts:b}).then(function(b){a.disableTranscript=!1,l.stream.push(b)})},a.deleteSummary=function(){a.deleteSummaryDisabled=!0,d.reports.remove(a.report).then(function(){h.history.back(),l.remove()})}}]),angular.module("citizendeskFrontendApp").controller("ReportTweetCtrl",["$scope","$routeParams","Raven","api","$location","Coverages","Report","linkTweetEntities","Bacon","$q","screenSize","superdeskDate","SharedReport",function(a,b,c,d,e,f,g,h,i,j,k,l,m){m.get(b.id).property.onValue(function(b){a.report=b,a.linkedText=h(b)})}]),angular.module("citizendeskFrontendApp").controller("MonitorCtrl",["$scope","$routeParams","api","Monitors","QueueSelection","linkTweetEntities","AliasesInLists","Raven",function(a,b,c,d,e,f,g,h){a.reports=[],c.reports.query({where:JSON.stringify({"channels.value":b.id}),sort:'[("produced", -1)]'}).then(function(b){b._items.forEach(function(b){try{b.linkedText=f(b),g.embedAuthorAlias(b),a.reports.push(b)}catch(c){h.raven.captureException(c)}})}),d.getById(b.id).then(function(b){e.description=b.user_id.username+"'s monitor",a.monitor=b})}]),angular.module("citizendeskFrontendApp").service("Monitors",["api","$q","lodash",function(a,b,c){var d,e=c;this.update=function(){var c,f;d=b.defer(),a.twt_streams.query({embedded:'{"user_id":true}'}).then(function(b){return c=b._items,a.twt_filters.query()}).then(function(a){f=a._items,c.forEach(function(a){a.filter=e.find(f,function(b){return b._id===a.spec.filter_id})}),d.resolve(c)})},this.getByUserId=function(a){return d.promise.then(function(b){return e.find(b,function(b){return b.user_id._id===a})})},this.getById=function(a){return d.promise.then(function(b){return e.find(b,function(b){return b._id===a})})},this.update(),this.promise=d.promise}]),angular.module("citizendeskFrontendApp").controller("NewTwitterSearchCtrl",["TwitterSearches","$scope","$location",function(a,b,c){b.submit=function(){b.loading=!0,a.create(b.terms).then(function(a){c.url("/twitter-search/"+a)})}}]),angular.module("citizendeskFrontendApp").service("TwitterSearches",["$resource","$q","Raven","$http","api","lodash","addNewValues","AliasesInLists","Report","config","reportStatuses","session","allPages",function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=this,o=f;this.list=[],this.promise=e.twt_searches.query({where:JSON.stringify({creator:l.identity._id})}).then(function(a){return n.list=a._items,n.list}),this.start=function(a){return"reports"in a?b.when(a):(a.reports=[],a.limit=50,d.post(j.server.url+"proxy/start-twitter-search/",{user_id:"1",request_id:a._id,search_spec:{query:a.query}}).then(function(){return n.fetchResults(a)}))},this.create=function(a){return e.twt_searches.create({description:a,query:{contains:[a]},creator:l.identity._id}).then(function(a){return n.list.push(a),a._id})},this.fetchResults=function(a){var b=JSON.stringify({$and:[{"channels.request":a._id},{status:k("")},{assignments:{$size:0}}]});return m(function(c){return e.reports.query({where:b,sort:'[("produced", -1)]',page:c}).then(function(b){return g(a.reports,b._items),a.reports.forEach(h.embedAuthorAlias),b})}).then(function(){return a})},this.byId=function(a){return n.promise.then(function(b){for(var d=!1,e=0;e<b.length;e++)("undefined"==typeof a||b[e]._id===a)&&(d=b[e]);return d?n.start(d):void c.raven.captureMessage("twitter search with id "+a+" not found")})},this.delete=function(a){var b=e.twt_searches.remove(a);return b.then(function(){o.remove(n.list,a)}),b},this.refreshReport=function(a,b){return n.byId(a).then(function(a){return e.reports.getById(b,{embedded:'{"assignments.user_id": true }'}).then(function(c){var d=o.findIndex(a.reports,function(a){return a._id===b});return i.linkTweetTexts(c),a.reports[d]=c,{index:d,fresh:c}})})}}]),angular.module("citizendeskFrontendApp").controller("TwitterSearchCtrl",["$scope","TwitterSearches","$routeParams","$location","QueueSelection","PageBroker","linkTweetEntities","AliasesInLists","ScrollTo",function(a,b,c,d,e,f,g,h,i){function j(){var a=f.getReturnedData();a&&a.updateId&&(i.targetStream.push(a.updateId),b.refreshReport(c.id,a.updateId))}function k(a){a.linkedText=g(a),h.embedAuthorAlias(a)}a.loading=!0,b.byId(c.id).then(function(b){b?(j(),e.description=b.description,b.reports.forEach(k),a.queue=b):d.url("/error-no-searches")}).then(function(){a.loading=!1}),a.delete=function(){a.status="deleting",b.delete(a.queue).then(function(){a.status="deleted"})},a.assign=function(a){f.load("/assign/",{report:a})}}]),angular.module("citizendeskFrontendApp").directive("reportSummary",function(){return{templateUrl:"views/directives/report-summary.html"}}),angular.module("citizendeskFrontendApp").factory("$exceptionHandler",["$injector","$log",function(a,b){return function(c,d){b.error(c.stack);var e=a.get("Raven");e.raven.captureException(c,{extra:{cause:d}})}}]),angular.module("citizendeskFrontendApp").factory("errorHttpInterceptor",["$injector","$q","Body","Raven","ErrorPolice",function(a,b,c,d,e){function f(a,f){var g=e.identify(a);if(g.length)return b.reject(g);c.connectionError=f;var h;return h=a.config.data?JSON.stringify(a.config.data).slice(0,50):"the corresponding request had no data",d.raven.captureException(new Error(f),{extra:{responseData:a.data,responseStatus:a.status,requestLocation:a.config.url,request50char:h,requestMethod:a.config.method}}),b.reject([])}return{responseError:function(a){return f(a,"HTTP response error")},response:function(a){return a.data&&a.data._status&&"ERR"===a.data._status?f(a,"Server side application error"):a}}}]),angular.module("citizendeskFrontendApp").directive("queueSelection",function(){return{templateUrl:"views/directives/queue-selection.html"}}),angular.module("citizendeskFrontendApp").controller("QueueSelectionCtrl",["$scope","TwitterSearches","QueueSelection",function(a,b,c){a.monitors=[],a.service=c,b.promise.then(function(b){a.searches=b})}]),angular.module("citizendeskFrontendApp").service("QueueSelection",["$rootScope",function(a){var b=this;this.onLocationChangeSuccess=function(){delete b.description},a.$on("$locationChangeSuccess",b.onLocationChangeSuccess)}]),angular.module("citizendeskFrontendApp").factory("lodash",function(){return _}),angular.module("citizendeskFrontendApp").controller("MobileQueueCtrl",["$scope","api","QueueSelection","PageBroker","AliasesInLists","reportStatuses","Report","lodash","allPages",function(a,b,c,d,e,f,g,h,i){c.description="Reports coming from mobile phones",a.reports=[],a.loading=!0,a.disabled={},a.assign=function(a){d.load("/assign/",{report:a})},a.dismiss=g.getDismiss(a.disabled,function(b){h.remove(a.reports,function(a){return a._id===b._id})}),i(function(c){return b.reports.query({where:JSON.stringify({$and:[{feed_type:"sms"},{local:{$ne:!0}},{automatic:{$ne:!0}},{status:f("")},{assignments:{$size:0}}]}),sort:'[("produced", -1)]',page:c}).then(function(b){return b._items.forEach(function(a){e.embedAuthorAlias(a)}),a.reports=a.reports.concat(b._items),a.loading=!1,b})})}]),angular.module("citizendeskFrontendApp").factory("AuthInterceptor",["session","$q","$injector",function(a,b,c){function d(b){return a.expire(),a.getIdentity().then(function(){var d=c.get("$http");return d.defaults.headers.common.Authorization=a.token,b.config.headers.Authorization=a.token,d(b.config)})}return{response:function(a){return 401===a.status?d(a):a},responseError:function(a){return 401===a.status?d(a):b.reject(a)}}}]),angular.module("citizendeskFrontendApp").service("session",["lodash","$q","$rootScope","storage",function(a,b,c,d){function e(a){a?localStorage.setItem(i,a):localStorage.removeItem(i)}function f(a){a?localStorage.setItem(j,a):localStorage.removeItem(j)}function g(){return localStorage.getItem(i)||null}var h,i="sess:id",j="sess:href",k="sess:user";this.token=null,this.identity=null,this.getIdentity=function(){return h=h?h:b.defer(),h.promise},this.updateIdentity=function(a){this.identity=this.identity||{},_.extend(this.identity,a),d.setItem(k,this.identity)},this.start=function(a,b){this.token=a.token,e(a.token),f(a._links.self.href),this.identity=null,this.updateIdentity(b),h&&(h.resolve(b),h=null)},this.expire=function(){this.token=null,e(null)},this.clear=function(){this.expire(),this.identity=null,f(null),d.removeItem(k)},this.getSessionHref=function(){return localStorage.getItem(j)},c.$watch(g,_.bind(function(a){this.token=a,this.identity=d.getItem(k)},this))}]),angular.module("citizendeskFrontendApp").service("storage",function(){this.getItem=function(a){return angular.fromJson(localStorage.getItem(a))},this.setItem=function(a,b){localStorage.setItem(a,angular.toJson(b))},this.removeItem=function(a){localStorage.removeItem(a)},this.clear=function(){localStorage.clear()}}),angular.module("citizendeskFrontendApp").factory("initAuth",["$rootScope","$route","$location","$http","$window","session",function(a,b,c,d,e,f){function g(){g.onLocationChange=function(a){f.token||(f.getIdentity().then(function(){d.defaults.headers.common.Authorization="Basic "+btoa(f.token+":"),b.reload()}),a.preventDefault())},a.$on("$locationChangeStart",g.onLocationChange),a.$watch(function(){return f.identity},function(){a.currentUser=f.identity}),a.$watch(function(){return f.token},function(a){a?d.defaults.headers.common.Authorization="Basic "+btoa(a+":"):delete d.defaults.headers.common.Authorization})}return g}]),angular.module("citizendeskFrontendApp").provider("auth",function(){var a=this;this.disabled=!1,this.$get=["$q","api","session","authAdapter",function(b,c,d,e){return a.disabled?{}:{login:function(a,b){return e.authenticate(a,b).then(function(a){return c.users.getById(a.user).then(function(b){return d.start(a,b),d.identity})})},logout:function(){d.clear()}}}]}),angular.module("citizendeskFrontendApp").service("authAdapter",["$http","$q","config",function(a,b,c){this.authenticate=function(b,d){return a.post(c.server.url+"auth",{username:b,password:d}).then(function(b){return a.defaults.headers.common.Authorization="Basic "+btoa(b.data.token+":"),b.data})}}]),angular.module("citizendeskFrontendApp").controller("LoginCtrl",["$scope","$modal","auth","$location","session",function(a,b,c,d,e){a.watcher=function(){return e.token},a.$watch(a.watcher,function(c){a.identity=e.identity,a.username=e.identity?e.identity.username:null,a.password=null,c||(a.modal=b.open({templateUrl:"views/modals/login.html",keyboard:!1,backdrop:"static"}))}),a.logout=c.logout}]),angular.module("citizendeskFrontendApp").controller("LoginModalCtrl",["$scope","auth",function(a,b){a.username="",a.password="",a.messages={},a.onCredentialsChange=function(b,c){b!==c&&(a.messages={})},a.$watchGroup(["username","password"],a.onCredentialsChange),a.submit=function(){b.login(a.username,a.password).then(function(){a.$close()}).catch(function(b){b.forEach(function(b){a.messages[b]=!0})})}}]),angular.module("citizendeskFrontendApp").controller("CitizenCardCtrl",["$scope","$routeParams","api","config","$http","PageBroker","$location","linkTweetEntities",function(a,b,c,d,e,f,g,h){a.aliasesHandler=function(b){var c=b._items,d=c.length;if(a.response=b,d>0&&(a.alias=c[0],d>1))throw new Error("multiple aliases for the same user");return d>0},a.getAliases=function(){return c.citizen_aliases.query({where:JSON.stringify({"identifiers.user_name":b.id,authority:b.authority}),embedded:'{"tags": 1, "identity_record_id":1}'}).then(a.aliasesHandler)},a.loading=!0,a.getAliases().then(function(f){if(!f){var g,h=b.authority,i=b.id;g="citizen_desk"===h?c.users.getById(i).then(function(a){return c.citizen_aliases.save({authority:h,identifiers:{user_id:a.id,user_id_search:a.id,user_name:a.username},tags:[],avatars:[]})}):e({method:"POST",url:d.server.url+"proxy/fetch-citizen-alias/",data:{authority:h,name:i}}),g.then(a.getAliases),a.loading=!1}}),c.reports.query({where:JSON.stringify({"authors.identifiers.user_name":b.id,"authors.authority":b.authority})}).then(function(b){a.reports=b._items,a.reports.forEach(function(a){"tweet"===a.feed_type&&(a.linkedText=h(a))})}),a.editTags=function(){f.load("/edit-user-lists",a.alias)},a.associate=function(){g.url("/list-identity-records/"+a.alias._id)}}]),angular.module("citizendeskFrontendApp").factory("addNewValues",["lodash",function(a){var b=a;return function(a,c){function d(c){var d=b.find(a,function(a){return c._id===a._id});return"undefined"==typeof d?!0:!1}var e=b.filter(c,d);e.forEach(function(b){a.push(b)})}}]),angular.module("citizendeskFrontendApp").filter("sortByDate",["lodash","superdeskDate",function(a,b){function c(a){return b.parse(a)}return function(a,b,d){if(a){var e=angular.copy(a);return e.sort(function(a,e){return d?c(e[b])-c(a[b]):c(a[b])-c(e[b])}),e}return[]}}]),angular.module("citizendeskFrontendApp").controller("SessionCtrl",["$scope","api","$routeParams","$http","config","session","addNewValues","PagePolling","Body","$filter","$location","Report","reportStatuses",function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(a,c,d){var e=angular.copy(a);e.page=d||1,b.reports.query(e).then(function(a){c(a),a._links.next&&n(e,c,d+1)})}function o(){var b={where:JSON.stringify({$and:[{session:c.session},{summary:!0}]}),sort:'[("produced", 1)]'};n(b,function(b){g(a.summaries,b._items)})}function p(){var b={where:JSON.stringify({$and:[{session:c.session},{summary:!1}]}),sort:'[("produced", 1)]'};n(b,function(b){g(a.reports,b._items)})}function q(c){b.users.query({page:c}).then(function(b){b._items.map(function(b){a.users[b._id]=b}),b._links.next&&q(c+1)})}i.glue=!0,a.body=i,a.reports=[],a.summaries=[],a.replies={},a.users={},a.$watch("reports",function(){for(var b=a.reports.length-1;b>=0;b--)if(!a.reports[b].local)return void(a.replyReport=a.reports[b])},!0),a.reset=function(){a.reply=""},a.sendReply=function(){var b={report_id:a.replyReport._id,message:a.reply};b.user_id=f.identity._id,b.sensitive=!1,b.language="en",d.post(e.server.url+"proxy/mobile-reply/",b).then(function(){a.reset(),p()})},p(),o(),a.onInterval=function(){p()},h.setInterval(a.onInterval,1e4),q(1),a.submitSummary=function(){var d=l.create({session:c.session});d.texts=[{original:a.summaryContent}],d.status=m("verified"),d.summary=!0,b.reports.save(d).then(function(){o()})},a.goToSummary=function(){k.url("/report-sms/"+a.summaries[0]._id)}}]),angular.module("citizendeskFrontendApp").service("PagePolling",["$interval","$rootScope",function(a,b){var c=this;this.promises=[],this.setInterval=function(b,d){var e=a(b,d);return c.promises.push(e),e},b.$on("$routeChangeStart",function(){c.promises.forEach(function(b){a.cancel(b)}),c.promises=[]})}]),angular.module("citizendeskFrontendApp").factory("now",function(){return function(){var a=new Date;return a.getTime()}}),angular.module("citizendeskFrontendApp").provider("cacheBuster",function(){var a=this;this.disabled=!1,this.$get=["now","$templateCache",function(b,c){return{request:function(d){if(a.disabled)return d;if(c.get(d.url))return d;var e;return e=-1!==d.url.search("\\?")?"&":"?",d.url+=e+"cachebuster="+b(),d}}}]}),angular.module("citizendeskFrontendApp").service("Assign",["api","$q","allPages",function(a,b,c){var d=this;this.users=[],this.totals={},this.updateTotals=function(){e.then(function(){d.users.forEach(function(b){a.reports.query({where:JSON.stringify({$and:[{"assignments.user_id":b._id},{$or:[{status:""},{status:{$exists:!1}},{"coverages.published":{$size:0}}]}]})}).then(function(a){d.totals[b._id]=a._meta.total})})})};var e=c(function(b){return a.users.query({page:b}).then(function(a){return a._items.forEach(function(a){d.users.push(a)}),a})})}]),angular.module("citizendeskFrontendApp").controller("AssignCtrl",["$scope","Assign","PageBroker","api","$http","session","reportStatuses","superdeskDate",function(a,b,c,d,e,f,g,h){a.users=b.users,a.totals=b.totals,a.identity=f.identity,a.disabled=!1,c.getData("/twitter-search/").then(function(b){a.report=b.report}),b.updateTotals(),a.assignTo=function(b){a.disabled=!0,d.reports.update(a.report,{assignments:[{user_id:b}],status:g(""),status_updated:h.render(new Date),proto:!1}).then(function(){c.back({updateId:a.report._id})})},a.back=function(){c.back({updateId:a.report._id})}}]),angular.module("citizendeskFrontendApp").service("PageBroker",["$location","$rootScope","$q","$window",function(a,b,c,d){function e(){f=null,g=null}var f,g,h;e(),b.$on("$locationChangeSuccess",function(){h?h=!1:e()}),this.load=function(b,c){f=c,g=b,h=!0,a.url(b)},this.getData=function(b){var d=c.defer();return null===f?(a.url(b),d.reject()):d.resolve(angular.copy(f)),d.promise},this.back=function(a){f=a,h=!0,d.history.back()},this.getReturnedData=function(){return f}}]);