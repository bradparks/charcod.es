define("search",function(a){function b(a){a=a.toLowerCase();if(a.length===0)return[];if(a.length<3)return[a];var b=[];for(var c=0;c<=a.length-3;c+=1)b.push(a.substr(c,3));return b}function c(){this.trigramTable={},this.resultIndex=[]}return c.prototype.addTerm=function(a,c){var d={};this.resultIndex.push(c);for(var e=0;e<a.length;e+=1){var d=b(a[e]);for(var f=0;f<d.length;f+=1){var g=d[f];g in this.trigramTable||(this.trigramTable[g]=[]),this.trigramTable[g].push(this.resultIndex.length-1)}}},c.prototype.search=function(a,c){var d=this,e=a.toLowerCase().split(" "),c=c||300,f=[],g={};e.forEach(function(a,c){f=f.concat(b(a))}),f.forEach(function(a){if(a in d.trigramTable){var b=d.trigramTable[a];for(var c=0;c<b.length;c+=1){var e=b[c];g[e]=g[e]||0,g[e]=g[e]+1}}});var h=[];for(var i in g)h.push({code:i,score:g[i]});if(h.length>0){h.sort(function(a,b){return b.score!==a.score?b.score-a.score:a.code-b.code});var j=Math.ceil(h[0].score/2),k=[];for(var l=0;l<h.length&&l<c;l+=1)k.push(h[l]);return k.map(function(a){return d.resultIndex[a.code]})}return[]},c}),require(["search"],function(a){function b(a){var b=a.match(/^\\u([\dABCDEFabcdef]{4})$/),c=a.match(/^&#(\d+);$/)||a.match(/^(\d+)$/),d=undefined;return b?d=parseInt(b[1],16):c?d=c[1]:a.length===1&&(d=a.charCodeAt(0)),d}function c(a){return Math.floor((a-65536)/1024)+55296}function d(a){return(a-65536)%1024+56320}function e(a){if(a<=65535)return"\\u"+(a+65536).toString(16).substr(-4).toUpperCase();throw"Code point outside BMP cannot be encoded."}function f(a){return a<=65535?e(a):e(c(a))+e(d(a))}function l(a){_gaq.push(["_trackEvent","search",undefined,a]);var b=[],c=a.match(/^\\u(\d{4})$/),d=a.match(/^&#(\d+);$/)||a.match(/^(\d+)$/);c?b=[parseInt(c[1],16)]:d?b=[d[1]]:b=k.search(a),a.length===1&&b.length===0&&(b=[a.charCodeAt(0)]),b.length===0?$("#help").show():$("#help").hide(),$("#results").html($.map(b,function(a){var b=g[a]&&g[a].n.indexOf("combining")!==-1,c=(b?"&#9676;":"")+"&#"+a+";";return'<a href="#id'+a+'" id="id'+a+'">'+c+"</a>"}).join("")),b.length===1&&h.activate($("#results a").first())}function m(){if(!location.hash)return;var a=location.hash.split("#")[1],c=a.match(/^([^\/]+)\/(.*)$/),d=b(a),e=undefined,f=undefined;c?(e=c[1],f=c[2]):d?e=f=d:(e=a,f=undefined),f&&e===undefined&&(e=f),j.val(e),l(e);if(f){var g=$("#id"+f).first();g&&h.activate(g)}}document.getElementById("searchField").focus(),document.forms[0].onsubmit=function(){return!1},_gaq=window._gaq||[],_gaq.push(["_setAccount","UA-33198175-1"]),_gaq.push(["_setDomainName","charcod.es"]),_gaq.push(["_trackPageview"]);var g={},h=function(){var a,b,c=function(a){var b=g[a],c=$(".templates .charInfo").clone(),d=g[a]&&g[a].n.indexOf("combining")!==-1,e=["&amp;#"+a+";"],h=$("#searchField").val(),i=h+"/"+a,j=a;return h===a&&(i=a),location.hash="#"+i,c.find("h2").html((d?"&#9676;":"")+"&#"+a+";"),c.find(".permalink").attr("href","#"+j),c.find(".char-source").html(f(parseInt(a,10))),c.find(".char-codepoint").html(a),b&&(c.find("h3").html(b.n),c.find(".char-group").attr("href","#"+b.b).html(b.b),b.a&&b.a.length>0&&c.find(".aliases").html(b.a.join(", ")),b.altnames&&b.altnames.html&&e.push("&amp;"+b.altnames.html+";"),c.find(".char-html").html(e.join("<br>")),_gaq.push(["_trackEvent","popup","activate",b.b]),b.altnames&&b.altnames.latex?c.find(".char-latex").html(b.altnames.latex):c.find(".char-latex-row").hide()),c};return{activate:function(d){var e=d[0].id.replace("id",""),f=d.position().top,g=d;a&&this.deactivate(),a=d,b=c(e);while(g.next().length&&g.next().position().top===f)g=g.next();b.insertAfter(g),a.addClass("active")},deactivate:function(){_gaq.push(["_trackEvent","popup","deactivate"]),a.removeClass("active"),b&&b.remove(),a=b=undefined}}}();$("#results").on("click","a",function(a){h.activate($(a.target)),a.preventDefault()});var i,j=$("#searchField");j.keyup(function(a){i&&window.clearTimeout(i),i=window.setTimeout(function(){l(j.val().trim())},250)}),$(".form-search").submit(function(){return l(j.val().trim()),!1});var k=new a;$.ajax({url:"data.json",dataType:"json",success:function(a){var b,c=a.length,d,e,f;for(b=0;b<c;b+=1){d=a[b],g[d.c]=d,e=[].concat(d.n.split(" "),[d.b],d.a?d.a:[]);if(d.altnames)for(f in d.altnames)e.push(d.altnames[f]);k.addTerm(e,d.c)}j.val()&&l(j.val()),m()},error:function(){throw new Error("could not load data.json: "+arguments)}}),window.onhashchange=function(a){a.newURL!==a.oldURL&&m()},m()}),define("app",function(){})