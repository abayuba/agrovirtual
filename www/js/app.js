angular.module("agrovirtual", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","agrovirtual.controllers", "agrovirtual.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Agrovirtual" ;
		$rootScope.appLogo = "data/images/images/logo.png" ;
		$rootScope.appVersion = "1.0" ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "agrovirtual",
				storeName : "agrovirtual",
				description : "The offline datastore for Agrovirtual app"
			});



			//required: cordova plugin add onesignal-cordova-plugin --save
			if(window.plugins && window.plugins.OneSignal){
				window.plugins.OneSignal.enableNotificationsWhenActive(true);
				var notificationOpenedCallback = function(jsonData){
					try {
						$interval(function(){
							$window.location = "#/agrovirtual/" + jsonData.notification.payload.additionalData.page ;
						},200);
					} catch(e){
						console.log("onesignal:" + e);
					}
				}
				window.plugins.OneSignal.startInit("7e7af6a0-d0aa-4604-b5da-3c310e5b99e3").handleNotificationOpened(notificationOpenedCallback).endInit();
			}    


		});
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})




.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("agrovirtual",{
		url: "/agrovirtual",
			abstract: true,
			templateUrl: "templates/agrovirtual-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("agrovirtual.about_us", {
		url: "/about_us",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.arrendamientos", {
		url: "/arrendamientos",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-arrendamientos.html",
						controller: "arrendamientosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.arrendamientos_singles", {
		url: "/arrendamientos_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-arrendamientos_singles.html",
						controller: "arrendamientos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.bobinos", {
		url: "/bobinos",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-bobinos.html",
						controller: "bobinosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.contactar", {
		url: "/contactar",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-contactar.html",
						controller: "contactarCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.dashboard", {
		url: "/dashboard",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.destacado_singles", {
		url: "/destacado_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-destacado_singles.html",
						controller: "destacado_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.destacados", {
		url: "/destacados",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-destacados.html",
						controller: "destacadosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.formlarios_para_publicar", {
		url: "/formlarios_para_publicar",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-formlarios_para_publicar.html",
						controller: "formlarios_para_publicarCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.inmebles_singles", {
		url: "/inmebles_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-inmebles_singles.html",
						controller: "inmebles_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.inmuebles", {
		url: "/inmuebles",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-inmuebles.html",
						controller: "inmueblesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.insumos", {
		url: "/insumos",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-insumos.html",
						controller: "insumosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.insumos_singles", {
		url: "/insumos_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-insumos_singles.html",
						controller: "insumos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.lotes", {
		url: "/lotes",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-lotes.html",
						controller: "lotesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.lotes_comprar", {
		url: "/lotes_comprar",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-lotes_comprar.html",
						controller: "lotes_comprarCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.lotes_comprar_singles", {
		url: "/lotes_comprar_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-lotes_comprar_singles.html",
						controller: "lotes_comprar_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.lotes_vender", {
		url: "/lotes_vender",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-lotes_vender.html",
						controller: "lotes_venderCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.lotes_vender_comprar", {
		url: "/lotes_vender_comprar",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-lotes_vender_comprar.html",
						controller: "lotes_vender_comprarCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.lotes_vender_singles", {
		url: "/lotes_vender_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-lotes_vender_singles.html",
						controller: "lotes_vender_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.ovinos", {
		url: "/ovinos",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-ovinos.html",
						controller: "ovinosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.ovinos_singles", {
		url: "/ovinos_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-ovinos_singles.html",
						controller: "ovinos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.post_bobinos_singles", {
		url: "/post_bobinos_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-post_bobinos_singles.html",
						controller: "post_bobinos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.post_singles", {
		url: "/post_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.postsimple_singles", {
		url: "/postsimple_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-postsimple_singles.html",
						controller: "postsimple_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.publicar", {
		url: "/publicar",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-publicar.html",
						controller: "publicarCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.que_es_agrovirtual", {
		url: "/que_es_agrovirtual",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-que_es_agrovirtual.html",
						controller: "que_es_agrovirtualCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.recuperar_contrasea", {
		url: "/recuperar_contrasea",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-recuperar_contrasea.html",
						controller: "recuperar_contraseaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.servicios_singles", {
		url: "/servicios_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-servicios_singles.html",
						controller: "servicios_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.servicos", {
		url: "/servicos",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-servicos.html",
						controller: "servicosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.trabajo_singles", {
		url: "/trabajo_singles/:id",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-trabajo_singles.html",
						controller: "trabajo_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.trabajos", {
		url: "/trabajos",
		cache:false,
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-trabajos.html",
						controller: "trabajosCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.user_login", {
		url: "/user_login",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-user_login.html",
						controller: "user_loginCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.user_profile", {
		url: "/user_profile",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-user_profile.html",
						controller: "user_profileCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("agrovirtual.user_register", {
		url: "/user_register",
		views: {
			"agrovirtual-side_menus" : {
						templateUrl:"templates/agrovirtual-user_register.html",
						controller: "user_registerCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/agrovirtual/dashboard");
});
