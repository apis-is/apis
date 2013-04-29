# [Apis.is](http://apis.is) - Endapunktar fyrir alla!

Tilgangur [Apis.is](http://apis.is) er að veita forriturum og áhugamönnum aðgang að gögnum og upplýsingum á eins aðgengilegan hátt og völ er á. Allar upplýsingar eru sóttar af opnum vefsíðum og gerðar aðgengilegri fyrir þá sem vilja með json þjónustum.

**Ekki hika við að hjálpa til, öll þekking og hjálp er vel þegin!**

##Núverandi gögn sem hægt er að fá á apis.is
+ [Strætógögn](http://apis.is#bus)
	+ Mögulegar leiðir milli tveggja staða
 		+ Hægt er að leita út frá GPS-hnitum eða götunöfnum.
 		+ Komutímar og brotfaratímar
 		+ Kemur með nokkrar tillögur að leiðum
	+ Rauntímagögn um staðsetningu strætóa
+ [Símaskrá](http://apis.is#phone)
	+ Leit
		+ Hægt að leita út frá nafni eða símanúmeri
		+ Skilar slóð á .vcf upplýsingakort fyrir einstakling
		+ Þegar vélbúnaðarkostur verður uppfærður bætast nokkrir áhugaverðir hlutir hér.
+ [Gjaldmiðlar](http://apis.is#currency)
	+ Listi yfir alla gjaldmiðla
		+ Sýnir heiti gjaldmiðla, breytingar dagsins í dag ásamt kaup og sölugengi(fer eftir hvaða upplýsingaveita er valin)
+ [SMS](http://apis.is#sms)
	+ Sendir smáskilaboð á tilgreint númer
		+ Þessi endapunktur er lokaður eins og stendur þar sem bent var á að það væri ekki æskilegt að hafa hann opinn. Hafðu samband ef að þú villt aðgang.
+ [Fyrirtæki](http://apis.is#company)
	+ Skilar upplýsingum um fyrirtæki
		+Hægt er að leita út frá nafni, heimilsfangi, kennitölu eða vasknúmeri.


## Gögn sem væri sniðugt að bæta við sem endapunktum:

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

##Prófanir
Hægt er að keyra integration tests fyrir hluta af vefþjónustunum með því að nota skipunina:

    node_modules/mocha/bin/mocha test/integration

##Hvað þarf að gera til að bæta við endapunk
Endapunktar virka allir núna eingöngu þannig að um leið og gert er request í hann þá sækir hann og parsar viðeigandi síðu eða API annarsstaðar og skilar útkomu.

###Skref fyrir skref:
+ Best er að skoða einn endapunktinn til að sjá hvernig aðrir hafa verið implementaðir
+ Bæta við möppu í `endpoints/` undir viðeigandi nafni
+ Þar ætti að vera `index.js` skrá, sem exportar function sem heitir `setup`, hann tekur við einu argumenti `server`. Þar þarftu að binda þá slóð sem þú vilt að endapunkturinn hlusti á.

####Dæmi (í endpoints/kaboom):

    exports.setup = function(server){
        server.get({path: '/kaboom', version: '1.0.0'}, function(){
            // hér gerast galdrarnir
        });
    };

+ Endapunktum er, enn sem komið er, frjálst að bæta við requires() modulum að þörf.
+ Best væri ef hver endapunktur mundi skrásetja hvernig maður notar endapunktinn, ss. hvaða parameters hann tekur við osfrv
+ Það væri frábært að bæta við unit testum fyrir parta úr endapunktunum, en enn sem komið er gerir enginn annar endapunktur það.
+ Lágmark er að bæta við integration testi fyrir endapunktinn. Það er gert með því að bæta við möppu inn í endapunktinum sem heitir `tests`, og þar inni skal vera skrá sem heitir `integration_test.js`. Hægt er að líta á aðra endapunkta fyrir dæmi um hvernig það er gert.

