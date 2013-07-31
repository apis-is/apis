# [Apis.is](http://apis.is) - Endapunktar fyrir alla!

*[Click here for an english README](https://github.com/kristjanmik/apis/blob/master/README_EN.md)*

Tilgangur [Apis.is](http://apis.is) er að veita forriturum og áhugamönnum aðgang að gögnum og upplýsingum á eins aðgengilegan hátt og völ er á. Allar upplýsingar eru sóttar af opnum vefsíðum og gerðar aðgengilegri fyrir þá sem vilja með json þjónustum.

**Ekki hika við að hjálpa til, öll þekking og hjálp er vel þegin!**

##Prófanir
Hægt er að keyra integration tests fyrir hluta af vefþjónustunum með því að nota skipunina:

```sh
$ node_modules/mocha/bin/mocha test/integration
```

##Hvað þarf að gera til að bæta við endapunkt?
Endapunktar virka allir núna eingöngu þannig að um leið og það er kallað í hann þá sækir hann og parsar viðeigandi síðu eða API annarsstaðar og skilar útkomu.

###Skref fyrir skref:
+ Best er að skoða einn endapunktinn til að sjá hvernig aðrir hafa verið innleiddir
+ Bæta við möppu í `endpoints/` undir viðeigandi nafni
+ Þar ætti að vera `index.js` skrá, sem exportar function sem heitir `setup`, hann tekur við einu argumenti `server`. Þar þarftu að binda þá slóð sem þú vilt að endapunkturinn hlusti á.

####Dæmi (í endpoints/kaboom):

```javascript
exports.setup = function (server) {
	server.get({
		path: '/kaboom',
		version: '1.0.0'
	}, function (request, response, next) {
		// hér gerast galdrarnir
	});
};
```

####Hægt er að lesa um hvernig hægt er að meðhöndla bæði request og response [hérna](http://mcavage.github.io/node-restify)

+ Endapunktum er, enn sem komið er, frjálst að bæta við requires() modulum að þörf.
+ Best væri ef hver endapunktur mundi skrásetja hvernig maður notar endapunktinn, ss. hvaða parameters hann tekur við osfrv
+ Það væri frábært að bæta við unit testum fyrir parta úr endapunktunum, en enn sem komið er gerir enginn annar endapunktur það.
+ Lágmark er að bæta við [integration testi](http://en.wikipedia.org/wiki/Integration_testing) fyrir endapunktinn. Það er gert með því að bæta við möppu inn í endapunktinum sem heitir `tests/`, og þar inni skal vera skrá sem heitir `integration_test.js`. Hægt er að líta á aðra endapunkta fyrir dæmi um hvernig það er gert.

## Gögn sem hægt er að vinna úr og hugsanlega bæta við sem endapunkt:

+ Flug:
	+ [kefairport.is](http://www.kefairport.is/)
+ Veður:
	+ [m.vegagerdin.is](http://m.vegagerdin.is/)
+ Póstnúmer og götuheiti:
	+ [postur.is/desktopdefault.aspx/tabid-452/186_read-329](http://www.postur.is/desktopdefault.aspx/tabid-452/186_read-329/)
+ Orðasöfn og tungumálagagnabankar:
	+ [snara.is/bls/um/_staf.aspx](http://snara.is/bls/um/_staf.aspx)
	+ [bin.arnastofnun.is](http://bin.arnastofnun.is/)
+ Fjármálaupplýsingar:
	+ [arionbanki.is/markadir](http://www.arionbanki.is/markadir)
+ Almennur fróðleikur:
	+ [visindavefur.hi.is](http://www.visindavefur.hi.is/)
+ Hagnýtar upplýsingar:
	+ [hagstofa.is](http://www.hagstofa.is/)
+ Bíóupplýsingar:
	+ [midi.is/forsida](http://midi.is/forsida/)
	+ [m.kvikmyndir.is/bio](http://m.kvikmyndir.is/bio/)
+  Sjónvarpsdagskrá allra stöðva
	+ [dagskra.ruv.is/dagskra](http://dagskra.ruv.is/dagskra/)
	+ [skjarinn.is/einn](http://www.skjarinn.is/einn/)
	+ [stod2.is/Dagskra/dagskra?stod=STOD2](http://stod2.is/Dagskra/dagskra?stod=STOD2)
	+ [n4.is/page/dagskra](http://www.n4.is/page/dagskra)
+  Upplýsingar úr skráningu Isnic
    + [https://www.isnic.is/is/whois/mini.php?type=all&query=apis.is](https://www.isnic.is/is/whois/mini.php?type=all&query=apis.is)

##Áhugaverðar síður:
+ [arnastofnun.is/page/gagnasofn](http://arnastofnun.is/page/gagnasofn)
+ [opingogn.net/wiki](http://opingogn.net/wiki/)

