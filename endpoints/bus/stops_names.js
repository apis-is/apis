/* Last updated 25th April 2017 */

const busStopNames = {
    "20000020": {
        "code": "FJÖLBR1",
        "name": "Fjölbrautaskóli Suðurnesja / FS",
        "lat": 63.996435,
        "lon": -22.562531
    },
    "20000021": {
        "code": "HOLTAS1",
        "name": "Holtaskóli",
        "lat": 63.99847,
        "lon": -22.562761
    },
    "60000143": {
        "code": "TRYGGV3",
        "name": "Tryggvabraut / Hvannavellir",
        "lat": 65.689918,
        "lon": -18.097514
    },
    "20000022": {
        "code": "HRING15",
        "name": "Hringbraut / Norðurtún",
        "lat": 64.00089,
        "lon": -22.559641
    },
    "60000142": {
        "code": "SLÖKKVI",
        "name": "Tryggvabraut / Slökkvistöð",
        "lat": 65.691062,
        "lon": -18.093708
    },
    "60000141": {
        "code": "GLERÁR5",
        "name": "Glerárgata / Ráðhús",
        "lat": 65.685184,
        "lon": -18.091117
    },
    "60000140": {
        "code": "HLÍÐA21",
        "name": "Hlíðarbraut / Tröllagil",
        "lat": 65.686593,
        "lon": -18.129323
    },
    "87200001": {
        "code": "BRAUTAR",
        "name": "Brautarholt",
        "lat": 64.023167,
        "lon": -20.521894
    },
    "87200002": {
        "code": "VEGAMÓ9",
        "name": "Skeiða- og Þjórsárdalsvegur",
        "lat": 64.046013,
        "lon": -20.411393
    },
    "31770002": {
        "code": "STYKKI1",
        "name": "Stykkishólmur - Olís",
        "lat": 65.072023,
        "lon": -22.733308
    },
    "20000013": {
        "code": "NJARÐVÍ",
        "name": "Njarðvíkurtorg",
        "lat": 63.988328,
        "lon": -22.548869
    },
    "20000014": {
        "code": "STEKKJ2",
        "name": "Stekkjarkot",
        "lat": 63.972134,
        "lon": -22.530116
    },
    "20000015": {
        "code": "STEKKJ3",
        "name": "Stekkjarkot",
        "lat": 63.971988,
        "lon": -22.530065
    },
    "20000016": {
        "code": "NJARÐA6",
        "name": "Steinás",
        "lat": 63.977047,
        "lon": -22.547051
    },
    "20000017": {
        "code": "NJARÐA7",
        "name": "Bolafótur",
        "lat": 63.985411,
        "lon": -22.549051
    },
    "20000018": {
        "code": "NJARÐV1",
        "name": "Njarðvíkurtorg",
        "lat": 63.987696,
        "lon": -22.548561
    },
    "60000139": {
        "code": "KAUPVA1",
        "name": "Kaupvangsstræti",
        "lat": 65.680587,
        "lon": -18.090284
    },
    "76177651": {
        "code": "DJÚPIV1",
        "name": "Djúpivogur / Hótel Framtíð",
        "lat": 64.6563,
        "lon": -14.2807
    },
    "60000137": {
        "code": "KAUPVAN",
        "name": "Þingvallastræti / Byggðavegur",
        "lat": 65.679119,
        "lon": -18.103151
    },
    "20000010": {
        "code": "NESVELL",
        "name": "Nesvellir",
        "lat": 63.991154,
        "lon": -22.549142
    },
    "60000132": {
        "code": "HJALTE2",
        "name": "Hjalteyrargata / Grenivellir",
        "lat": 65.689563,
        "lon": -18.086457
    },
    "20000011": {
        "code": "NJARÐA4",
        "name": "Bolafótur",
        "lat": 63.985702,
        "lon": -22.549317
    },
    "20000012": {
        "code": "NJARÐA5",
        "name": "Steinás",
        "lat": 63.987306,
        "lon": -22.549081
    },
    "60000130": {
        "code": "ÞINGVAL",
        "name": "Þingvallastræti / Furulundur",
        "lat": 65.677423,
        "lon": -18.126252
    },
    "14001660": {
        "code": "KIRKJU3",
        "name": "Akurvellir",
        "lat": 64.049266,
        "lon": -21.983866
    },
    "14001661": {
        "code": "KIRKJU4",
        "name": "Akurvellir",
        "lat": 64.049251,
        "lon": -21.983721
    },
    "14001662": {
        "code": "KIRKJUG",
        "name": "Kirkjugarður Hafnarfjarðar",
        "lat": 64.061706,
        "lon": -21.941994
    },
    "20000003": {
        "code": "FITJAR",
        "name": "Fitjar",
        "lat": 63.973625,
        "lon": -22.54305
    },
    "20000006": {
        "code": "FITJAR1",
        "name": "Fitjar",
        "lat": 63.973935,
        "lon": -22.543178
    },
    "20000007": {
        "code": "KROSSMÓ",
        "name": "Miðstöð",
        "lat": 63.993969,
        "lon": -22.551521
    },
    "60000129": {
        "code": "VERKMEN",
        "name": "Mímisbraut / Verkmenntaskóli",
        "lat": 65.672467,
        "lon": -18.103809
    },
    "20000008": {
        "code": "HRING14",
        "name": "Hringbraut / Norðurtún",
        "lat": 64.000792,
        "lon": -22.559937
    },
    "60000128": {
        "code": "SKÓGAR9",
        "name": "Skógarlundur / Hlíðarlundur",
        "lat": 65.673686,
        "lon": -18.114603
    },
    "60000126": {
        "code": "FLÚÐIR",
        "name": "Þingvallastræti / Pálmholt",
        "lat": 65.677699,
        "lon": -18.12388
    },
    "60000125": {
        "code": "RÉTTARH",
        "name": "Réttarhvammur",
        "lat": 65.678866,
        "lon": -18.131584
    },
    "60000124": {
        "code": "RÉTTAR1",
        "name": "Réttarhvammur",
        "lat": 65.679715,
        "lon": -18.131744
    },
    "60000123": {
        "code": "GRÆNAGA",
        "name": "Hjalteyrargata / Gránufélagsgata",
        "lat": 65.686749,
        "lon": -18.082842
    },
    "60000120": {
        "code": "HJALTE1",
        "name": "Hjalteyrargata / Furuvellir",
        "lat": 65.691337,
        "lon": -18.091652
    },
    "90000180": {
        "code": "HOFSVA2",
        "name": "Hofsvallagata / Hávallagata",
        "lat": 64.147682,
        "lon": -21.951281
    },
    "90000182": {
        "code": "BORGAR1",
        "name": "Hótel Cabin",
        "lat": 64.146085,
        "lon": -21.895788
    },
    "90000183": {
        "code": "LAUGARN",
        "name": "Laugarnesvegur / Borgartún",
        "lat": 64.146955,
        "lon": -21.888467
    },
    "90000184": {
        "code": "LAUGAR1",
        "name": "Laugarnesvegur / Kirkjusandur",
        "lat": 64.149219,
        "lon": -21.884687
    },
    "90000185": {
        "code": "LAUGAR2",
        "name": "Laugarnestangi",
        "lat": 64.150978,
        "lon": -21.882624
    },
    "90000187": {
        "code": "DALBRAU",
        "name": "Dalbraut",
        "lat": 64.150644,
        "lon": -21.875004
    },
    "90000188": {
        "code": "HRAFNI1",
        "name": "Hrafnista",
        "lat": 64.149018,
        "lon": -21.867406
    },
    "60000119": {
        "code": "TRYGGV2",
        "name": "Tryggvabraut / Hvannavellir",
        "lat": 65.689801,
        "lon": -18.09744
    },
    "60000118": {
        "code": "GLERÁR3",
        "name": "Glerárbrú",
        "lat": 65.689223,
        "lon": -18.103407
    },
    "60000117": {
        "code": "GLERÁRB",
        "name": "Glerárbrú",
        "lat": 65.689287,
        "lon": -18.102869
    },
    "60000116": {
        "code": "HÖRGÁRB",
        "name": "Hörgárbraut / Stórholt",
        "lat": 65.69093,
        "lon": -18.107199
    },
    "60000115": {
        "code": "HÖRGÁR1",
        "name": "Hörgárbraut / Stórholt",
        "lat": 65.690776,
        "lon": -18.107598
    },
    "60000114": {
        "code": "HÖRGÁR3",
        "name": "Hörgárbraut / Undirhlíð",
        "lat": 65.691858,
        "lon": -18.109864
    },
    "60000113": {
        "code": "HÖRGÁR2",
        "name": "Hörgárbraut / Þverholt",
        "lat": 65.693625,
        "lon": -18.114872
    },
    "87210002": {
        "code": "LAUGARÁ",
        "name": "Laugarás",
        "lat": 64.112901,
        "lon": -20.503891
    },
    "60000112": {
        "code": "HLÍÐA18",
        "name": "Hlíðarból",
        "lat": 65.690419,
        "lon": -18.109798
    },
    "87210003": {
        "code": "LAUGAVA",
        "name": "Laugarvatn",
        "lat": 64.220175,
        "lon": -20.732191
    },
    "60000110": {
        "code": "HÖFÐAH1",
        "name": "Höfðahlíð / Áshlíð",
        "lat": 65.68837,
        "lon": -18.112498
    },
    "31770001": {
        "code": "STYKKIS",
        "name": "Stykkishólmur - höfnin",
        "lat": 65.07789,
        "lon": -22.726806
    },
    "90000190": {
        "code": "BAKKAST",
        "name": "Bakkastaðir / Barðastaðir",
        "lat": 64.158095,
        "lon": -21.751087
    },
    "90000191": {
        "code": "SÆBRAU2",
        "name": "Sund",
        "lat": 64.140213,
        "lon": -21.850696
    },
    "90000192": {
        "code": "BÆJARH6",
        "name": "Hamrahlíð",
        "lat": 64.130847,
        "lon": -21.902054
    },
    "90000193": {
        "code": "SÆBRAU3",
        "name": "Vogar",
        "lat": 64.133594,
        "lon": -21.850187
    },
    "90000198": {
        "code": "STRAUM1",
        "name": "Straumur / Birtingakvísl",
        "lat": 64.123307,
        "lon": -21.822564
    },
    "60000108": {
        "code": "GLERÁR2",
        "name": "Glerárskóli",
        "lat": 65.688096,
        "lon": -18.11662
    },
    "60000105": {
        "code": "SKARÐS4",
        "name": "Skarðshlíð / Fosshlíð",
        "lat": 65.689081,
        "lon": -18.124116
    },
    "30001807": {
        "code": "GARÐABR",
        "name": "Garðabraut",
        "lat": 64.319621,
        "lon": -22.063736
    },
    "90000160": {
        "code": "SUNDAGA",
        "name": "Sundagarðar",
        "lat": 64.150578,
        "lon": -21.871116
    },
    "90000161": {
        "code": "SOGAVEG",
        "name": "Sogavegur / Akurgerði",
        "lat": 64.128537,
        "lon": -21.874256
    },
    "90000162": {
        "code": "KLEPPSV",
        "name": "Laugarnestangi",
        "lat": 64.151443,
        "lon": -21.882252
    },
    "14001630": {
        "code": "HÁHOLT7",
        "name": "Háholt / Hörgsholt",
        "lat": 64.057631,
        "lon": -21.985165
    },
    "90000163": {
        "code": "LAUGAR4",
        "name": "Kirkjusandur",
        "lat": 64.149201,
        "lon": -21.884996
    },
    "14001631": {
        "code": "HÁHOLT6",
        "name": "Háholt / Bæjarholt",
        "lat": 64.056916,
        "lon": -21.982859
    },
    "30001808": {
        "code": "BÆJARSK",
        "name": "Bæjarskrifstofan",
        "lat": 64.320347,
        "lon": -22.069842
    },
    "65060001": {
        "code": "SKRIÐU1",
        "name": "Hjalteyri - Vegamót",
        "lat": 65.758471,
        "lon": -18.232226
    },
    "90000164": {
        "code": "LAUGAR3",
        "name": "Laugarnesvegur / Borgartún",
        "lat": 64.146968,
        "lon": -21.888726
    },
    "14001632": {
        "code": "HÁHOLT5",
        "name": "Háholt / Akurholt",
        "lat": 64.055568,
        "lon": -21.979975
    },
    "30001809": {
        "code": "KIRKJUB",
        "name": "Kirkjubraut / Stillholt",
        "lat": 64.321487,
        "lon": -22.075413
    },
    "65060002": {
        "code": "LITLI Á",
        "name": "Litli Árskógssandur - Vegamót",
        "lat": 65.928321,
        "lon": -18.364432
    },
    "90000165": {
        "code": "BORGAR3",
        "name": "Hótel Cabin",
        "lat": 64.146184,
        "lon": -21.89642
    },
    "14001634": {
        "code": "LÆKJAR4",
        "name": "Grænakinn",
        "lat": 64.066075,
        "lon": -21.944603999999998
    },
    "90000167": {
        "code": "HOFSVAL",
        "name": "Hofsvallagata / Hávallagata",
        "lat": 64.147753,
        "lon": -21.951418
    },
    "14001635": {
        "code": "HERJÓL2",
        "name": "Hrafnista",
        "lat": 64.079055,
        "lon": -21.971916
    },
    "90000168": {
        "code": "HOFSVA1",
        "name": "Hofsvallagata / Hringbraut",
        "lat": 64.146702,
        "lon": -21.954384
    },
    "14001636": {
        "code": "HERJÓL1",
        "name": "Herjólfsgata / Útsýnispallur",
        "lat": 64.075019,
        "lon": -21.973149
    },
    "90000169": {
        "code": "HOFSVA5",
        "name": "Hofsvallagata / Reynimelur",
        "lat": 64.145408,
        "lon": -21.958063
    },
    "14001637": {
        "code": "HERJÓLF",
        "name": "Herjólfsgata / Útsýnispallur",
        "lat": 64.075105,
        "lon": -21.972971
    },
    "14001638": {
        "code": "HVANNA4",
        "name": "Hnoðravellir",
        "lat": 64.043228,
        "lon": -21.96752
    },
    "87210001": {
        "code": "REYKHOL",
        "name": "Reykholt",
        "lat": 64.177459,
        "lon": -20.453062
    },
    "14001639": {
        "code": "HVANNA3",
        "name": "Glitvellir",
        "lat": 64.042419,
        "lon": -21.975853999999998
    },
    "60000178": {
        "code": "Geo-l77",
        "name": "Þingvallastræti / Dalsbraut",
        "lat": 65.6778,
        "lon": -18.1159
    },
    "60000177": {
        "code": "Geo-l75",
        "name": "Drottningarbraut",
        "lat": 65.6801,
        "lon": -18.0872
    },
    "60000176": {
        "code": "Geo-l73",
        "name": "Hafnarstræti / Aðalstræti",
        "lat": 65.67254,
        "lon": -18.0863
    },
    "60000175": {
        "code": "Geo-l71",
        "name": "Hafnarstræti / Aðalstræti",
        "lat": 65.67218,
        "lon": -18.0859
    },
    "60000174": {
        "code": "Geo-l69",
        "name": "Þingvallastræti / Mýrarvegur",
        "lat": 65.67877,
        "lon": -18.1086
    },
    "60000173": {
        "code": "Geo-l67",
        "name": "Þingvallastræti / Byggðavegur",
        "lat": 65.67931,
        "lon": -18.1016
    },
    "60000172": {
        "code": "Geo-l65",
        "name": "Þórunnarstræti / Íþróttahöll",
        "lat": 65.67835,
        "lon": -18.099
    },
    "60000170": {
        "code": "Geo-l61",
        "name": "Þórunnarstræti / Sunnutröð",
        "lat": 65.67141,
        "lon": -18.0958
    },
    "90000170": {
        "code": "HOFSVA4",
        "name": "Hagi",
        "lat": 64.143855,
        "lon": -21.962456
    },
    "90000171": {
        "code": "NESHAG1",
        "name": "Melaskóli",
        "lat": 64.142179,
        "lon": -21.958519
    },
    "90000172": {
        "code": "HJARÐA3",
        "name": "Hjarðarhagi / Vesturgarður",
        "lat": 64.141748,
        "lon": -21.961682
    },
    "90000173": {
        "code": "HJARÐA2",
        "name": "Hjarðarhagi / Dunhagi",
        "lat": 64.138791,
        "lon": -21.958537
    },
    "90000174": {
        "code": "NJARÐAR",
        "name": "Íslensk Erfðagreining",
        "lat": 64.135388,
        "lon": -21.944294
    },
    "14001620": {
        "code": "ÁSBRAU2",
        "name": "Kelduhvammur",
        "lat": 64.057287,
        "lon": -21.965357
    },
    "90000175": {
        "code": "NJARÐA1",
        "name": "Íslensk Erfðagreining",
        "lat": 64.135558,
        "lon": -21.943653
    },
    "90000176": {
        "code": "HOFSVA6",
        "name": "Hofsvallagata / Ægisíða",
        "lat": 64.14261,
        "lon": -21.965501
    },
    "90000177": {
        "code": "NJARÐA2",
        "name": "Reykjavíkurflugvöllur",
        "lat": 64.132628,
        "lon": -21.949453
    },
    "14001623": {
        "code": "FJARÐAR",
        "name": "Fjarðarkaup",
        "lat": 64.081496,
        "lon": -21.939794
    },
    "30001810": {
        "code": "UPPLÝSI",
        "name": "Akratorg",
        "lat": 64.317775,
        "lon": -22.082324
    },
    "90000178": {
        "code": "NJARÐA3",
        "name": "Reykjavíkurflugvöllur",
        "lat": 64.132695,
        "lon": -21.949187
    },
    "14001624": {
        "code": "SKÚTAH1",
        "name": "Skútahraun / Slökkvistöð",
        "lat": 64.081646,
        "lon": -21.936967
    },
    "90000179": {
        "code": "HOFSVA3",
        "name": "Hofsvallagata / Hringbraut",
        "lat": 64.146712,
        "lon": -21.95403
    },
    "14001626": {
        "code": "LÆKJAR3",
        "name": "Grænakinn",
        "lat": 64.066051,
        "lon": -21.944889
    },
    "30001813": {
        "code": "GARÐAB6",
        "name": "Garðabraut",
        "lat": 64.319543,
        "lon": -22.063943
    },
    "14001627": {
        "code": "ÁLFASK3",
        "name": "Álfaskeið",
        "lat": 64.071382,
        "lon": -21.941172
    },
    "30001811": {
        "code": "KIRKJU2",
        "name": "Kirkjubraut / Stillholt",
        "lat": 64.321424,
        "lon": -22.074951
    },
    "14001629": {
        "code": "MIKLAH1",
        "name": "Miklaholt",
        "lat": 64.0596,
        "lon": -21.986931
    },
    "30001812": {
        "code": "BÆJARS1",
        "name": "Bæjarskrifstofan",
        "lat": 64.320495,
        "lon": -22.070502
    },
    "60000169": {
        "code": "Geo-l59",
        "name": "Þórunnarstræti / Lækjargata",
        "lat": 65.66857,
        "lon": -18.0957
    },
    "60000168": {
        "code": "Geo-l57",
        "name": "Naustabraut / Krókeyrarnöf",
        "lat": 65.66406,
        "lon": -18.0899
    },
    "60000167": {
        "code": "Geo-l55",
        "name": "Skógarlundur / Birkilundur",
        "lat": 65.67435,
        "lon": -18.1073
    },
    "60000166": {
        "code": "Geo-l53",
        "name": "Þórunnarstræti / Íþróttahöll",
        "lat": 65.67809,
        "lon": -18.0992
    },
    "60000165": {
        "code": "Geo-l51",
        "name": "Þingvallastræti / Mýrarvegur",
        "lat": 65.67866,
        "lon": -18.1086
    },
    "60000164": {
        "code": "Geo-l49",
        "name": "Dalsbraut / Stóragerði",
        "lat": 65.67955,
        "lon": -18.1159
    },
    "60000163": {
        "code": "Geo-l47",
        "name": "Dalsbraut / Norðurslóð",
        "lat": 65.68426,
        "lon": -18.1158
    },
    "60000162": {
        "code": "Geo-l45",
        "name": "Dalsbraut / Klettaborg",
        "lat": 65.68494,
        "lon": -18.1152
    },
    "60000161": {
        "code": "Geo-l43",
        "name": "Dalsbraut / Stóragerði",
        "lat": 65.6804,
        "lon": -18.1159
    },
    "60000160": {
        "code": "Geo-l41",
        "name": "Merkigil / Skuggagil",
        "lat": 65.68516,
        "lon": -18.14
    },
    "30001828": {
        "code": "INNNES2",
        "name": "Bresaflöt",
        "lat": 64.322708,
        "lon": -22.05672
    },
    "66120004": {
        "code": "LAUGAR",
        "name": "Laugar",
        "lat": 65.720245,
        "lon": -17.376771
    },
    "45020004": {
        "code": "KRÓKSF1",
        "name": "Króksfjarðarnes",
        "lat": 65.4546979433328,
        "lon": -21.9240412068599
    },
    "66120003": {
        "code": "FOSSHÓL",
        "name": "Fosshóll - Goðafoss",
        "lat": 65.686,
        "lon": -17.539
    },
    "45020001": {
        "code": "KRÓKSFJ",
        "name": "Króksfjarðarnes",
        "lat": 65.45467,
        "lon": -21.923182
    },
    "90000380": {
        "code": "NORÐUR8",
        "name": "Vesturberg / Suðurhólar",
        "lat": 64.108298,
        "lon": -21.82107
    },
    "14001650": {
        "code": "HVALEY2",
        "name": "Hvaleyrarbraut / Brekkutröð",
        "lat": 64.060387,
        "lon": -21.978211
    },
    "30001827": {
        "code": "INNNES1",
        "name": "Bresaflöt",
        "lat": 64.322727,
        "lon": -22.057072
    },
    "66120005": {
        "code": "LAUGAR",
        "name": "Laugar - Einarsstaðir",
        "lat": 65.74058,
        "lon": -17.410538
    },
    "90000381": {
        "code": "NORÐUR7",
        "name": "Vesturberg",
        "lat": 64.105379,
        "lon": -21.823632
    },
    "14001651": {
        "code": "HVALEY3",
        "name": "Hvaleyrarbraut / Stapagata",
        "lat": 64.062421,
        "lon": -21.968676
    },
    "90000140": {
        "code": "ARNARB3",
        "name": "Eyjabakki",
        "lat": 64.110164,
        "lon": -21.82805
    },
    "90000382": {
        "code": "SUÐURH5",
        "name": "Vesturberg / Norðurfell",
        "lat": 64.103132,
        "lon": -21.825614
    },
    "14001652": {
        "code": "HVALEY4",
        "name": "Hvaleyrarbraut / Stapagata",
        "lat": 64.062475,
        "lon": -21.968682
    },
    "90000141": {
        "code": "SUÐURH1",
        "name": "Hólabrekkuskóli",
        "lat": 64.108002,
        "lon": -21.817555
    },
    "90000383": {
        "code": "NORÐUR6",
        "name": "Norðurfell / Æsufell",
        "lat": 64.101747,
        "lon": -21.830307
    },
    "14001653": {
        "code": "HVALEY5",
        "name": "Hvaleyrarbraut / Brekkutröð",
        "lat": 64.060473,
        "lon": -21.978384
    },
    "66120002": {
        "code": "NORÐAUS",
        "name": "Norðausturvegur",
        "lat": 65.705251,
        "lon": -17.622566
    },
    "90000142": {
        "code": "SOGAVE6",
        "name": "Sogavegur / Bústaðavegur",
        "lat": 64.120923,
        "lon": -21.853696
    },
    "90000384": {
        "code": "SUÐURF1",
        "name": "Suðurfell",
        "lat": 64.099575,
        "lon": -21.828262
    },
    "66120001": {
        "code": "FNJÓSKÁ",
        "name": "Fnjóskárbrú",
        "lat": 65.7467,
        "lon": -17.912
    },
    "90000143": {
        "code": "SOGAVE5",
        "name": "Sogavegur / Bústaðavegur",
        "lat": 64.120938,
        "lon": -21.853898
    },
    "90000385": {
        "code": "SELJAB4",
        "name": "Seljabraut / Flúðasel",
        "lat": 64.098345,
        "lon": -21.828419
    },
    "14001655": {
        "code": "HVANNA2",
        "name": "Klukkuvellir",
        "lat": 64.043669,
        "lon": -21.96265
    },
    "90000144": {
        "code": "ARNARB1",
        "name": "Arnarbakki / Leirubakki",
        "lat": 64.104907,
        "lon": -21.835333
    },
    "90000386": {
        "code": "SELJAB5",
        "name": "Seljabraut",
        "lat": 64.099944,
        "lon": -21.830724
    },
    "90000145": {
        "code": "STEKKJ1",
        "name": "Stekkjarbakki",
        "lat": 64.108241,
        "lon": -21.840572
    },
    "90000387": {
        "code": "SELJAB6",
        "name": "Seljabraut / Engjasel",
        "lat": 64.102093,
        "lon": -21.833703
    },
    "90000146": {
        "code": "HÁALEIT",
        "name": "Borgarspítali",
        "lat": 64.123007,
        "lon": -21.8916
    },
    "90000388": {
        "code": "LOKINH8",
        "name": "Lokinhamrar / Gerðhamrar",
        "lat": 64.138277,
        "lon": -21.816292
    },
    "90000389": {
        "code": "SELJAB7",
        "name": "Seljabraut / Seljaskógar",
        "lat": 64.103371,
        "lon": -21.835476
    },
    "30001824": {
        "code": "JAÐAR12",
        "name": "Innnesvegur",
        "lat": 64.320122,
        "lon": -22.059034
    },
    "90000148": {
        "code": "HÁDEGIS",
        "name": "Hádegismóar",
        "lat": 64.113864,
        "lon": -21.776368
    },
    "30001825": {
        "code": "ÞJÓÐBR1",
        "name": "Þjóðbraut",
        "lat": 64.326173,
        "lon": -22.055417
    },
    "30001822": {
        "code": "ÞJÓÐBRA",
        "name": "Þjóðbraut",
        "lat": 64.326208,
        "lon": -22.055538
    },
    "30001823": {
        "code": "JAÐARSB",
        "name": "Innnesvegur",
        "lat": 64.319885,
        "lon": -22.059071
    },
    "60000159": {
        "code": "Geo-l39",
        "name": "Skarðshlíð / Undirhlíð",
        "lat": 65.69095,
        "lon": -18.1115
    },
    "60000158": {
        "code": "Geo-l37",
        "name": "Skarðshlíð / Boginn",
        "lat": 65.69296,
        "lon": -18.1185
    },
    "60000157": {
        "code": "Geo-l35",
        "name": "Smárahlíð",
        "lat": 65.69275,
        "lon": -18.1255
    },
    "60000156": {
        "code": "Geo-l33",
        "name": "Hlíðarbraut / Austursíða",
        "lat": 65.6948,
        "lon": -18.1255
    },
    "60000155": {
        "code": "Geo-l31",
        "name": "Smárahlíð",
        "lat": 65.69277,
        "lon": -18.1254
    },
    "60000154": {
        "code": "Geo-l29",
        "name": "Skarðshlíð / Boginn",
        "lat": 65.693,
        "lon": -18.1184
    },
    "60000153": {
        "code": "Geo-l27",
        "name": "Skarðshlíð / Undirhlíð",
        "lat": 65.69111,
        "lon": -18.1118
    },
    "60000152": {
        "code": "Hjalt/G",
        "name": "Hjalteyrargata / Grenivellir",
        "lat": 65.68965,
        "lon": -18.0865
    },
    "60000151": {
        "code": "Hjalt",
        "name": "Hjalteyrargata / Gránufélagsgata",
        "lat": 65.68643,
        "lon": -18.0832
    },
    "60000150": {
        "code": "AKUREY2",
        "name": "Akureyri - Hof",
        "lat": 65.6831850920279,
        "lon": -18.0885792179734
    },
    "90000390": {
        "code": "LOKINH7",
        "name": "Lokinhamrar / Dverghamrar",
        "lat": 64.136858,
        "lon": -21.812682
    },
    "90000391": {
        "code": "NORÐLI2",
        "name": "Norðlingabraut / Ferjuvað",
        "lat": 64.103829,
        "lon": -21.771664
    },
    "90000150": {
        "code": "SOGAVE1",
        "name": "Sogavegur / Grundargerði",
        "lat": 64.127956,
        "lon": -21.870843
    },
    "14001640": {
        "code": "DREKAV5",
        "name": "Hvannavellir",
        "lat": 64.043017,
        "lon": -21.97781
    },
    "90000151": {
        "code": "REYKJA8",
        "name": "Elliðaárdalur",
        "lat": 64.118984,
        "lon": -21.845509
    },
    "14001641": {
        "code": "FLATAH5",
        "name": "Flatahraun / Álfaskeið",
        "lat": 64.075742,
        "lon": -21.941716
    },
    "90000394": {
        "code": "KLETTA3",
        "name": "Klettagarðar / Kænugarðar",
        "lat": 64.151935,
        "lon": -21.864747
    },
    "14001642": {
        "code": "BÆJAR10",
        "name": "Bæjarhraun / Flatahraun",
        "lat": 64.07722,
        "lon": -21.939841
    },
    "90000395": {
        "code": "MIKLAB9",
        "name": "Skeifan",
        "lat": 64.128503,
        "lon": -21.870422
    },
    "14001643": {
        "code": "BÆJARH9",
        "name": "Bæjarhraun",
        "lat": 64.079598,
        "lon": -21.94057
    },
    "85090002": {
        "code": "KIRKJU6",
        "name": "Kirkjubæjarklaustur",
        "lat": 63.793694,
        "lon": -18.03875
    },
    "90000154": {
        "code": "BÆJARH5",
        "name": "Bæjarháls",
        "lat": 64.120681,
        "lon": -21.808814
    },
    "90000396": {
        "code": "MIKLA10",
        "name": "Gerði",
        "lat": 64.126326,
        "lon": -21.85755
    },
    "14001644": {
        "code": "BÆJARHR",
        "name": "Bæjarhraun",
        "lat": 64.079588,
        "lon": -21.940795
    },
    "90000155": {
        "code": "SÆBRAU6",
        "name": "Vogar",
        "lat": 64.134956,
        "lon": -21.849685
    },
    "90000397": {
        "code": "NORÐLIN",
        "name": "Norðlingabraut / Árvað",
        "lat": 64.101416,
        "lon": -21.778054
    },
    "14001645": {
        "code": "BÆJARH8",
        "name": "Bæjarhraun / Flatahraun",
        "lat": 64.077163,
        "lon": -21.940054
    },
    "90000156": {
        "code": "SÆBRAU5",
        "name": "Holtagarðar",
        "lat": 64.141338,
        "lon": -21.850282
    },
    "90000398": {
        "code": "HRAUNBÆ",
        "name": "Hraunbær",
        "lat": 64.119799,
        "lon": -21.808087
    },
    "14001646": {
        "code": "FLATAH4",
        "name": "Flatahraun / Álfaskeið",
        "lat": 64.075714,
        "lon": -21.943929
    },
    "90000157": {
        "code": "SÆBRAU4",
        "name": "Sæbraut / Sægarðar",
        "lat": 64.143242,
        "lon": -21.852083
    },
    "90000399": {
        "code": "ROFABÆR",
        "name": "Rofabær / Hraunbær",
        "lat": 64.117812,
        "lon": -21.808415
    },
    "14001647": {
        "code": "DREKAV4",
        "name": "Hvannavellir",
        "lat": 64.043003,
        "lon": -21.977966
    },
    "90000158": {
        "code": "BARÐAST",
        "name": "Barðastaðir",
        "lat": 64.156867,
        "lon": -21.750617
    },
    "14001648": {
        "code": "HVANNAV",
        "name": "Glitvellir",
        "lat": 64.04234,
        "lon": -21.97579
    },
    "90000159": {
        "code": "KLEPPUR",
        "name": "Sæbraut / Sægarðar",
        "lat": 64.142991,
        "lon": -21.852385
    },
    "14001649": {
        "code": "HVANNA1",
        "name": "Hnoðravellir",
        "lat": 64.043163,
        "lon": -21.967206
    },
    "14001619": {
        "code": "ÁSVALLA",
        "name": "Ásvallalaug",
        "lat": 64.05275,
        "lon": -21.974952
    },
    "14001610": {
        "code": "ÁSBRAU3",
        "name": "Ástjörn",
        "lat": 64.054939,
        "lon": -21.965701
    },
    "14001611": {
        "code": "ÁSBRAU4",
        "name": "Suðurhvammur",
        "lat": 64.057241,
        "lon": -21.965128
    },
    "14001612": {
        "code": "HAUKAHÚ",
        "name": "Haukahús",
        "lat": 64.053334,
        "lon": -21.971691
    },
    "14001613": {
        "code": "DREKAV1",
        "name": "Hraunvallaskóli",
        "lat": 64.045546,
        "lon": -21.979055
    },
    "14001614": {
        "code": "DREKAV3",
        "name": "Daggarvellir",
        "lat": 64.048361,
        "lon": -21.980808
    },
    "14001615": {
        "code": "KIRKJU1",
        "name": "Kirkjuvellir",
        "lat": 64.050623,
        "lon": -21.981941
    },
    "14001616": {
        "code": "ÁSVALL1",
        "name": "Ásvallalaug",
        "lat": 64.052789,
        "lon": -21.975244
    },
    "14001617": {
        "code": "KIRKJUT",
        "name": "Kirkjutorg",
        "lat": 64.051702,
        "lon": -21.980002
    },
    "14001618": {
        "code": "KIRKJU7",
        "name": "Kirkjutorg",
        "lat": 64.051711,
        "lon": -21.979893
    },
    "14001608": {
        "code": "VÖRÐUTO",
        "name": "Vörðutorg",
        "lat": 64.055725,
        "lon": -21.945865
    },
    "14001609": {
        "code": "ÁSBRAU5",
        "name": "Ásbraut / Álftaás",
        "lat": 64.056765,
        "lon": -21.956984
    },
    "37130001": {
        "code": "VEGAMÓ1",
        "name": "Vegamót",
        "lat": 64.849237,
        "lon": -22.733502
    },
    "86140001": {
        "code": "HELLA2",
        "name": "Hella",
        "lat": 63.834862,
        "lon": -20.401652
    },
    "86140002": {
        "code": "HELLA1",
        "name": "Hella",
        "lat": 63.834994,
        "lon": -20.401563
    },
    "85080002": {
        "code": "VÍK Í 1",
        "name": "Vík í Mýrdal",
        "lat": 63.418279,
        "lon": -19.003218
    },
    "85080001": {
        "code": "VÍK Í M",
        "name": "Vík í Mýrdal",
        "lat": 63.418369,
        "lon": -19.003165
    },
    "14001600": {
        "code": "STRANDG",
        "name": "Strandgata / Fjörukráin",
        "lat": 64.065194,
        "lon": -21.956773
    },
    "14001601": {
        "code": "STRAND1",
        "name": "Strandgata / Flensborgartorg",
        "lat": 64.062178,
        "lon": -21.96172
    },
    "14001602": {
        "code": "KIRKJUV",
        "name": "Kirkjuvellir",
        "lat": 64.050653,
        "lon": -21.982217
    },
    "14001603": {
        "code": "DREKAV2",
        "name": "Daggarvellir",
        "lat": 64.048205,
        "lon": -21.980835
    },
    "14001604": {
        "code": "DREKAVE",
        "name": "Hraunvallaskóli",
        "lat": 64.0456,
        "lon": -21.979188
    },
    "14001605": {
        "code": "HAUKAH1",
        "name": "Haukahús",
        "lat": 64.053245,
        "lon": -21.971125
    },
    "14001606": {
        "code": "ÁSBRAUT",
        "name": "Ástjörn",
        "lat": 64.054096,
        "lon": -21.965867
    },
    "14001607": {
        "code": "ÁSBRAU1",
        "name": "Ásbraut / Álftaás",
        "lat": 64.056631,
        "lon": -21.957028
    },
    "16031321": {
        "code": "BESSAST",
        "name": "Álftanesvegur / Bessastaðir",
        "lat": 64.102592,
        "lon": -22.009632
    },
    "73007351": {
        "code": "REYÐAR2",
        "name": "Reyðarfjörður / Fjarðarbyggðarhöllin",
        "lat": 65.0339,
        "lon": -14.2121
    },
    "16031320": {
        "code": "BREIÐAM",
        "name": "Breiðamýri",
        "lat": 64.102341,
        "lon": -22.017874
    },
    "60000103": {
        "code": "SKARÐS3",
        "name": "Skarðshlíð / Sunnuhlíð",
        "lat": 65.691181,
        "lon": -18.126235
    },
    "73007352": {
        "code": "AUSTURV",
        "name": "Austurvegur / Barkur",
        "lat": 65.0313,
        "lon": -14.2068
    },
    "16031323": {
        "code": "SUÐURN9",
        "name": "Suðurnesvegur / Klukkuholt",
        "lat": 64.102224,
        "lon": -22.02678
    },
    "73007353": {
        "code": "REYÐAR1",
        "name": "Reyðarfjörður / Molinn",
        "lat": 65.0323,
        "lon": -14.2186
    },
    "16031322": {
        "code": "BESSAS1",
        "name": "Norðurnesvegur / Bessastaðir",
        "lat": 64.102255,
        "lon": -22.009887
    },
    "73007354": {
        "code": "REYÐARF",
        "name": "Reyðarfjörður / Orkuskálinn",
        "lat": 65.0344,
        "lon": -14.2278
    },
    "16031325": {
        "code": "SUÐURN7",
        "name": "Suðurnesvegur / Vesturtún",
        "lat": 64.108264,
        "lon": -22.021144
    },
    "16031324": {
        "code": "SUÐURN8",
        "name": "Suðurnesvegur / Mýrarkot",
        "lat": 64.104473,
        "lon": -22.027019
    },
    "16031327": {
        "code": "NORÐU13",
        "name": "Eyvindarstaðavegur",
        "lat": 64.106082,
        "lon": -22.009842
    },
    "16031326": {
        "code": "SUÐURN6",
        "name": "Suðurnesvegur / Sjávargata",
        "lat": 64.109501,
        "lon": -22.017855
    },
    "73007359": {
        "code": "ESKIFJ1",
        "name": "Eskifjörður / Valhöll",
        "lat": 65.0708,
        "lon": -14.0131
    },
    "73007355": {
        "code": "ALCOA F",
        "name": "Alcoa Fjarðaál",
        "lat": 65.0327,
        "lon": -14.0969
    },
    "73007356": {
        "code": "ESKIFJÖ",
        "name": "Eskifjörður / Sundlaug",
        "lat": 65.0773,
        "lon": -14.035
    },
    "73007357": {
        "code": "ÞJÓNUST",
        "name": "Þjónustumiðstöð / Shell",
        "lat": 65.0758,
        "lon": -14.0221
    },
    "73007358": {
        "code": "STRAN10",
        "name": "Strandgata / Steinholt",
        "lat": 65.0666,
        "lon": -14.0038
    },
    "76137601": {
        "code": "BREIÐDA",
        "name": "Breiðdalsvík / Kaupfjelagið",
        "lat": 64.7921,
        "lon": -14.0094
    },
    "20000605": {
        "code": "IÐAVELL",
        "name": "Iðavellir",
        "lat": 63.9958712369773,
        "lon": -22.5753401044283
    },
    "86130001": {
        "code": "HVOLSVÖ",
        "name": "Hvolsvöllur",
        "lat": 63.749494,
        "lon": -20.23306
    },
    "86130002": {
        "code": "HVOLSV1",
        "name": "Hvolsvöllur",
        "lat": 63.749747,
        "lon": -20.232882
    },
    "86130003": {
        "code": "SKÓGAR",
        "name": "Skógar",
        "lat": 63.524103,
        "lon": -19.504503
    },
    "16031307": {
        "code": "NORÐURN",
        "name": "Eyvindarstaðavegur",
        "lat": 64.106446,
        "lon": -22.009607
    },
    "37140003": {
        "code": "HELLISS",
        "name": "Hellissandur",
        "lat": 64.917249,
        "lon": -23.883747
    },
    "37140004": {
        "code": "ARNARST",
        "name": "Arnarstapi",
        "lat": 64.766151,
        "lon": -23.633555
    },
    "16031309": {
        "code": "JÖRFAVE",
        "name": "Jörfavegur",
        "lat": 64.114948,
        "lon": -22.005857
    },
    "37140001": {
        "code": "ÓLAFSVÍ",
        "name": "Ólafsvík",
        "lat": 64.893979,
        "lon": -23.704382
    },
    "16031308": {
        "code": "NORÐU12",
        "name": "Túngata",
        "lat": 64.109385,
        "lon": -22.012975
    },
    "37140002": {
        "code": "RIF",
        "name": "Rif",
        "lat": 64.92055,
        "lon": -23.83285
    },
    "37140007": {
        "code": "HELLNAR",
        "name": "Hellnar",
        "lat": 64.750781,
        "lon": -23.646192
    },
    "16031310": {
        "code": "NORÐU14",
        "name": "Túngata",
        "lat": 64.109253,
        "lon": -22.012978
    },
    "16031312": {
        "code": "SUÐURN1",
        "name": "Hólmatún",
        "lat": 64.108251,
        "lon": -22.021435
    },
    "16031311": {
        "code": "SUÐURNE",
        "name": "Sjávargata",
        "lat": 64.109517,
        "lon": -22.018227
    },
    "16031314": {
        "code": "SUÐURN3",
        "name": "Bakkavegur",
        "lat": 64.10216,
        "lon": -22.026917
    },
    "16031313": {
        "code": "SUÐURN2",
        "name": "Mýrarkot",
        "lat": 64.104417,
        "lon": -22.027198
    },
    "16031315": {
        "code": "SUÐURN4",
        "name": "Höfðabraut",
        "lat": 64.100105,
        "lon": -22.025576
    },
    "16031318": {
        "code": "SUÐUR10",
        "name": "Höfðabraut",
        "lat": 64.100226,
        "lon": -22.025543
    },
    "16031317": {
        "code": "SUÐUR11",
        "name": "Brekkuland",
        "lat": 64.100621,
        "lon": -22.019045
    },
    "16031319": {
        "code": "SUÐURN5",
        "name": "Brekkuland",
        "lat": 64.100562,
        "lon": -22.018891
    },
    "13001218": {
        "code": "VÍFILSS",
        "name": "Vídalínskirkja",
        "lat": 64.086775,
        "lon": -21.916422
    },
    "90000636": {
        "code": "MELAVE8",
        "name": "Melavegur / Dvergaborgir",
        "lat": 64.152008,
        "lon": -21.79878
    },
    "13001219": {
        "code": "VÍFILS4",
        "name": "Garðatorg",
        "lat": 64.088501,
        "lon": -21.922039
    },
    "13001216": {
        "code": "HOFSTAÐ",
        "name": "Vídalínskirkja",
        "lat": 64.088003,
        "lon": -21.913181
    },
    "73007551": {
        "code": "FÁSKRÚÐ",
        "name": "Fáskrúðsfjörður / Við kirkjugarð",
        "lat": 64.9342,
        "lon": -14.0281
    },
    "73007552": {
        "code": "FÁSKRÚ1",
        "name": "Fáskrúðsfjörður / Skólavegur",
        "lat": 64.9321,
        "lon": -14.0193
    },
    "10000880": {
        "code": "ARNARN2",
        "name": "Arnarnesvegur / Salavegur",
        "lat": 64.089366,
        "lon": -21.845248
    },
    "13001210": {
        "code": "KARLAB5",
        "name": "Karlabraut / Furulundur",
        "lat": 64.088235,
        "lon": -21.907285
    },
    "73007557": {
        "code": "STÖÐVAR",
        "name": "Stöðvarfjörður / Brekkan - uppl. miðstöð",
        "lat": 64.833,
        "lon": -13.8738
    },
    "13001211": {
        "code": "KARLAB2",
        "name": "Karlabraut / Búðir",
        "lat": 64.089627,
        "lon": -21.904301
    },
    "73007553": {
        "code": "FÁSKRÚ2",
        "name": "Fáskrúðsfjörður / Skrúður",
        "lat": 64.9292,
        "lon": -14.0076
    },
    "13001215": {
        "code": "HOFSTA2",
        "name": "Vídalínskirkja",
        "lat": 64.088156,
        "lon": -21.913116
    },
    "73007554": {
        "code": "SKÓLAV2",
        "name": "Skólavegur / Hólsstígur",
        "lat": 64.9277,
        "lon": -14.0015
    },
    "13001212": {
        "code": "KARLAB4",
        "name": "Karlabraut / Heiðarlundur",
        "lat": 64.088219,
        "lon": -21.907533
    },
    "73007555": {
        "code": "FÁSKRÚ3",
        "name": "Fáskrúðsfjörður / Hafnargata v. Franska sp.",
        "lat": 64.9264,
        "lon": -14.0008
    },
    "73007556": {
        "code": "FÁSKRÚ4",
        "name": "Fáskrúðsfjörður / Búðavegur",
        "lat": 64.9306,
        "lon": -14.0155
    },
    "10000871": {
        "code": "DALSMÁR",
        "name": "Smáraskóli",
        "lat": 64.102915,
        "lon": -21.893707
    },
    "10000870": {
        "code": "DALSMÁ3",
        "name": "Smáraskóli",
        "lat": 64.102855,
        "lon": -21.894009
    },
    "10000873": {
        "code": "FÍFUHVA",
        "name": "Smárar",
        "lat": 64.10207,
        "lon": -21.892387
    },
    "10000872": {
        "code": "FÍFUHV5",
        "name": "Smárar",
        "lat": 64.102285,
        "lon": -21.892145
    },
    "90000400": {
        "code": "ROFABÆ1",
        "name": "Rofabær / Hábær",
        "lat": 64.11686,
        "lon": -21.801618
    },
    "10000875": {
        "code": "FÍFUHV1",
        "name": "Smáralind",
        "lat": 64.102525,
        "lon": -21.885823
    },
    "16040662": {
        "code": "TJALDA1",
        "name": "Tjaldanes",
        "lat": 64.18039,
        "lon": -21.635743
    },
    "90000401": {
        "code": "ROFABÆ2",
        "name": "Árbæjarskóli",
        "lat": 64.116064,
        "lon": -21.796228
    },
    "10000874": {
        "code": "FÍFUHV4",
        "name": "Smáralind",
        "lat": 64.102703,
        "lon": -21.886314
    },
    "16040661": {
        "code": "MOSFEL3",
        "name": "Mosfell",
        "lat": 64.180615,
        "lon": -21.619987
    },
    "90000402": {
        "code": "ROFABÆ3",
        "name": "Rofabær / Brekkubær",
        "lat": 64.115335,
        "lon": -21.791334
    },
    "10000877": {
        "code": "SALAVEG",
        "name": "Salavegur / Ársalir",
        "lat": 64.094351,
        "lon": -21.857936
    },
    "16040660": {
        "code": "LUNDUR1",
        "name": "Lundur",
        "lat": 64.18083,
        "lon": -21.606564
    },
    "90000403": {
        "code": "HRAUNÁS",
        "name": "Hraunsás",
        "lat": 64.113026,
        "lon": -21.787925
    },
    "90000645": {
        "code": "VESTU24",
        "name": "Vesturlandsvegur / Viðarhöfði",
        "lat": 64.124467,
        "lon": -21.798732
    },
    "10000876": {
        "code": "FÍFUHV2",
        "name": "Lindir",
        "lat": 64.098921,
        "lon": -21.871548
    },
    "90000404": {
        "code": "SELÁSBR",
        "name": "Selásbraut / Næfurás",
        "lat": 64.111407,
        "lon": -21.785881
    },
    "13001207": {
        "code": "ARNARN1",
        "name": "Arnarnesvegur / Bæjarbraut",
        "lat": 64.098383,
        "lon": -21.903811
    },
    "90000405": {
        "code": "SELÁSB1",
        "name": "Selásbraut / Reykás",
        "lat": 64.109463,
        "lon": -21.787354
    },
    "13001208": {
        "code": "KARLAB1",
        "name": "Karlabraut / Reynilundur",
        "lat": 64.085651,
        "lon": -21.909578
    },
    "90000406": {
        "code": "SELÁSB2",
        "name": "Selásbraut / Sauðás",
        "lat": 64.108063,
        "lon": -21.788401
    },
    "90000407": {
        "code": "SELÁSB3",
        "name": "Selásbraut / Vallarás",
        "lat": 64.10549,
        "lon": -21.786624
    },
    "13001206": {
        "code": "VÍFILS9",
        "name": "Vífilsstaðavegur / Sjávargrund",
        "lat": 64.091965,
        "lon": -21.929768
    },
    "90000408": {
        "code": "SELÁSB6",
        "name": "Selásskóli",
        "lat": 64.105014,
        "lon": -21.783432
    },
    "16040659": {
        "code": "LAXNES",
        "name": "Laxnes",
        "lat": 64.180337,
        "lon": -21.590415
    },
    "90000409": {
        "code": "SELÁSB7",
        "name": "Selásbraut / Vallarás",
        "lat": 64.105809,
        "lon": -21.786807
    },
    "16040658": {
        "code": "LUNDUR",
        "name": "Lundur",
        "lat": 64.180738,
        "lon": -21.606306
    },
    "10000891": {
        "code": "SALAVE7",
        "name": "Salavegur / Ársalir",
        "lat": 64.09449,
        "lon": -21.857976
    },
    "13001209": {
        "code": "KARLAB3",
        "name": "Karlabraut / Espilundur",
        "lat": 64.0858,
        "lon": -21.909279
    },
    "16040657": {
        "code": "MOSFEL2",
        "name": "Mosfell",
        "lat": 64.180536,
        "lon": -21.619704
    },
    "16040656": {
        "code": "TJALDAN",
        "name": "Tjaldanes",
        "lat": 64.180301,
        "lon": -21.635617
    },
    "13001204": {
        "code": "ARNARN4",
        "name": "Arnarneshæð",
        "lat": 64.099529,
        "lon": -21.912902
    },
    "13001201": {
        "code": "HAFNAR2",
        "name": "Arnarneshæð",
        "lat": 64.099867,
        "lon": -21.916849
    },
    "13001202": {
        "code": "ARNARNE",
        "name": "Arnarneshæð",
        "lat": 64.099335,
        "lon": -21.913226
    },
    "10000889": {
        "code": "SALAVE2",
        "name": "Salavegur / Kórsalir",
        "lat": 64.09212,
        "lon": -21.846356
    },
    "10000882": {
        "code": "LINDAR2",
        "name": "Lindarvegur",
        "lat": 64.100825,
        "lon": -21.871459
    },
    "16040655": {
        "code": "REYKJAL",
        "name": "Reykjalundur",
        "lat": 64.162784,
        "lon": -21.66382
    },
    "90000650": {
        "code": "FELLSVE",
        "name": "Fellsvegur",
        "lat": 64.12986,
        "lon": -21.727788
    },
    "90000651": {
        "code": "ÚLFARSB",
        "name": "Úlfarsbraut",
        "lat": 64.13279,
        "lon": -21.736783
    },
    "10000884": {
        "code": "HLÍÐAR1",
        "name": "Hlíðardalsvegur / Iðalind",
        "lat": 64.099474,
        "lon": -21.862353
    },
    "16040653": {
        "code": "LEIRVOG",
        "name": "Leirvogstunga",
        "lat": 64.183772,
        "lon": -21.682118
    },
    "90000410": {
        "code": "SELÁSB8",
        "name": "Selásbraut / Skógarás",
        "lat": 64.108103,
        "lon": -21.788205
    },
    "90000652": {
        "code": "LAMBHA1",
        "name": "Lambhagavegur / Reynisvatnsvegur",
        "lat": 64.13123,
        "lon": -21.751643
    },
    "10000883": {
        "code": "HLÍÐAR2",
        "name": "Hlíðardalsvegur / Kópalind",
        "lat": 64.102109,
        "lon": -21.864024
    },
    "16040652": {
        "code": "VESTU33",
        "name": "Vesturlandsvegur / Ásland",
        "lat": 64.170692,
        "lon": -21.679204
    },
    "90000411": {
        "code": "SELÁSB9",
        "name": "Selásbraut / Reykás",
        "lat": 64.109719,
        "lon": -21.786949
    },
    "90000653": {
        "code": "SKYGGN1",
        "name": "Skyggnisbraut",
        "lat": 64.13606,
        "lon": -21.735226
    },
    "10000886": {
        "code": "SALAVE6",
        "name": "Versalir",
        "lat": 64.091554,
        "lon": -21.858181
    },
    "16040651": {
        "code": "REYKJ11",
        "name": "Reykjavegur / Völuteigur",
        "lat": 64.161111,
        "lon": -21.681836
    },
    "90000412": {
        "code": "SELÁS10",
        "name": "Selásbraut / Næfurás",
        "lat": 64.111586,
        "lon": -21.785536
    },
    "90000654": {
        "code": "MÍMISB1",
        "name": "Mímisbrunnur / Skyggnistorg",
        "lat": 64.13642,
        "lon": -21.740884
    },
    "10000885": {
        "code": "HLÍÐARD",
        "name": "Hvammsvegur",
        "lat": 64.096328,
        "lon": -21.858788
    },
    "16040650": {
        "code": "REYKJ15",
        "name": "Reykjavegur / Völuteigur",
        "lat": 64.160714,
        "lon": -21.68113
    },
    "90000413": {
        "code": "BREIÐH1",
        "name": "Breiðhöfði / Ártún",
        "lat": 64.123605,
        "lon": -21.823946
    },
    "90000655": {
        "code": "LAMBHA2",
        "name": "Lambhagavegur / Reynisvatnsvegur",
        "lat": 64.13119,
        "lon": -21.751475
    },
    "90000414": {
        "code": "MIKLA11",
        "name": "Gerði",
        "lat": 64.126724,
        "lon": -21.857774
    },
    "90000656": {
        "code": "ÚLFARS1",
        "name": "Úlfarsbraut",
        "lat": 64.13277,
        "lon": -21.736831
    },
    "10000887": {
        "code": "SALAVE1",
        "name": "Salavegur / Fensalir",
        "lat": 64.093776,
        "lon": -21.853171
    },
    "90000415": {
        "code": "MIKLAB6",
        "name": "Skeifan",
        "lat": 64.128968,
        "lon": -21.871115
    },
    "90000657": {
        "code": "FELLSV1",
        "name": "Fellsvegur",
        "lat": 64.12942,
        "lon": -21.728207
    },
    "13001232": {
        "code": "IKEA",
        "name": "IKEA",
        "lat": 64.075575,
        "lon": -21.913278
    },
    "13001233": {
        "code": "FLATAH2",
        "name": "Flatahraun / Álftanesvegur",
        "lat": 64.077515,
        "lon": -21.929596
    },
    "35111819": {
        "code": "MELAHV1",
        "name": "Melahverfi",
        "lat": 64.38244,
        "lon": -21.849571
    },
    "13001234": {
        "code": "BÆJAR14",
        "name": "Bæjarbraut / Línakur",
        "lat": 64.0979809046859,
        "lon": -21.9071613098249
    },
    "10000857": {
        "code": "DIGRAN3",
        "name": "Digranesvegur / Brattabrekka",
        "lat": 64.11,
        "lon": -21.888501
    },
    "10000856": {
        "code": "HAFNAR6",
        "name": "Hlíðarhvammur",
        "lat": 64.106197,
        "lon": -21.903764
    },
    "10000859": {
        "code": "DIGRAN5",
        "name": "Kópavogsskóli",
        "lat": 64.110292,
        "lon": -21.899697
    },
    "10000858": {
        "code": "DIGRANE",
        "name": "Digranesvegur / Brattabrekka",
        "lat": 64.110158,
        "lon": -21.888489
    },
    "77087802": {
        "code": "Höfn -",
        "name": "Höfn - Tjaldsvæði",
        "lat": 64.25819,
        "lon": -15.20395
    },
    "77087801": {
        "code": "HÖFN /",
        "name": "Höfn / Flugvöllur",
        "lat": 64.3022,
        "lon": -15.2262
    },
    "10000851": {
        "code": "NÝBÝLA7",
        "name": "Nýbýlavegur / Álfabrekka",
        "lat": 64.113209,
        "lon": -21.86117
    },
    "10000850": {
        "code": "NÝBÝLA4",
        "name": "Nýbýlavegur / Álfabrekka",
        "lat": 64.112944,
        "lon": -21.861297
    },
    "10000853": {
        "code": "NÝBÝLA6",
        "name": "Nýbýlavegur / Skemmuvegur",
        "lat": 64.110813,
        "lon": -21.855532
    },
    "10000852": {
        "code": "NÝBÝLA5",
        "name": "Nýbýlavegur / Efstihjalli",
        "lat": 64.110757,
        "lon": -21.856081
    },
    "10000854": {
        "code": "HAFNARF",
        "name": "Sunnuhlíð",
        "lat": 64.107074,
        "lon": -21.905615
    },
    "13001227": {
        "code": "BÆJARB3",
        "name": "Hofsstaðabraut / Hlíðarbyggð",
        "lat": 64.091082,
        "lon": -21.914151
    },
    "90000627": {
        "code": "KLEPPS2",
        "name": "Dalbraut",
        "lat": 64.150638,
        "lon": -21.874601
    },
    "13001228": {
        "code": "BÆJARB2",
        "name": "Garðatorg",
        "lat": 64.089524,
        "lon": -21.921489
    },
    "90000628": {
        "code": "KLEPPS3",
        "name": "Hrafnista",
        "lat": 64.148988,
        "lon": -21.867222
    },
    "90000629": {
        "code": "KLEPPS4",
        "name": "Kleppsvegur / Hjallavegur",
        "lat": 64.145761,
        "lon": -21.858683
    },
    "13001221": {
        "code": "BÆJARB1",
        "name": "Hofsstaðabraut / Lyngmóar",
        "lat": 64.091298,
        "lon": -21.914408
    },
    "38110001": {
        "code": "BÚÐARDA",
        "name": "Búðardalur",
        "lat": 65.108063,
        "lon": -21.763202
    },
    "13001222": {
        "code": "BÆJARB7",
        "name": "Fjölbrautaskólinn í Garðabæ / FG",
        "lat": 64.092528,
        "lon": -21.902847
    },
    "38110002": {
        "code": "SKRIÐUL",
        "name": "Skriðuland",
        "lat": 65.3821852089881,
        "lon": -21.8762267930329
    },
    "13001220": {
        "code": "BÆJARBR",
        "name": "Garðatorg",
        "lat": 64.089602,
        "lon": -21.921189
    },
    "13001225": {
        "code": "BÆJARB4",
        "name": "Bæjarbraut / Maltakur",
        "lat": 64.09602,
        "lon": -21.90212
    },
    "13001226": {
        "code": "BÆJARB5",
        "name": "Fjölbrautaskólinn í Garðabæ / FG",
        "lat": 64.092585,
        "lon": -21.903221
    },
    "13001223": {
        "code": "BÆJARB6",
        "name": "Bæjarbraut / Blómahæð",
        "lat": 64.096422,
        "lon": -21.902784
    },
    "66070002": {
        "code": "SKÚTUST",
        "name": "Skútustaðir",
        "lat": 65.567,
        "lon": -17.029
    },
    "13001224": {
        "code": "KARLABR",
        "name": "Karlabraut / Búðir",
        "lat": 64.08958,
        "lon": -21.904583
    },
    "66070001": {
        "code": "REYKJAH",
        "name": "Mývatn - Reykjahlíð",
        "lat": 65.642,
        "lon": -16.911
    },
    "10000868": {
        "code": "DALSMÁ1",
        "name": "Dalsmári / Lindasmári",
        "lat": 64.104551,
        "lon": -21.889135
    },
    "10000867": {
        "code": "DALSMÁ2",
        "name": "Dalsmári / Lautasmári",
        "lat": 64.104493,
        "lon": -21.883934
    },
    "10000869": {
        "code": "DALSMÁ4",
        "name": "Dalsmári / Lindasmári",
        "lat": 64.104647,
        "lon": -21.88916
    },
    "10000860": {
        "code": "VATNSE2",
        "name": "Vatnsendavegur / Álfkonuhvarf",
        "lat": 64.090786,
        "lon": -21.808158
    },
    "10000862": {
        "code": "DALVEG4",
        "name": "Dalvegur",
        "lat": 64.105858,
        "lon": -21.872156
    },
    "90000630": {
        "code": "SÆBRAUT",
        "name": "Sæbraut / Kirkjusandur",
        "lat": 64.149555,
        "lon": -21.888833
    },
    "90000631": {
        "code": "SÆBRAU1",
        "name": "Sæbraut / Kirkjusandur",
        "lat": 64.149596,
        "lon": -21.889515
    },
    "10000864": {
        "code": "DALVEG3",
        "name": "Smáratorg",
        "lat": 64.10427,
        "lon": -21.879689
    },
    "90000632": {
        "code": "BORGARH",
        "name": "Borgarholtsskóli",
        "lat": 64.150363,
        "lon": -21.784939
    },
    "10000863": {
        "code": "DALVEG1",
        "name": "Dalvegur",
        "lat": 64.105812,
        "lon": -21.871792
    },
    "90000633": {
        "code": "BORGAR4",
        "name": "Borgarholtsskóli",
        "lat": 64.150337,
        "lon": -21.784784
    },
    "10000866": {
        "code": "DALSMÁ5",
        "name": "Dalsmári / Lækjasmári",
        "lat": 64.104574,
        "lon": -21.883901
    },
    "90000634": {
        "code": "ELLIÐAB",
        "name": "Elliðabraut / Árvað",
        "lat": 64.100353,
        "lon": -21.778268
    },
    "10000865": {
        "code": "DALVEGU",
        "name": "Smáratorg",
        "lat": 64.104185,
        "lon": -21.879448
    },
    "90000635": {
        "code": "MELAVE7",
        "name": "Melavegur / Dvergaborgir",
        "lat": 64.152003,
        "lon": -21.798608
    },
    "16040625": {
        "code": "VESTU43",
        "name": "Vesturlandsvegur / Hlíðartún",
        "lat": 64.1607780403207,
        "lon": -21.7195195069781
    },
    "16040624": {
        "code": "VESTU17",
        "name": "Vesturlandsvegur / Ásland",
        "lat": 64.171424,
        "lon": -21.677768
    },
    "10000835": {
        "code": "DALVEG2",
        "name": "Dalvegur / Hlíðarhjalli",
        "lat": 64.106455,
        "lon": -21.855698
    },
    "10000834": {
        "code": "ARNARN3",
        "name": "Arnarnesvegur / Salavegur",
        "lat": 64.089593,
        "lon": -21.845248
    },
    "10000837": {
        "code": "HLÍÐARH",
        "name": "Hlíðarhjalli / Fífuhjalli",
        "lat": 64.107757,
        "lon": -21.860165
    },
    "10000836": {
        "code": "DALVEG5",
        "name": "Dalvegur / Hlíðarhjalli",
        "lat": 64.106595,
        "lon": -21.855849
    },
    "10000839": {
        "code": "SMIÐJU2",
        "name": "Smiðjuvegur / Grá gata",
        "lat": 64.110901,
        "lon": -21.852318
    },
    "10000838": {
        "code": "HLÍÐAR7",
        "name": "Hjallakirkja",
        "lat": 64.109553,
        "lon": -21.866266
    },
    "16040622": {
        "code": "REYKJ12",
        "name": "Reykjavegur / Jónsteigur",
        "lat": 64.164059,
        "lon": -21.689208
    },
    "16040621": {
        "code": "REYKJ32",
        "name": "Reykjavegur / Reykjabyggð",
        "lat": 64.1557821174627,
        "lon": -21.6639075700859
    },
    "16040620": {
        "code": "BJARKAR",
        "name": "Framhaldsskólinn í Mosfellsbæ / FMOS",
        "lat": 64.16593,
        "lon": -21.702089
    },
    "11000147": {
        "code": "NORÐU16",
        "name": "Norðurströnd / Barðaströnd",
        "lat": 64.156782,
        "lon": -21.988204
    },
    "10000831": {
        "code": "FÍFUHV3",
        "name": "Lindir",
        "lat": 64.09858,
        "lon": -21.870174
    },
    "10000830": {
        "code": "SALAVE3",
        "name": "Vatnsendavegur / Akurhvarf",
        "lat": 64.087173,
        "lon": -21.812628
    },
    "90000600": {
        "code": "VESTU26",
        "name": "Vesturlandsvegur / Hálsar",
        "lat": 64.124237,
        "lon": -21.793601
    },
    "10000832": {
        "code": "SMÐJUVE",
        "name": "Smiðjuvegur / Grá gata",
        "lat": 64.110889,
        "lon": -21.85211
    },
    "16040619": {
        "code": "HÁHOLT",
        "name": "Háholt",
        "lat": 64.167237,
        "lon": -21.693797
    },
    "16040618": {
        "code": "REYKJ10",
        "name": "Reykjavegur / Dælustöðvarvegur",
        "lat": 64.158349,
        "lon": -21.670577
    },
    "25040009": {
        "code": "VELLIR1",
        "name": "Vellir",
        "lat": 64.0642880690852,
        "lon": -22.639762033331
    },
    "16040617": {
        "code": "REYKJA9",
        "name": "Reykjavegur",
        "lat": 64.153855,
        "lon": -21.65753
    },
    "16040616": {
        "code": "BAUGSH1",
        "name": "Lágafellsskóli",
        "lat": 64.167079,
        "lon": -21.722706
    },
    "16040615": {
        "code": "REYKJ13",
        "name": "Reykjavegur / Reykjabyggð",
        "lat": 64.155738,
        "lon": -21.663995
    },
    "16040614": {
        "code": "REYKJ14",
        "name": "Reykjavegur / Dælustöðvarvegur",
        "lat": 64.158347,
        "lon": -21.670779
    },
    "16040613": {
        "code": "REYKJ16",
        "name": "Reykjavegur / Jónsteigur",
        "lat": 64.163313,
        "lon": -21.687658
    },
    "90000609": {
        "code": "HÓTEL 1",
        "name": "Nauthólsvegur",
        "lat": 64.130283,
        "lon": -21.930057
    },
    "16040612": {
        "code": "HÁHOLT1",
        "name": "Háholt",
        "lat": 64.167206,
        "lon": -21.694366
    },
    "10000846": {
        "code": "NÝBÝLA2",
        "name": "Nýbýlavegur / Lundarbrekka",
        "lat": 64.113678,
        "lon": -21.872197
    },
    "10000848": {
        "code": "NÝBÝLA8",
        "name": "Nýbýlavegur / Ástún",
        "lat": 64.113735,
        "lon": -21.868226
    },
    "10000847": {
        "code": "NÝBÝLA9",
        "name": "Nýbýlavegur / Lundarbrekka",
        "lat": 64.113842,
        "lon": -21.872486
    },
    "10000849": {
        "code": "NÝBÝLA3",
        "name": "Nýbýlavegur / Þverbrekka",
        "lat": 64.113461,
        "lon": -21.866342
    },
    "16040611": {
        "code": "SKÓLAB1",
        "name": "Varmárskóli",
        "lat": 64.169867,
        "lon": -21.692703
    },
    "25040002": {
        "code": "PÓSTHÚS",
        "name": "Pósthúsið Garði / Garður",
        "lat": 64.069799,
        "lon": -22.651014
    },
    "16040610": {
        "code": "SKEIÐH1",
        "name": "Skeiðholt",
        "lat": 64.169143,
        "lon": -21.70118
    },
    "10000842": {
        "code": "NÝBÝLAV",
        "name": "Nýbýlavegur / Laufbrekka",
        "lat": 64.114069,
        "lon": -21.887445
    },
    "25040006": {
        "code": "GARÐVAN",
        "name": "Garðvangur",
        "lat": 64.0720646878747,
        "lon": -22.6573187676109
    },
    "25040005": {
        "code": "NÝJALA1",
        "name": "Nýjaland",
        "lat": 64.075932,
        "lon": -22.668548
    },
    "10000844": {
        "code": "NÝBÝLA1",
        "name": "Nýbýlavegur / Hjallabrekka",
        "lat": 64.11393,
        "lon": -21.87987
    },
    "25040008": {
        "code": "VELLIR",
        "name": "Vellir",
        "lat": 64.0642510400643,
        "lon": -22.6398019094077
    },
    "25040007": {
        "code": "GARÐVA1",
        "name": "Garðvangur",
        "lat": 64.0721529,
        "lon": -22.65728441
    },
    "16040649": {
        "code": "KLAPPAH",
        "name": "Baugshlíð / Blikastaðavegur",
        "lat": 64.162987,
        "lon": -21.728159
    },
    "25030001": {
        "code": "ÍÞRÓTTA",
        "name": "Íþróttamiðstöðin Sandgerði",
        "lat": 64.033948,
        "lon": -22.700544
    },
    "25030003": {
        "code": "ÞEKKING",
        "name": "Þekkingarsetur Suðurnesja",
        "lat": 64.0410853226981,
        "lon": -22.7122089563306
    },
    "25030002": {
        "code": "VARÐAN",
        "name": "Varðan",
        "lat": 64.038352,
        "lon": -22.704308
    },
    "10000812": {
        "code": "KÁRSNES",
        "name": "Kársnesbraut / Sæbólsbraut",
        "lat": 64.114526,
        "lon": -21.903531
    },
    "10000815": {
        "code": "SMIÐJU1",
        "name": "Smiðjuvegur / Gul gata",
        "lat": 64.113328,
        "lon": -21.84835
    },
    "10000814": {
        "code": "KRINGL4",
        "name": "Skeljabrekka",
        "lat": 64.114422,
        "lon": -21.899866
    },
    "10000817": {
        "code": "VATNSE1",
        "name": "Vatnsendavegur / Kóravegur",
        "lat": 64.085384,
        "lon": -21.819622
    },
    "10000819": {
        "code": "ÁLFHÓL1",
        "name": "Álfhólsvegur / Túnbrekka",
        "lat": 64.111758,
        "lon": -21.884427
    },
    "10000818": {
        "code": "SMIÐJUV",
        "name": "Smiðjuvegur / Gul gata",
        "lat": 64.113249,
        "lon": -21.848192
    },
    "16040641": {
        "code": "KLAPPA1",
        "name": "Baugshlíð / Skálatún",
        "lat": 64.159296,
        "lon": -21.725839
    },
    "10000811": {
        "code": "URÐABRA",
        "name": "Hlíðarhjalli / Bakkahjalli",
        "lat": 64.107374,
        "lon": -21.87409
    },
    "90000821": {
        "code": "Geo-l88",
        "name": "Bíó Paradís",
        "lat": 64.1456391584898,
        "lon": -21.9248541506857
    },
    "10000810": {
        "code": "KÁRSNE2",
        "name": "Kársnesbraut / Litlavör",
        "lat": 64.113682,
        "lon": -21.923298
    },
    "90000822": {
        "code": "Geo-l90",
        "name": "Bíó Paradís",
        "lat": 64.1457374271584,
        "lon": -21.9258222252765
    },
    "90000823": {
        "code": "Geo-l85",
        "name": "Barónsstígur",
        "lat": 64.1445306090398,
        "lon": -21.9197335300998
    },
    "16040639": {
        "code": "BAUGSHL",
        "name": "Lágafellsskóli",
        "lat": 64.166032,
        "lon": -21.72591
    },
    "16040638": {
        "code": "ÁLFATA2",
        "name": "Álfatangi / Skeljatangi",
        "lat": 64.168442,
        "lon": -21.717853
    },
    "16040637": {
        "code": "ÁLFATA1",
        "name": "Álfatangi / Arnartangi",
        "lat": 64.169378,
        "lon": -21.715147
    },
    "16040636": {
        "code": "ÁLFATAN",
        "name": "Álfatangi / Þverholt",
        "lat": 64.170266,
        "lon": -21.708993
    },
    "16040635": {
        "code": "SKEIÐHO",
        "name": "Skeiðholt",
        "lat": 64.169128,
        "lon": -21.701525
    },
    "16040634": {
        "code": "SKÓLABR",
        "name": "Varmárskóli",
        "lat": 64.169968,
        "lon": -21.692647
    },
    "49080001": {
        "code": "STAÐARS",
        "name": "Staðarskáli",
        "lat": 65.144715,
        "lon": -21.083616
    },
    "10000824": {
        "code": "SKÁLAH2",
        "name": "Vatnsendavegur / Elliðahvammsvegur",
        "lat": 64.087018,
        "lon": -21.812824
    },
    "10000823": {
        "code": "VATNSE4",
        "name": "Vatnsendavegur / Kóravegur",
        "lat": 64.08531,
        "lon": -21.818631
    },
    "10000826": {
        "code": "FÍFUHV7",
        "name": "Fífuhvammsvegur / Arnarsmári",
        "lat": 64.099711,
        "lon": -21.903924
    },
    "10000825": {
        "code": "FÍFUHV6",
        "name": "Fífuhvammsvegur / Arnarsmári",
        "lat": 64.099645,
        "lon": -21.904513
    },
    "10000828": {
        "code": "ÁLFHÓLS",
        "name": "Álfhólsvegur / Túnbrekka",
        "lat": 64.11183,
        "lon": -21.884425
    },
    "10000827": {
        "code": "ARNARN5",
        "name": "Arnarnesvegur / Bæjarbraut",
        "lat": 64.09869,
        "lon": -21.905116
    },
    "10000820": {
        "code": "DIGRAN4",
        "name": "Menntaskólinn í Kópavogi / MK",
        "lat": 64.110166,
        "lon": -21.89586
    },
    "11000113": {
        "code": "NESVEG9",
        "name": "Grænamýri",
        "lat": 64.146087,
        "lon": -21.977692
    },
    "11000112": {
        "code": "NESVE10",
        "name": "Nesvegur / Skerjabraut",
        "lat": 64.148036,
        "lon": -21.982981
    },
    "10000822": {
        "code": "DIGRAN2",
        "name": "Kópavogsskóli",
        "lat": 64.110379,
        "lon": -21.900322
    },
    "11000111": {
        "code": "NESVE11",
        "name": "Eiðistorg",
        "lat": 64.150387,
        "lon": -21.9861
    },
    "10000821": {
        "code": "DIGRAN1",
        "name": "Menntaskólinn í Kópavogi / MK",
        "lat": 64.110274,
        "lon": -21.895669
    },
    "11000110": {
        "code": "NORÐU18",
        "name": "Norðurströnd / Austurströnd",
        "lat": 64.152592,
        "lon": -21.985947
    },
    "90000480": {
        "code": "STRAND7",
        "name": "Gullinbrú / OLÍS",
        "lat": 64.137622,
        "lon": -21.808404
    },
    "90000481": {
        "code": "MIKLAB3",
        "name": "Hlíðar",
        "lat": 64.134129,
        "lon": -21.903928
    },
    "90000240": {
        "code": "GRENSÁ4",
        "name": "Grensásvegur / Skeifan",
        "lat": 64.133196,
        "lon": -21.872544
    },
    "90000482": {
        "code": "MIKLAB4",
        "name": "Lokinhamrar / Dverghamrar",
        "lat": 64.136911,
        "lon": -21.812576
    },
    "90000241": {
        "code": "GNOÐAR2",
        "name": "Gnoðarvogur / Ljósheimar",
        "lat": 64.131992,
        "lon": -21.863696
    },
    "90000483": {
        "code": "MIKLAB5",
        "name": "Klambratún",
        "lat": 64.136006,
        "lon": -21.916078
    },
    "90000242": {
        "code": "SKEIÐA7",
        "name": "Menntaskólinn við Sund / MS",
        "lat": 64.131255,
        "lon": -21.86071
    },
    "90000484": {
        "code": "HAMRAVÍ",
        "name": "Kelduskóli / Vík",
        "lat": 64.152593,
        "lon": -21.778546
    },
    "90000001": {
        "code": "HVERFI3",
        "name": "Stjórnarráðið",
        "lat": 64.147505,
        "lon": -21.934808
    },
    "90000243": {
        "code": "LANGHO6",
        "name": "Langholtskirkja",
        "lat": 64.13609,
        "lon": -21.856421
    },
    "90000485": {
        "code": "MELAVEG",
        "name": "Melavegur / Goðaborgir",
        "lat": 64.153038,
        "lon": -21.796901
    },
    "90000002": {
        "code": "HVERFI4",
        "name": "Þjóðleikhúsið",
        "lat": 64.146762,
        "lon": -21.931048
    },
    "90000244": {
        "code": "LANGHO5",
        "name": "Langholtsvegur / Holtavegur",
        "lat": 64.138973,
        "lon": -21.859317
    },
    "90000486": {
        "code": "MELAVE1",
        "name": "Melavegur / Hulduborgir",
        "lat": 64.154146,
        "lon": -21.793517
    },
    "90000003": {
        "code": "SKOTHÚS",
        "name": "Fríkirkjuvegur",
        "lat": 64.143101,
        "lon": -21.940088
    },
    "90000245": {
        "code": "LANGHO4",
        "name": "Sunnutorg",
        "lat": 64.141084,
        "lon": -21.861124
    },
    "90000487": {
        "code": "MELAVE2",
        "name": "Melavegur / Jötnaborgir",
        "lat": 64.154769,
        "lon": -21.79142
    },
    "90000004": {
        "code": "LÆKJARG",
        "name": "Menntaskólinn í Reykjavík / MR",
        "lat": 64.146477,
        "lon": -21.937258
    },
    "90000246": {
        "code": "SUÐURG7",
        "name": "Háskólabíó",
        "lat": 64.139741,
        "lon": -21.951911
    },
    "90000247": {
        "code": "AUSTUR7",
        "name": "Austurbrún / Hólsvegur",
        "lat": 64.143487,
        "lon": -21.864643
    },
    "90000489": {
        "code": "STRANDV",
        "name": "Lokinhamrar / Gerðhamrar",
        "lat": 64.138383,
        "lon": -21.816256
    },
    "90000006": {
        "code": "UMFERÐA",
        "name": "Umferðarmiðstöðin (BSÍ)",
        "lat": 64.137099,
        "lon": -21.933662
    },
    "90000248": {
        "code": "AUSTUR6",
        "name": "Austurbrún / Dragavegur",
        "lat": 64.145523,
        "lon": -21.863876
    },
    "90000007": {
        "code": "UMFERÐ1",
        "name": "Umferðarmiðstöðin (BSÍ)",
        "lat": 64.1379415981625,
        "lon": -21.9339090580538
    },
    "90000249": {
        "code": "AUSTUR5",
        "name": "Hrafnista",
        "lat": 64.146758,
        "lon": -21.867253
    },
    "90000009": {
        "code": "HÓTEL L",
        "name": "Nauthólsvegur",
        "lat": 64.130841,
        "lon": -21.929604
    },
    "20000094": {
        "code": "HAFDALU",
        "name": "Hafdalur",
        "lat": 63.974385,
        "lon": -22.50035
    },
    "20000095": {
        "code": "UNNARDA",
        "name": "Unnardalur",
        "lat": 63.972477,
        "lon": -22.495793
    },
    "20000096": {
        "code": "ASPARDA",
        "name": "Aspardalur",
        "lat": 63.97101,
        "lon": -22.490074
    },
    "20000097": {
        "code": "FURUDAL",
        "name": "Furudalur",
        "lat": 63.97115,
        "lon": -22.485729
    },
    "20000098": {
        "code": "KEILIR",
        "name": "Keilir",
        "lat": 63.96946,
        "lon": -22.571307
    },
    "20000099": {
        "code": "GRÆNÁS",
        "name": "Grænás",
        "lat": 63.981447,
        "lon": -22.558577
    },
    "10000809": {
        "code": "KÁRSNE3",
        "name": "Kársnesbraut / Vesturvör",
        "lat": 64.113604,
        "lon": -21.929884
    },
    "20000090": {
        "code": "AKURSKÓ",
        "name": "Akurskóli",
        "lat": 63.974372,
        "lon": -22.512978
    },
    "20000091": {
        "code": "URÐARBR",
        "name": "Urðarbraut",
        "lat": 63.970337,
        "lon": -22.505195
    },
    "20000092": {
        "code": "SPÓATJÖ",
        "name": "Spóatjörn",
        "lat": 63.97499,
        "lon": -22.505276
    },
    "10000802": {
        "code": "HAMRAB2",
        "name": "Hamraborg",
        "lat": 64.111089,
        "lon": -21.908351
    },
    "10000804": {
        "code": "KÓPAVOG",
        "name": "Kópavogsbraut / Sunnuhlíð",
        "lat": 64.109082,
        "lon": -21.909596
    },
    "90000490": {
        "code": "STRAND2",
        "name": "Strandvegur / Rimaflöt",
        "lat": 64.144481,
        "lon": -21.806232
    },
    "90000491": {
        "code": "GAGNVE5",
        "name": "Gagnvegur / Brekkuhús",
        "lat": 64.138692,
        "lon": -21.77671
    },
    "10000806": {
        "code": "KÓPAVO2",
        "name": "Kársnesskóli",
        "lat": 64.109192,
        "lon": -21.924001
    },
    "90000250": {
        "code": "BRÚNAV1",
        "name": "Sundlaugarvegur / Laugarásvegur",
        "lat": 64.146877,
        "lon": -21.873929
    },
    "90000492": {
        "code": "GAGNVE4",
        "name": "Gagnvegur / Vallarhús",
        "lat": 64.139618,
        "lon": -21.781186
    },
    "10000805": {
        "code": "KÓPAVO1",
        "name": "Kópavogsbraut / Urðarbraut",
        "lat": 64.109198,
        "lon": -21.917279
    },
    "90000251": {
        "code": "SUNDLA1",
        "name": "Laugardalslaug",
        "lat": 64.146806,
        "lon": -21.879884
    },
    "90000493": {
        "code": "GAGNVE3",
        "name": "Gagnvegur / Dalhús",
        "lat": 64.139361,
        "lon": -21.784849
    },
    "10000808": {
        "code": "KÁRSNE1",
        "name": "Kópavogsbraut / Borgarholtsbraut",
        "lat": 64.111244,
        "lon": -21.935374
    },
    "90000252": {
        "code": "BORGAR2",
        "name": "Höfðatorg",
        "lat": 64.145431,
        "lon": -21.908257
    },
    "90000494": {
        "code": "FJALLK6",
        "name": "Fjallkonuvegur / Gagnvegur",
        "lat": 64.139109,
        "lon": -21.789568
    },
    "10000807": {
        "code": "KÓPAVO3",
        "name": "Kópavogsbraut / Kópavör",
        "lat": 64.109299,
        "lon": -21.930667
    },
    "90000011": {
        "code": "SNORRA1",
        "name": "Snorrabraut",
        "lat": 64.13875,
        "lon": -21.92142
    },
    "90000253": {
        "code": "HÉÐINSG",
        "name": "Héðinsgata",
        "lat": 64.15219,
        "lon": -21.880973
    },
    "90000495": {
        "code": "FJALLK7",
        "name": "Fjallkonuvegur / Reykjafold",
        "lat": 64.13774,
        "lon": -21.791092
    },
    "90000254": {
        "code": "BIRKIME",
        "name": "Þjóðarbókhlaðan",
        "lat": 64.143485,
        "lon": -21.951392
    },
    "90000496": {
        "code": "FJALLK8",
        "name": "Fjallkonuvegur / Jöklafold",
        "lat": 64.135625,
        "lon": -21.793327
    },
    "90000013": {
        "code": "MIKLAB7",
        "name": "Kringlan",
        "lat": 64.131921,
        "lon": -21.889215
    },
    "90000255": {
        "code": "BIRKIM1",
        "name": "Hagatorg",
        "lat": 64.142186,
        "lon": -21.953469
    },
    "90000497": {
        "code": "FJALLK9",
        "name": "Fjallkonuvegur / Frostafold",
        "lat": 64.134852,
        "lon": -21.798156
    },
    "90000256": {
        "code": "SUÐURG3",
        "name": "Suðurgata / Hjarðarhagi",
        "lat": 64.137371,
        "lon": -21.954611
    },
    "90000498": {
        "code": "FJALL10",
        "name": "Fjallkonuvegur / Hverafold",
        "lat": 64.135784,
        "lon": -21.802317
    },
    "90000015": {
        "code": "KRINGL1",
        "name": "Kringlan",
        "lat": 64.130009,
        "lon": -21.900467
    },
    "90000257": {
        "code": "SUÐURG2",
        "name": "Skerjagarðar",
        "lat": 64.135383,
        "lon": -21.956832
    },
    "90000499": {
        "code": "FJALL11",
        "name": "Funafold",
        "lat": 64.136535,
        "lon": -21.80702
    },
    "90000016": {
        "code": "KRINGL3",
        "name": "Kringlan",
        "lat": 64.129588,
        "lon": -21.899836
    },
    "90000258": {
        "code": "EINARS1",
        "name": "Einarsnes / Bauganes",
        "lat": 64.130376,
        "lon": -21.952942
    },
    "90000259": {
        "code": "FLÓKAG3",
        "name": "Kjarvalsstaðir",
        "lat": 64.138239,
        "lon": -21.911937
    },
    "90000018": {
        "code": "VESTURL",
        "name": "Ártún",
        "lat": 64.123754,
        "lon": -21.821591
    },
    "90000019": {
        "code": "VESTUR1",
        "name": "Ártún",
        "lat": 64.124214,
        "lon": -21.822107
    },
    "16040608": {
        "code": "ÁLFATA4",
        "name": "Álfatangi / Brekkutangi",
        "lat": 64.169358,
        "lon": -21.714603
    },
    "20000082": {
        "code": "STJÁNI",
        "name": "Stjáni Blái",
        "lat": 63.997131,
        "lon": -22.549116
    },
    "90000218": {
        "code": "LANGHOL",
        "name": "Langholtsvegur / Hólsvegur",
        "lat": 64.142426,
        "lon": -21.860592
    },
    "16040607": {
        "code": "ÁLFATA5",
        "name": "Álfatangi / Bollatangi",
        "lat": 64.168511,
        "lon": -21.717552
    },
    "90000219": {
        "code": "LANGHO1",
        "name": "Sunnutorg",
        "lat": 64.141077,
        "lon": -21.861326
    },
    "16040606": {
        "code": "KLAPPA2",
        "name": "Baugshlíð / Klapparhlíð",
        "lat": 64.163149,
        "lon": -21.727952
    },
    "16040604": {
        "code": "KLAPPA3",
        "name": "Baugshlíð / Skálatún",
        "lat": 64.15955,
        "lon": -21.725659
    },
    "20000087": {
        "code": "STEKKJ4",
        "name": "Stekkjargata",
        "lat": 63.973027,
        "lon": -22.522569
    },
    "20000089": {
        "code": "KAMBUR",
        "name": "Kambur",
        "lat": 63.972228,
        "lon": -22.511714
    },
    "66090001": {
        "code": "AÐALDAL",
        "name": "Aðaldalsvegur",
        "lat": 65.886061,
        "lon": -17.437669
    },
    "20000080": {
        "code": "GAMLI B",
        "name": "Gamli bærinn",
        "lat": 64.005052,
        "lon": -22.556587
    },
    "16040609": {
        "code": "ÁLFATA3",
        "name": "Álfatangi / Þverholt",
        "lat": 64.170057,
        "lon": -21.709025
    },
    "90000460": {
        "code": "MIKLAB2",
        "name": "Hlíðar",
        "lat": 64.1338,
        "lon": -21.903618
    },
    "90000461": {
        "code": "MIKLAB8",
        "name": "Kringlan",
        "lat": 64.132227,
        "lon": -21.893581
    },
    "90000220": {
        "code": "LANGHO2",
        "name": "Langholtsvegur / Holtavegur",
        "lat": 64.138677,
        "lon": -21.859358
    },
    "90000462": {
        "code": "LOKINH4",
        "name": "Lokinhamrar / Sporhamrar",
        "lat": 64.139654,
        "lon": -21.812038
    },
    "90000221": {
        "code": "LANGHO3",
        "name": "Langholtskirkja",
        "lat": 64.13609,
        "lon": -21.856742
    },
    "90000222": {
        "code": "SKEIÐA4",
        "name": "Skeiðarvogur / Langholtsvegur",
        "lat": 64.133346,
        "lon": -21.854508
    },
    "90000223": {
        "code": "SKEIÐA5",
        "name": "Menntaskólinn við Sund / MS",
        "lat": 64.131214,
        "lon": -21.861475
    },
    "90000224": {
        "code": "GRENSÁS",
        "name": "Grensásvegur / Ármúli",
        "lat": 64.132622,
        "lon": -21.873461
    },
    "90000225": {
        "code": "GRENSÁ1",
        "name": "Grensás",
        "lat": 64.130304,
        "lon": -21.875175
    },
    "90000467": {
        "code": "BREIÐAV",
        "name": "Lokinhamrar / Bláhamrar",
        "lat": 64.137054,
        "lon": -21.810411
    },
    "90000226": {
        "code": "SUÐURG4",
        "name": "Háskóli Íslands",
        "lat": 64.140344,
        "lon": -21.950761
    },
    "90000468": {
        "code": "SKÓLAV1",
        "name": "Skólavegur",
        "lat": 64.148905,
        "lon": -21.779652
    },
    "90000227": {
        "code": "SUÐURG5",
        "name": "Þjóðminjasafnið",
        "lat": 64.142334,
        "lon": -21.948415
    },
    "90000469": {
        "code": "VÍKURV3",
        "name": "Egilshöll",
        "lat": 64.14819,
        "lon": -21.772144
    },
    "90000228": {
        "code": "SOGAVE2",
        "name": "Sogavegur / Háagerði",
        "lat": 64.126182,
        "lon": -21.864211
    },
    "90000229": {
        "code": "SOGAVE3",
        "name": "Sogavegur / Borgargerði",
        "lat": 64.124852,
        "lon": -21.859741
    },
    "20000072": {
        "code": "MYLLUBA",
        "name": "Myllubakkaskóli",
        "lat": 64.001117,
        "lon": -22.556697
    },
    "20000073": {
        "code": "HORNBJA",
        "name": "Hornbjarg",
        "lat": 64.002764,
        "lon": -22.558661
    },
    "20000077": {
        "code": "VINAMIN",
        "name": "Vinaminni",
        "lat": 64.004238,
        "lon": -22.558515
    },
    "20000078": {
        "code": "FISCHER",
        "name": "Fischershús",
        "lat": 64.006612,
        "lon": -22.55833
    },
    "90000470": {
        "code": "GULLEN2",
        "name": "Gullengi / Laufengi",
        "lat": 64.146931,
        "lon": -21.779582
    },
    "90000471": {
        "code": "KORPÚL1",
        "name": "Korpúlfsstaðir",
        "lat": 64.153308,
        "lon": -21.764408
    },
    "90000230": {
        "code": "SOGAVE4",
        "name": "Sogavegur / Tunguvegur",
        "lat": 64.122957,
        "lon": -21.855559
    },
    "90000472": {
        "code": "GULLEN3",
        "name": "Gullengi / Borgavegur",
        "lat": 64.147073,
        "lon": -21.783
    },
    "90000231": {
        "code": "HÁALEI2",
        "name": "Borgarspítali",
        "lat": 64.123247,
        "lon": -21.891515
    },
    "90000473": {
        "code": "LOKINHA",
        "name": "Lokinhamrar / Vegghamrar",
        "lat": 64.138513,
        "lon": -21.808404
    },
    "90000232": {
        "code": "SLÉTTUV",
        "name": "Sléttuvegur",
        "lat": 64.123625,
        "lon": -21.894419
    },
    "90000474": {
        "code": "LOKINH1",
        "name": "Lokinhamrar / Sporhamrar",
        "lat": 64.139761,
        "lon": -21.812023
    },
    "20000069": {
        "code": "VESTU41",
        "name": "Vesturgata",
        "lat": 64.005994,
        "lon": -22.564646
    },
    "90000233": {
        "code": "HJARÐAR",
        "name": "Hjarðarhagi / Dunhagi",
        "lat": 64.13876,
        "lon": -21.957975
    },
    "90000475": {
        "code": "LOKINH2",
        "name": "Lokinhamrar / Leiðhamrar",
        "lat": 64.140624,
        "lon": -21.817025
    },
    "90000234": {
        "code": "SOGAVE7",
        "name": "Sogavegur / Tunguvegur",
        "lat": 64.123034,
        "lon": -21.855433
    },
    "90000476": {
        "code": "MELAVE5",
        "name": "Melavegur / Tröllaborgir",
        "lat": 64.154821,
        "lon": -21.791579
    },
    "90000235": {
        "code": "SOGAVE8",
        "name": "Sogavegur / Borgargerði",
        "lat": 64.124974,
        "lon": -21.859756
    },
    "90000477": {
        "code": "MELAVE4",
        "name": "Melavegur / Goðaborgir",
        "lat": 64.154217,
        "lon": -21.793594
    },
    "90000236": {
        "code": "SOGAVE9",
        "name": "Sogavegur / Háagerði",
        "lat": 64.126677,
        "lon": -21.865429
    },
    "90000478": {
        "code": "MELAVE3",
        "name": "Melavegur / Dofraborgir",
        "lat": 64.153033,
        "lon": -21.797047
    },
    "90000237": {
        "code": "SOGAV10",
        "name": "Sogavegur / Grundargerði",
        "lat": 64.128128,
        "lon": -21.871257
    },
    "87100001": {
        "code": "FLÚÐIR1",
        "name": "Flúðir",
        "lat": 64.1308641273949,
        "lon": -20.3214083190065
    },
    "90000238": {
        "code": "SOGAV11",
        "name": "Sogavegur / Akurgerði",
        "lat": 64.128591,
        "lon": -21.874015
    },
    "90000239": {
        "code": "GRENSÁ5",
        "name": "Grensás",
        "lat": 64.130322,
        "lon": -21.874595
    },
    "20000060": {
        "code": "VATNSHO",
        "name": "Vatnsholt",
        "lat": 64.000254,
        "lon": -22.576353
    },
    "90000438": {
        "code": "KORPÚL2",
        "name": "Korpúlfsstaðavegur / Brúnastaðir",
        "lat": 64.155023,
        "lon": -21.757956
    },
    "20000061": {
        "code": "BALDUR1",
        "name": "Baldursgarður",
        "lat": 64.002165,
        "lon": -22.570368
    },
    "90000439": {
        "code": "VÍKURVE",
        "name": "Víkurvegur / Keldnaholt",
        "lat": 64.139366,
        "lon": -21.771997
    },
    "20000063": {
        "code": "HEIÐAR1",
        "name": "Heiðarsel",
        "lat": 64.009702,
        "lon": -22.575426
    },
    "20000064": {
        "code": "HEIÐARE",
        "name": "Heiðarendi",
        "lat": 64.010964,
        "lon": -22.575363
    },
    "20000066": {
        "code": "HEIÐARB",
        "name": "Heiðarbraut",
        "lat": 64.008333,
        "lon": -22.572464
    },
    "20000067": {
        "code": "AÐALGAT",
        "name": "Aðalgata",
        "lat": 64.003242,
        "lon": -22.564256
    },
    "90000440": {
        "code": "BORGAVE",
        "name": "Borgavegur / Víkurvegur",
        "lat": 64.14496,
        "lon": -21.775592
    },
    "20000057": {
        "code": "HJALLAV",
        "name": "Hjallavegur",
        "lat": 63.989424,
        "lon": -22.550978
    },
    "90000441": {
        "code": "BAKKAS3",
        "name": "Kelduskóli / Korpa",
        "lat": 64.157507,
        "lon": -21.755284
    },
    "20000058": {
        "code": "KROSSM1",
        "name": "Krossmói",
        "lat": 63.993639,
        "lon": -22.549056
    },
    "90000200": {
        "code": "SKELJAN",
        "name": "Skeljanes",
        "lat": 64.126021,
        "lon": -21.94915
    },
    "90000442": {
        "code": "BAKKAS2",
        "name": "Bakkastaðir / Barðastaðir",
        "lat": 64.158047,
        "lon": -21.750857
    },
    "20000059": {
        "code": "REYKJ30",
        "name": "Reykjavíkurtorg",
        "lat": 63.99498,
        "lon": -22.550085
    },
    "90000201": {
        "code": "SKELJA1",
        "name": "Skeljanes / Bauganes",
        "lat": 64.128043,
        "lon": -21.946858
    },
    "90000443": {
        "code": "KORPÚLF",
        "name": "Korpúlfsstaðavegur / Brúnastaðir",
        "lat": 64.155091,
        "lon": -21.758423
    },
    "90000202": {
        "code": "SKELJA2",
        "name": "Skeljanes / Bauganes",
        "lat": 64.12802,
        "lon": -21.947071
    },
    "90000444": {
        "code": "NORÐUR2",
        "name": "Fellaskóli / Nýlistasafnið",
        "lat": 64.101671,
        "lon": -21.822682
    },
    "90000203": {
        "code": "EINARSN",
        "name": "Einarsnes / Bauganes",
        "lat": 64.130487,
        "lon": -21.953125
    },
    "90000445": {
        "code": "NORÐUR3",
        "name": "Norðurfell / Austurberg",
        "lat": 64.101979,
        "lon": -21.817126
    },
    "90000204": {
        "code": "ÞORRAG1",
        "name": "Þorragata",
        "lat": 64.132767,
        "lon": -21.952678
    },
    "90000446": {
        "code": "AUSTUR1",
        "name": "Gerðuberg",
        "lat": 64.10466,
        "lon": -21.816776
    },
    "37100001": {
        "code": "VATNALE",
        "name": "Vatnaleið",
        "lat": 64.9657155788255,
        "lon": -22.8892991922126
    },
    "90000205": {
        "code": "ÞORRAGA",
        "name": "Þorragata",
        "lat": 64.132907,
        "lon": -21.953046
    },
    "90000447": {
        "code": "SUÐURH2",
        "name": "Suðurhólar / Austurberg",
        "lat": 64.107773,
        "lon": -21.815871
    },
    "90000206": {
        "code": "SUÐURGA",
        "name": "Skerjagarðar",
        "lat": 64.13562,
        "lon": -21.956062
    },
    "90000448": {
        "code": "SUÐURH3",
        "name": "Suðurhólar / Þrastarhólar",
        "lat": 64.107739,
        "lon": -21.80942
    },
    "90000207": {
        "code": "SUÐURG1",
        "name": "Stúdentagarðar",
        "lat": 64.137293,
        "lon": -21.954183
    },
    "90000449": {
        "code": "NORÐURH",
        "name": "Norðurhólar / Stelkshólar",
        "lat": 64.109273,
        "lon": -21.804421
    },
    "90000208": {
        "code": "HJARÐA1",
        "name": "Hjarðarhagi / Vesturgarður",
        "lat": 64.141753,
        "lon": -21.961426
    },
    "20000051": {
        "code": "GRÆNÁS1",
        "name": "Grænás",
        "lat": 63.981577,
        "lon": -22.557891
    },
    "67090001": {
        "code": "ÞÓRSHÖF",
        "name": "Þórshöfn",
        "lat": 66.199427,
        "lon": -15.337647
    },
    "90000209": {
        "code": "HAGATOR",
        "name": "Hótel Saga",
        "lat": 64.141205,
        "lon": -21.954022
    },
    "20000053": {
        "code": "ÓLAFSLU",
        "name": "Ólafslundur",
        "lat": 63.990053,
        "lon": -22.554063
    },
    "90000450": {
        "code": "NORÐUR5",
        "name": "Norðurhólar / Smyrilshólar",
        "lat": 64.110244,
        "lon": -21.809901
    },
    "90000451": {
        "code": "VESTURH",
        "name": "Vesturhólar / Hrafnhólar",
        "lat": 64.110558,
        "lon": -21.81539
    },
    "90000210": {
        "code": "BIRKIM2",
        "name": "Þjóðarbókhlaðan",
        "lat": 64.14352,
        "lon": -21.951141
    },
    "90000452": {
        "code": "VESTUR8",
        "name": "Vesturhólar / Fýlshólar",
        "lat": 64.111675,
        "lon": -21.818467
    },
    "20000047": {
        "code": "GRÆNÁSB",
        "name": "Grænásbraut",
        "lat": 63.975469,
        "lon": -22.565975
    },
    "90000211": {
        "code": "HÉÐINS1",
        "name": "Héðinsgata",
        "lat": 64.152135,
        "lon": -21.881371
    },
    "90000453": {
        "code": "VESTUR9",
        "name": "Vesturhólar / Höfðabakki",
        "lat": 64.11029,
        "lon": -21.820872
    },
    "90000212": {
        "code": "BORGART",
        "name": "Höfðatorg",
        "lat": 64.145207,
        "lon": -21.907355
    },
    "90000454": {
        "code": "VÆTTABO",
        "name": "Vættaborgir",
        "lat": 64.154411,
        "lon": -21.785038
    },
    "20000049": {
        "code": "SKÓGART",
        "name": "Skógartorg",
        "lat": 63.971999,
        "lon": -22.558921
    },
    "90000213": {
        "code": "SUNDLAU",
        "name": "Laugardalslaug",
        "lat": 64.146651,
        "lon": -21.879681
    },
    "90000455": {
        "code": "STRÆTÓV",
        "name": "Strætóvegur / Vættaborgir",
        "lat": 64.152964,
        "lon": -21.785334
    },
    "90000214": {
        "code": "BRÚNAVE",
        "name": "Brúnavegur / Laugarásvegur",
        "lat": 64.146765,
        "lon": -21.872313
    },
    "90000456": {
        "code": "BORGAV1",
        "name": "Gullinbrú / OLÍS",
        "lat": 64.138306,
        "lon": -21.806982
    },
    "90000215": {
        "code": "AUSTUR2",
        "name": "Hrafnista",
        "lat": 64.146572,
        "lon": -21.866615
    },
    "90000457": {
        "code": "SELÁSSK",
        "name": "Selásskóli",
        "lat": 64.104935,
        "lon": -21.783863
    },
    "90000216": {
        "code": "AUSTUR3",
        "name": "Austurbrún / Dragavegur",
        "lat": 64.145149,
        "lon": -21.864176
    },
    "90000458": {
        "code": "MIKLABR",
        "name": "Klambratún",
        "lat": 64.135752,
        "lon": -21.916084
    },
    "90000217": {
        "code": "AUSTUR4",
        "name": "Austurbrún / Hólsvegur",
        "lat": 64.143991,
        "lon": -21.864578
    },
    "90000459": {
        "code": "MIKLAB1",
        "name": "Sundagarðar",
        "lat": 64.150767,
        "lon": -21.87136
    },
    "90000418": {
        "code": "KORPÚL3",
        "name": "Korpúlfsstaðir",
        "lat": 64.153683,
        "lon": -21.762822
    },
    "20000041": {
        "code": "KEILIR1",
        "name": "Keilir",
        "lat": 63.969351,
        "lon": -22.570984
    },
    "90000419": {
        "code": "KLETTA1",
        "name": "Klettagarðar / Kænugarðar",
        "lat": 64.152093,
        "lon": -21.865259000000002
    },
    "20000042": {
        "code": "KEILISB",
        "name": "Keilisbraut",
        "lat": 63.97147,
        "lon": -22.575254
    },
    "20000045": {
        "code": "BOGABRA",
        "name": "Bogabraut",
        "lat": 63.972781,
        "lon": -22.56637
    },
    "23000002": {
        "code": "LÖGREGL",
        "name": "Lögreglustöðin Grindavík",
        "lat": 63.8394590907833,
        "lon": -22.4378256077291
    },
    "23000001": {
        "code": "GRINDA1",
        "name": "Grindavík - Aðalbraut",
        "lat": 63.843765,
        "lon": -22.435763
    },
    "90000661": {
        "code": "BORGAV4",
        "name": "Borgavegur / Gullengi",
        "lat": 64.145752,
        "lon": -21.783106
    },
    "20000036": {
        "code": "ÁLSVELL",
        "name": "Álsvellir",
        "lat": 64.00289,
        "lon": -22.57961
    },
    "90000420": {
        "code": "BARÐAS1",
        "name": "Barðastaðir",
        "lat": 64.156749,
        "lon": -21.750936
    },
    "90000421": {
        "code": "BREIÐHÖ",
        "name": "Breiðhöfði / Ártún",
        "lat": 64.124564,
        "lon": -21.823576
    },
    "90000422": {
        "code": "GRENSÁ2",
        "name": "Heiðargerði",
        "lat": 64.127855,
        "lon": -21.87691
    },
    "90000423": {
        "code": "GRENSÁ3",
        "name": "Álmgerði",
        "lat": 64.124462,
        "lon": -21.879465
    },
    "90000424": {
        "code": "JAÐARSE",
        "name": "Jaðarsel / Jakasel",
        "lat": 64.096286,
        "lon": -21.827762
    },
    "90000425": {
        "code": "JAÐARS1",
        "name": "Jaðarsel / Jórusel",
        "lat": 64.094853,
        "lon": -21.830761
    },
    "90000426": {
        "code": "JAÐARS2",
        "name": "Jaðarsel / Klyfjasel",
        "lat": 64.092737,
        "lon": -21.836882
    },
    "90000427": {
        "code": "JAÐARS3",
        "name": "Jaðarsel / Melsel",
        "lat": 64.093943,
        "lon": -21.841788
    },
    "90000428": {
        "code": "JAÐARS4",
        "name": "Jaðarsel / Holtasel",
        "lat": 64.096073,
        "lon": -21.845218
    },
    "90000429": {
        "code": "HÓLMASE",
        "name": "Hólmasel",
        "lat": 64.096551,
        "lon": -21.843836
    },
    "20000031": {
        "code": "HÁLEYTI",
        "name": "Háaleitisskóli",
        "lat": 63.96803,
        "lon": -22.589808
    },
    "20000033": {
        "code": "ELDEY",
        "name": "Eldey",
        "lat": 63.967085,
        "lon": -22.581452
    },
    "20000034": {
        "code": "FJÖRHEI",
        "name": "Fjörheimar",
        "lat": 63.973134,
        "lon": -22.580261
    },
    "20000024": {
        "code": "NJARÐV3",
        "name": "Tjarnarhverfi",
        "lat": 63.969848,
        "lon": -22.513746
    },
    "20000025": {
        "code": "NJARÐV2",
        "name": "Tjarnarhverfi",
        "lat": 63.968518,
        "lon": -22.514284
    },
    "90000431": {
        "code": "SKÓGARS",
        "name": "Skógarsel / Stíflusel",
        "lat": 64.098761,
        "lon": -21.852779
    },
    "20000026": {
        "code": "KIRKJU8",
        "name": "Kirkjuvogur",
        "lat": 63.934303,
        "lon": -22.687508
    },
    "90000432": {
        "code": "SKÓGAR1",
        "name": "Skógarsel / Strandasel",
        "lat": 64.100545,
        "lon": -21.857308
    },
    "20000027": {
        "code": "LANDNÁM",
        "name": "Landnámsbærinn",
        "lat": 63.935349,
        "lon": -22.685721
    },
    "90000433": {
        "code": "SKÓGAR2",
        "name": "Íþróttamiðstöð ÍR",
        "lat": 64.102522,
        "lon": -21.85006
    },
    "20000028": {
        "code": "DJÚPIVO",
        "name": "Djúpivogur",
        "lat": 63.933274,
        "lon": -22.682975
    },
    "90000434": {
        "code": "SKÓGAR7",
        "name": "Skógarsel / Árskógar",
        "lat": 64.104422,
        "lon": -21.84403
    },
    "20000029": {
        "code": "SELJAVO",
        "name": "Seljavogur",
        "lat": 63.933638,
        "lon": -22.680521
    },
    "90000435": {
        "code": "GRENSÁ7",
        "name": "Hæðargarður",
        "lat": 64.124772,
        "lon": -21.878778
    },
    "90000436": {
        "code": "JAÐAR11",
        "name": "Jaðarsel / Seljabraut",
        "lat": 64.097732,
        "lon": -21.82784
    },
    "90000437": {
        "code": "GRENSÁ6",
        "name": "Heiðargerði",
        "lat": 64.12789,
        "lon": -21.876432
    },
    "60000027": {
        "code": "KJARNAG",
        "name": "Kjarnagata / Bónus",
        "lat": 65.668767,
        "lon": -18.108311
    },
    "60000024": {
        "code": "KJARNA6",
        "name": "Naustaskóli",
        "lat": 65.665231,
        "lon": -18.101313
    },
    "60000023": {
        "code": "KJARNA2",
        "name": "Naustaskóli",
        "lat": 65.665331,
        "lon": -18.101314
    },
    "60000022": {
        "code": "KJARNA7",
        "name": "Kjarnagata / Sómatún",
        "lat": 65.662609,
        "lon": -18.099091
    },
    "60000021": {
        "code": "KJARNA3",
        "name": "Kjarnagata / Sómatún",
        "lat": 65.662827,
        "lon": -18.099084
    },
    "60000020": {
        "code": "NAUSTA3",
        "name": "Naustagata / Vallartún",
        "lat": 65.661613,
        "lon": -18.094244
    },
    "90000080": {
        "code": "BÚSTAÐ4",
        "name": "Furugerði",
        "lat": 64.123416,
        "lon": -21.883334
    },
    "90000081": {
        "code": "BÚSTAÐ5",
        "name": "Borgarspítalinn",
        "lat": 64.124171,
        "lon": -21.888175
    },
    "14001550": {
        "code": "SUÐURB3",
        "name": "Suðurbraut / Smárabarð",
        "lat": 64.060139,
        "lon": -21.966671
    },
    "90000083": {
        "code": "HÁALEI3",
        "name": "RÚV",
        "lat": 64.125811,
        "lon": -21.888448
    },
    "14001551": {
        "code": "HJALLAB",
        "name": "Hjallabraut / Miðvangur",
        "lat": 64.079562,
        "lon": -21.958359
    },
    "90000084": {
        "code": "HÁALEI1",
        "name": "RÚV",
        "lat": 64.125855,
        "lon": -21.887883
    },
    "14001552": {
        "code": "HJALLA1",
        "name": "Hjallabraut / Víðivangur",
        "lat": 64.079396,
        "lon": -21.962947
    },
    "90000085": {
        "code": "GNOÐAR1",
        "name": "Glæsibær",
        "lat": 64.133969,
        "lon": -21.866965
    },
    "14001553": {
        "code": "HJALLA2",
        "name": "Skjólvangur",
        "lat": 64.077692,
        "lon": -21.966353
    },
    "90000086": {
        "code": "HÁALEI5",
        "name": "Fellsmúli",
        "lat": 64.131416,
        "lon": -21.883033
    },
    "14001554": {
        "code": "FLÓKAGA",
        "name": "Sundhöll Hafnarfjarðar",
        "lat": 64.072793,
        "lon": -21.969544
    },
    "90000087": {
        "code": "HÁALEI6",
        "name": "Miðbær",
        "lat": 64.133428,
        "lon": -21.882668
    },
    "14001555": {
        "code": "VESTURG",
        "name": "Vesturgata / Bungalow",
        "lat": 64.070666,
        "lon": -21.965677
    },
    "90000088": {
        "code": "HÁALEI7",
        "name": "Háaleitisbraut / Múlar",
        "lat": 64.136689,
        "lon": -21.887231
    },
    "14001556": {
        "code": "VESTU13",
        "name": "Vesturgata / Norðurbakki",
        "lat": 64.069819,
        "lon": -21.963072
    },
    "20000134": {
        "code": "HRING19",
        "name": "Hringbraut / Knattspyrnuvöllur",
        "lat": 63.9983712228349,
        "lon": -22.5564066411808
    },
    "90000089": {
        "code": "HÁALEI8",
        "name": "Lágmúli",
        "lat": 64.137863,
        "lon": -21.891022
    },
    "20000135": {
        "code": "HRING20",
        "name": "Hringbraut / Melteigur",
        "lat": 64.006591,
        "lon": -22.565913
    },
    "14001558": {
        "code": "SUÐURB6",
        "name": "Suðurbraut / Hvaleyrarbraut",
        "lat": 64.056582,
        "lon": -21.977544
    },
    "60000019": {
        "code": "NAUSTAB",
        "name": "Naustagata / Vallartún",
        "lat": 65.661674,
        "lon": -18.094439
    },
    "60000015": {
        "code": "NAUSTA2",
        "name": "Naustabraut / Krókeyrarnöf",
        "lat": 65.664222,
        "lon": -18.090241
    },
    "60000013": {
        "code": "ÞÓRUN10",
        "name": "Þórunnarstræti / Lækjargata",
        "lat": 65.668507,
        "lon": -18.095915
    },
    "20000130": {
        "code": "SKÓGARB",
        "name": "Skógarbraut",
        "lat": 63.9714212393106,
        "lon": -22.5515142626318
    },
    "60000012": {
        "code": "ÞÓRUNN9",
        "name": "Þórunnarstræti / Sunnutröð",
        "lat": 65.67051,
        "lon": -18.095514
    },
    "20000131": {
        "code": "SKÓGA17",
        "name": "Skógarbraut",
        "lat": 63.9714333807725,
        "lon": -22.551692682669
    },
    "60000011": {
        "code": "ÞÓRUNN4",
        "name": "Þórunnarstræti / Sjúkrahús",
        "lat": 65.673508,
        "lon": -18.097042
    },
    "20000132": {
        "code": "HRING17",
        "name": "Hringbraut / Melteigur",
        "lat": 64.005568,
        "lon": -22.565461
    },
    "60000010": {
        "code": "ÞÓRUNNA",
        "name": "Þórunnarstræti / Sjúkrahús",
        "lat": 65.673714,
        "lon": -18.096709
    },
    "20000133": {
        "code": "HRING18",
        "name": "Hringbraut / Knattspyrnuvöllur",
        "lat": 63.9983377440799,
        "lon": -22.5565331531079
    },
    "90000090": {
        "code": "HÁTEIG2",
        "name": "Háteigsvegur / Skipholt",
        "lat": 64.137294,
        "lon": -21.898216
    },
    "90000091": {
        "code": "HÁTEIG3",
        "name": "Háteigskirkja",
        "lat": 64.138127,
        "lon": -21.904177
    },
    "90000092": {
        "code": "HÁTEIGS",
        "name": "Háteigsvegur / Langahlíð",
        "lat": 64.138844,
        "lon": -21.909262
    },
    "90000093": {
        "code": "RAUÐARÁ",
        "name": "Rauðarárstígur",
        "lat": 64.140247,
        "lon": -21.915138
    },
    "90000094": {
        "code": "SUÐURG6",
        "name": "Þjóðminjasafnið",
        "lat": 64.142291,
        "lon": -21.949049
    },
    "14001540": {
        "code": "SÓLVANG",
        "name": "Sólvangur",
        "lat": 64.068839,
        "lon": -21.939605
    },
    "14001541": {
        "code": "HRINGB9",
        "name": "Flensborg",
        "lat": 64.064381,
        "lon": -21.947992
    },
    "90000096": {
        "code": "MEISTAR",
        "name": "Meistaravellir / Grandavegur",
        "lat": 64.14791,
        "lon": -21.960201
    },
    "14001542": {
        "code": "HRING12",
        "name": "Flensborg",
        "lat": 64.064357,
        "lon": -21.948489
    },
    "90000097": {
        "code": "MEISTA1",
        "name": "Meistaravellir / Flyðrugrandi",
        "lat": 64.147192,
        "lon": -21.963691
    },
    "14001543": {
        "code": "HRING11",
        "name": "Hlíðarbraut",
        "lat": 64.062707,
        "lon": -21.953896
    },
    "90000098": {
        "code": "KAPLASK",
        "name": "KR",
        "lat": 64.146041,
        "lon": -21.965255
    },
    "14001544": {
        "code": "HRING10",
        "name": "Suðurbæjarlaug",
        "lat": 64.060473,
        "lon": -21.962542
    },
    "90000099": {
        "code": "KAPLAS1",
        "name": "Kaplaskjólsvegur / Ægisíða",
        "lat": 64.144987,
        "lon": -21.969866
    },
    "14001545": {
        "code": "STRAND5",
        "name": "Strandgata / Flensborgartorg",
        "lat": 64.062054,
        "lon": -21.961625
    },
    "14001546": {
        "code": "STRAND6",
        "name": "Strandgata / Fjörukráin",
        "lat": 64.065841,
        "lon": -21.956042
    },
    "14001547": {
        "code": "ÁSVALL2",
        "name": "Ásvallalaug",
        "lat": 64.052061,
        "lon": -21.974783
    },
    "20000125": {
        "code": "VIRKJUN",
        "name": "Virkjun",
        "lat": 63.971673,
        "lon": -22.583785
    },
    "60000009": {
        "code": "ÞÓRUNN3",
        "name": "Þórunnarstræti / Hlíð",
        "lat": 65.675047,
        "lon": -18.097684
    },
    "20000128": {
        "code": "BOGABR1",
        "name": "Bogabraut",
        "lat": 63.9722,
        "lon": -22.565779
    },
    "20000129": {
        "code": "NJARÐV4",
        "name": "Grænásbraut",
        "lat": 63.975459,
        "lon": -22.565537
    },
    "60000007": {
        "code": "ÞÓRUNN1",
        "name": "Þórunnarstræti / MA",
        "lat": 65.676412,
        "lon": -18.098052
    },
    "60000001": {
        "code": "MIÐBÆR",
        "name": "Miðbær",
        "lat": 65.683053,
        "lon": -18.09
    },
    "14001580": {
        "code": "HRINGB8",
        "name": "Jófríðarstaðavegur",
        "lat": 64.062611,
        "lon": -21.953708
    },
    "14001570": {
        "code": "MIKLAHO",
        "name": "Miklaholt",
        "lat": 64.059531,
        "lon": -21.986919
    },
    "87190005": {
        "code": "ÞÓRODD1",
        "name": "Þóroddsstaðir",
        "lat": 64.119199,
        "lon": -20.708822
    },
    "90000061": {
        "code": "MÝRARG1",
        "name": "Mýrargata",
        "lat": 64.151683,
        "lon": -21.949006
    },
    "90000062": {
        "code": "GRANDA2",
        "name": "Grandagarður",
        "lat": 64.153109,
        "lon": -21.949784
    },
    "87190003": {
        "code": "ÞRASTAR",
        "name": "Þrastarlundur",
        "lat": 64.01444,
        "lon": -20.949087
    },
    "90000063": {
        "code": "GRUNNSL",
        "name": "Grunnslóð",
        "lat": 64.154464,
        "lon": -21.947669
    },
    "87190004": {
        "code": "ÞÓRODDS",
        "name": "Þóroddsstaðir",
        "lat": 64.119065,
        "lon": -20.708499
    },
    "90000064": {
        "code": "FISKISL",
        "name": "Fiskislóð",
        "lat": 64.155849,
        "lon": -21.945205
    },
    "87190001": {
        "code": "BORG Í",
        "name": "Borg í Grímsnesi",
        "lat": 64.0746664731188,
        "lon": -20.7643082216857
    },
    "14001577": {
        "code": "FJARÐA1",
        "name": "Fjarðarkaup",
        "lat": 64.081496,
        "lon": -21.938211
    },
    "90000068": {
        "code": "STEKKJA",
        "name": "Stekkjarbakki",
        "lat": 64.107755,
        "lon": -21.841087
    },
    "90000069": {
        "code": "ARNARBA",
        "name": "Arnarbakki",
        "lat": 64.104746,
        "lon": -21.835345
    },
    "20000116": {
        "code": "STAPAGA",
        "name": "Beykidalur",
        "lat": 63.968528,
        "lon": -22.490686
    },
    "20000117": {
        "code": "STAPAG1",
        "name": "Engjadalur",
        "lat": 63.96928,
        "lon": -22.500377
    },
    "20000118": {
        "code": "AKURSK1",
        "name": "Akurskóli",
        "lat": 63.974507,
        "lon": -22.512817
    },
    "36091906": {
        "code": "BAULA",
        "name": "Baula",
        "lat": 64.674734,
        "lon": -21.666195
    },
    "36091907": {
        "code": "ÍÞRÓTT1",
        "name": "Íþróttamiðstöðin",
        "lat": 64.5402084852402,
        "lon": -21.921574032679
    },
    "20000110": {
        "code": "FLE - B",
        "name": "KEF - Airport (Departures)",
        "lat": 63.9970686450498,
        "lon": -22.6248948165054
    },
    "36091904": {
        "code": "REYKHO1",
        "name": "Reykholt",
        "lat": 64.664498,
        "lon": -21.294091
    },
    "20000111": {
        "code": "FLE - K",
        "name": "KEF - Airport (Arrivals)",
        "lat": 63.997109,
        "lon": -22.619764
    },
    "36091902": {
        "code": "HVANNEY",
        "name": "Hvanneyri",
        "lat": 64.563512,
        "lon": -21.760036
    },
    "36091903": {
        "code": "KLEPPSJ",
        "name": "Kleppjárnsreykir",
        "lat": 64.655831,
        "lon": -21.403658
    },
    "36091900": {
        "code": "HYRNAN",
        "name": "Borgarnes",
        "lat": 64.54366,
        "lon": -21.911567
    },
    "36091901": {
        "code": "BIFRÖST",
        "name": "Bifröst",
        "lat": 64.766313,
        "lon": -21.552072
    },
    "90000071": {
        "code": "RANGÁRS",
        "name": "Rangársel",
        "lat": 64.098158,
        "lon": -21.84683
    },
    "14001561": {
        "code": "LÆKJAR2",
        "name": "Lækjargata",
        "lat": 64.067288,
        "lon": -21.947194
    },
    "90000072": {
        "code": "RANGÁR1",
        "name": "Rangársel",
        "lat": 64.098068,
        "lon": -21.846626
    },
    "14001562": {
        "code": "SUÐURB5",
        "name": "Suðurbraut / Melabraut",
        "lat": 64.058801,
        "lon": -21.971656
    },
    "90000073": {
        "code": "ARNARB4",
        "name": "Eyjabakki",
        "lat": 64.110278,
        "lon": -21.828902
    },
    "14001563": {
        "code": "HVALEY1",
        "name": "Kaldárselsvegur",
        "lat": 64.058817,
        "lon": -21.939937
    },
    "90000074": {
        "code": "ARNARB5",
        "name": "Dvergabakki",
        "lat": 64.110315,
        "lon": -21.834713
    },
    "14001564": {
        "code": "KALDÁR2",
        "name": "Kaldárselsvegur",
        "lat": 64.058904,
        "lon": -21.940189
    },
    "90000075": {
        "code": "MJÓDD",
        "name": "Mjódd",
        "lat": 64.109702,
        "lon": -21.842643
    },
    "90000076": {
        "code": "BÚSTAÐ9",
        "name": "Víkin",
        "lat": 64.120518,
        "lon": -21.854944
    },
    "90000077": {
        "code": "BÚSTA10",
        "name": "Bústaðakirkja",
        "lat": 64.120819,
        "lon": -21.860312
    },
    "14001567": {
        "code": "HÁHOLT2",
        "name": "Háholt / Akurholt",
        "lat": 64.055659,
        "lon": -21.979984
    },
    "20000101": {
        "code": "HEIÐARS",
        "name": "Heiðarskóli",
        "lat": 64.006563,
        "lon": -22.575019
    },
    "90000078": {
        "code": "BÚSTA11",
        "name": "Ásgarður Fossvogi",
        "lat": 64.121407,
        "lon": -21.865543
    },
    "14001568": {
        "code": "HÁHOLT3",
        "name": "Háholt / Bæjarholt",
        "lat": 64.05701,
        "lon": -21.982707
    },
    "90000079": {
        "code": "BÚSTA12",
        "name": "Grímsbær",
        "lat": 64.122632,
        "lon": -21.876022
    },
    "14001569": {
        "code": "HÁHOLT4",
        "name": "Háholt / Hörgsholt",
        "lat": 64.057772,
        "lon": -21.98542
    },
    "20000103": {
        "code": "HAFNARG",
        "name": "Hafnargata",
        "lat": 63.999651,
        "lon": -22.549994
    },
    "60000069": {
        "code": "GLERÁRG",
        "name": "Glerárgata / Eiðsvallagata",
        "lat": 65.685509,
        "lon": -18.091164
    },
    "60000068": {
        "code": "MIÐHÚS2",
        "name": "Miðhúsabraut",
        "lat": 65.661222,
        "lon": -18.08483
    },
    "60000067": {
        "code": "MIÐHÚSA",
        "name": "Miðhúsabraut",
        "lat": 65.661629,
        "lon": -18.084111
    },
    "60000066": {
        "code": "MIÐHÚS1",
        "name": "Skautahöll",
        "lat": 65.664067,
        "lon": -18.083244
    },
    "60000065": {
        "code": "MIÐHÚS3",
        "name": "Skautahöll",
        "lat": 65.664106,
        "lon": -18.082991
    },
    "20000100": {
        "code": "VESTU40",
        "name": "Heiðargarður",
        "lat": 64.004759,
        "lon": -22.57717
    },
    "60000064": {
        "code": "AÐALST2",
        "name": "Aðalstræti / Minjasafn",
        "lat": 65.666535,
        "lon": -18.084775
    },
    "60000063": {
        "code": "AÐALSTR",
        "name": "Aðalstræti / Minjasafn",
        "lat": 65.666318,
        "lon": -18.084971
    },
    "60000062": {
        "code": "AÐALST1",
        "name": "Aðalstræti / Duggufjara",
        "lat": 65.669451,
        "lon": -18.086216
    },
    "60000061": {
        "code": "AÐALST3",
        "name": "Aðalstræti / Duggufjara",
        "lat": 65.668997,
        "lon": -18.085852
    },
    "90000280": {
        "code": "EIÐISG1",
        "name": "Boðagrandi",
        "lat": 64.149894,
        "lon": -21.967355
    },
    "90000281": {
        "code": "HRINGB6",
        "name": "JL húsið",
        "lat": 64.150306,
        "lon": -21.959982
    },
    "90000040": {
        "code": "SKEIÐA6",
        "name": "Nökkvavogur",
        "lat": 64.132949,
        "lon": -21.85522
    },
    "90000282": {
        "code": "LANGAH5",
        "name": "Flókagata",
        "lat": 64.137408,
        "lon": -21.908803
    },
    "90000041": {
        "code": "SKEIÐA2",
        "name": "Glæsibær",
        "lat": 64.133503,
        "lon": -21.869105
    },
    "90000283": {
        "code": "LANGAH4",
        "name": "Langahlíð",
        "lat": 64.135505,
        "lon": -21.910372
    },
    "90000042": {
        "code": "SKEIÐA3",
        "name": "Glæsibær",
        "lat": 64.132639,
        "lon": -21.868289
    },
    "90000284": {
        "code": "LANGAH3",
        "name": "Langahlíð / Mávahlíð",
        "lat": 64.133426,
        "lon": -21.911883
    },
    "90000285": {
        "code": "HAMRAH1",
        "name": "Menntaskólinn við Hamrahlíð / MH",
        "lat": 64.131194,
        "lon": -21.90699
    },
    "90000044": {
        "code": "GNOÐARV",
        "name": "Gnoðarvogur / Ljósheimar",
        "lat": 64.13203,
        "lon": -21.863387
    },
    "90000286": {
        "code": "HAMRAH2",
        "name": "Hamrahlíð",
        "lat": 64.130705,
        "lon": -21.901821
    },
    "14001512": {
        "code": "HJALL10",
        "name": "Hjallabraut / Laufvangur",
        "lat": 64.078802,
        "lon": -21.954223
    },
    "90000045": {
        "code": "GNOÐAR3",
        "name": "Glæsibær",
        "lat": 64.133901,
        "lon": -21.867151
    },
    "90000287": {
        "code": "LISTAB1",
        "name": "Verzló",
        "lat": 64.128162,
        "lon": -21.895203
    },
    "14001513": {
        "code": "FLATAH7",
        "name": "Flatahraun / Sléttahraun",
        "lat": 64.075161,
        "lon": -21.950128
    },
    "90000046": {
        "code": "SUÐURL3",
        "name": "Orkuhúsið",
        "lat": 64.136435,
        "lon": -21.874203
    },
    "90000288": {
        "code": "HÁALEI4",
        "name": "Austurver",
        "lat": 64.12895,
        "lon": -21.885133
    },
    "14001514": {
        "code": "IÐNSKÓL",
        "name": "Iðnskólinn",
        "lat": 64.075418,
        "lon": -21.94595
    },
    "90000047": {
        "code": "SUÐURL4",
        "name": "Laugardalshöll",
        "lat": 64.139196,
        "lon": -21.879543
    },
    "90000289": {
        "code": "ÞÚSÖLD1",
        "name": "Þúsöld",
        "lat": 64.128637,
        "lon": -21.767074
    },
    "14001515": {
        "code": "KAPLAKR",
        "name": "Kaplakriki",
        "lat": 64.075421,
        "lon": -21.936658
    },
    "90000048": {
        "code": "SUÐURL5",
        "name": "Nordica",
        "lat": 64.140317,
        "lon": -21.889824
    },
    "14001516": {
        "code": "HAMRABE",
        "name": "Hamraberg / Víðiberg",
        "lat": 64.073995,
        "lon": -21.932517
    },
    "90000049": {
        "code": "LAUGAV2",
        "name": "Hátún",
        "lat": 64.141195,
        "lon": -21.898187
    },
    "14001517": {
        "code": "HAMRAB4",
        "name": "Hamraberg / Lyngberg",
        "lat": 64.073107,
        "lon": -21.934333
    },
    "14001518": {
        "code": "HAMRAB5",
        "name": "Hamraberg / Hnotuberg",
        "lat": 64.071659,
        "lon": -21.936371
    },
    "14001519": {
        "code": "HAMRAB6",
        "name": "Hamraberg / Einiberg",
        "lat": 64.068279,
        "lon": -21.935925
    },
    "60000057": {
        "code": "DROTTNI",
        "name": "Drottningarbraut",
        "lat": 65.680149,
        "lon": -18.087338
    },
    "60000056": {
        "code": "GLERÁR4",
        "name": "Glerárgata / Þórunnarstræti",
        "lat": 65.687484,
        "lon": -18.098031
    },
    "60000055": {
        "code": "ÞÓRUN12",
        "name": "Þórunnarstræti / Lögreglustöð",
        "lat": 65.685086,
        "lon": -18.100399
    },
    "56110001": {
        "code": "SKAGAST",
        "name": "Skagaströnd",
        "lat": 65.8242363570201,
        "lon": -20.300123841206
    },
    "60000054": {
        "code": "ÞÓRUNN7",
        "name": "Þórunnarstræti / Lögreglustöð",
        "lat": 65.684553,
        "lon": -18.100572
    },
    "60000053": {
        "code": "ÞÓRUN11",
        "name": "Þórunnarstrætí / Hamarstígur",
        "lat": 65.681825,
        "lon": -18.100031
    },
    "60000052": {
        "code": "ÞÓRUNN8",
        "name": "Þórunnarstræti / Hamarstígur",
        "lat": 65.681587,
        "lon": -18.100242
    },
    "37090001": {
        "code": "GRUNDAR",
        "name": "Grundarfjörður",
        "lat": 64.925097,
        "lon": -23.260496
    },
    "90000290": {
        "code": "KRISTN5",
        "name": "Kristnibraut / Maríubaugur",
        "lat": 64.127098,
        "lon": -21.765627
    },
    "90000291": {
        "code": "BAKKAS1",
        "name": "Kelduskóli / Korpa",
        "lat": 64.157483,
        "lon": -21.755442
    },
    "90000050": {
        "code": "LAUGAV3",
        "name": "Fíladelfía",
        "lat": 64.142926,
        "lon": -21.907164
    },
    "90000292": {
        "code": "SNORRAB",
        "name": "Snorrabraut",
        "lat": 64.138482,
        "lon": -21.921249
    },
    "90000051": {
        "code": "KLETTAG",
        "name": "Klettagarðar / Skarfagarðar",
        "lat": 64.153716,
        "lon": -21.869696
    },
    "90000293": {
        "code": "ÞÚSÖLD2",
        "name": "Þúsöld / Húsasmiðjan",
        "lat": 64.130265,
        "lon": -21.762504
    },
    "90000052": {
        "code": "HVERFIS",
        "name": "Barónsstígur",
        "lat": 64.144475,
        "lon": -21.918978
    },
    "90000294": {
        "code": "ÞÚSÖLD3",
        "name": "Þúsöld / Húsasmiðjan",
        "lat": 64.130176,
        "lon": -21.762267
    },
    "90000295": {
        "code": "HLEMMUR",
        "name": "Hlemmur",
        "lat": 64.143253,
        "lon": -21.914211
    },
    "90000054": {
        "code": "HVERFI2",
        "name": "Þjóðleikhúsið",
        "lat": 64.146842,
        "lon": -21.930941
    },
    "90000296": {
        "code": "HRINGBR",
        "name": "Háskóli Íslands",
        "lat": 64.141782,
        "lon": -21.946535
    },
    "14001500": {
        "code": "FJÖRÐUR",
        "name": "Fjörður",
        "lat": 64.067849,
        "lon": -21.957284
    },
    "90000055": {
        "code": "LÆKJAR5",
        "name": "Lækjartorg",
        "lat": 64.147465,
        "lon": -21.936231
    },
    "90000297": {
        "code": "HRINGB1",
        "name": "BSÍ",
        "lat": 64.138249,
        "lon": -21.93294
    },
    "14001501": {
        "code": "REYKJA4",
        "name": "Sjónarhóll",
        "lat": 64.072042,
        "lon": -21.95451
    },
    "90000056": {
        "code": "VONARST",
        "name": "Ráðhúsið",
        "lat": 64.14656,
        "lon": -21.942414
    },
    "90000298": {
        "code": "HRINGB2",
        "name": "Landspítalinn",
        "lat": 64.137377,
        "lon": -21.927222
    },
    "14001502": {
        "code": "REYKJA5",
        "name": "Hraunbrún",
        "lat": 64.075941,
        "lon": -21.951317
    },
    "90000057": {
        "code": "VONARS1",
        "name": "Ráðhúsið",
        "lat": 64.146262,
        "lon": -21.941607
    },
    "14001503": {
        "code": "REYKJA6",
        "name": "Stakkahraun",
        "lat": 64.079737,
        "lon": -21.948809
    },
    "14001504": {
        "code": "HJALLA7",
        "name": "Hjallabraut / Hraunbrún",
        "lat": 64.072402,
        "lon": -21.966206
    },
    "14001505": {
        "code": "HJALLA8",
        "name": "Hjallabraut / Skátaheimilið",
        "lat": 64.075421,
        "lon": -21.966105
    },
    "14001506": {
        "code": "HJALLA9",
        "name": "Hjallabraut / Skjólvangur",
        "lat": 64.077295,
        "lon": -21.965835
    },
    "60000045": {
        "code": "ÞINGVA1",
        "name": "Þingvallastræti / Dalsbraut",
        "lat": 65.678355,
        "lon": -18.112794
    },
    "60000043": {
        "code": "ÞINGVA4",
        "name": "Þingvallastræti / Grundargerði",
        "lat": 65.678023,
        "lon": -18.119331
    },
    "60000042": {
        "code": "ÞINGVA2",
        "name": "Þingvallastræti / Hrísalundur",
        "lat": 65.67796,
        "lon": -18.118367
    },
    "60000041": {
        "code": "SKÓGARL",
        "name": "Skógarlundur / Furulundur",
        "lat": 65.676092,
        "lon": -18.122203
    },
    "60000040": {
        "code": "SKÓGA15",
        "name": "Skógarlundur / Hrísalundur",
        "lat": 65.676372,
        "lon": -18.122134
    },
    "90000260": {
        "code": "STRAUMU",
        "name": "Straumur / Nethylur",
        "lat": 64.122248,
        "lon": -21.814985
    },
    "14001530": {
        "code": "VESTU15",
        "name": "Vesturgata / Norðurbakki",
        "lat": 64.069946,
        "lon": -21.963411
    },
    "90000261": {
        "code": "STRAUM2",
        "name": "Straumur / Birtingakvísl",
        "lat": 64.123417,
        "lon": -21.822096
    },
    "14001531": {
        "code": "VESTU14",
        "name": "Vesturgata / Bungalow",
        "lat": 64.070682,
        "lon": -21.965226
    },
    "90000020": {
        "code": "GRANDAG",
        "name": "Grandi",
        "lat": 64.155814,
        "lon": -21.941402
    },
    "90000262": {
        "code": "GULLIN1",
        "name": "Gullinbrú",
        "lat": 64.132432,
        "lon": -21.814488
    },
    "14001532": {
        "code": "FLÓKAG1",
        "name": "Sundhöll Hafnarfjarðar",
        "lat": 64.072826,
        "lon": -21.969367
    },
    "90000021": {
        "code": "GRANDA1",
        "name": "Grandagarður",
        "lat": 64.153043,
        "lon": -21.95107
    },
    "90000263": {
        "code": "FLÓKAG2",
        "name": "Kjarvalsstaðir",
        "lat": 64.138357,
        "lon": -21.912098
    },
    "14001533": {
        "code": "HJALLA6",
        "name": "Skjólvangur",
        "lat": 64.077608,
        "lon": -21.966409
    },
    "90000022": {
        "code": "MÝRARGA",
        "name": "Mýrargata",
        "lat": 64.151381,
        "lon": -21.948571
    },
    "90000264": {
        "code": "KRISTN4",
        "name": "Ingunnarskóli",
        "lat": 64.126645,
        "lon": -21.757383
    },
    "14001534": {
        "code": "HRAFNIS",
        "name": "Hrafnista",
        "lat": 64.07914,
        "lon": -21.971701
    },
    "90000265": {
        "code": "KRISTN3",
        "name": "Kristnibraut / Prestastígur",
        "lat": 64.126738,
        "lon": -21.750591
    },
    "14001535": {
        "code": "HJALLA5",
        "name": "Hjallabraut / Víðivangur",
        "lat": 64.078842,
        "lon": -21.963587
    },
    "90000266": {
        "code": "GVENDA1",
        "name": "Gvendargeisli / Þórðarsveigur",
        "lat": 64.126209,
        "lon": -21.743942
    },
    "14001536": {
        "code": "HJALLA4",
        "name": "Hjallabraut / Miðvangur",
        "lat": 64.07927,
        "lon": -21.958053
    },
    "90000267": {
        "code": "HÁALEI9",
        "name": "Austurver",
        "lat": 64.127986,
        "lon": -21.886471
    },
    "14001537": {
        "code": "HJALLA3",
        "name": "Hjallahraun",
        "lat": 64.078033,
        "lon": -21.947396
    },
    "90000268": {
        "code": "LISTABR",
        "name": "Borgarleikhús",
        "lat": 64.128443,
        "lon": -21.895755
    },
    "14001538": {
        "code": "ÁLFASKE",
        "name": "Mávahraun",
        "lat": 64.074825,
        "lon": -21.9424
    },
    "90000269": {
        "code": "GVENDA3",
        "name": "Gvendargeisli / Sæmundarsel",
        "lat": 64.125863,
        "lon": -21.739942
    },
    "14001539": {
        "code": "ÁLFASK1",
        "name": "Álfaskeið",
        "lat": 64.071306,
        "lon": -21.941305
    },
    "90000029": {
        "code": "KLETTA2",
        "name": "Klettagarðar / Skarfagarðar",
        "lat": 64.153822,
        "lon": -21.869633
    },
    "60000039": {
        "code": "SKÓGAR8",
        "name": "Skógarlundur / Hjallalundur",
        "lat": 65.673827,
        "lon": -18.118833
    },
    "60000038": {
        "code": "SKÓGA14",
        "name": "Skógarlundur / Hjallalundur",
        "lat": 65.674142,
        "lon": -18.119973
    },
    "60000037": {
        "code": "SKÓGA13",
        "name": "Skógarlundur / Hlíðarlundur",
        "lat": 65.673676,
        "lon": -18.115512
    },
    "60000035": {
        "code": "Ä",
        "name": "Skógarlundur / Birkilundur",
        "lat": 65.6743,
        "lon": -18.1074
    },
    "60000032": {
        "code": "VERKME1",
        "name": "Mýrarvegur / Verkmenntaskóli",
        "lat": 65.672619,
        "lon": -18.104441
    },
    "60000031": {
        "code": "VERKME2",
        "name": "Mýrarvegur / Verkmenntaskóli",
        "lat": 65.671948,
        "lon": -18.104293
    },
    "60000030": {
        "code": "MÝRARV4",
        "name": "Mýrarvegur / Hringteigur",
        "lat": 65.669739,
        "lon": -18.101614
    },
    "90000270": {
        "code": "HAMRAHL",
        "name": "Menntaskólinn við Hamrahlíð / MH",
        "lat": 64.131308,
        "lon": -21.907268
    },
    "90000271": {
        "code": "LANGAHL",
        "name": "Langahlíð / Mávahlíð",
        "lat": 64.133428,
        "lon": -21.911563
    },
    "90000030": {
        "code": "LAUGAVE",
        "name": "Þjóðskjalasafnið",
        "lat": 64.142627,
        "lon": -21.90634
    },
    "90000272": {
        "code": "LANGAH1",
        "name": "Langahlíð",
        "lat": 64.135537,
        "lon": -21.90984
    },
    "14001520": {
        "code": "LÆKJARS",
        "name": "Lækjarskóli",
        "lat": 64.067521,
        "lon": -21.939938
    },
    "90000031": {
        "code": "LAUGAV1",
        "name": "Gamla sjónvarpshúsið",
        "lat": 64.140661,
        "lon": -21.896676
    },
    "90000273": {
        "code": "LANGAH2",
        "name": "Flókagata",
        "lat": 64.137356,
        "lon": -21.908407
    },
    "14001521": {
        "code": "SELVOGS",
        "name": "Selvogsgata",
        "lat": 64.06374,
        "lon": -21.946437
    },
    "90000032": {
        "code": "SUÐURLA",
        "name": "Nordica",
        "lat": 64.140142,
        "lon": -21.887948
    },
    "90000274": {
        "code": "NESHAGI",
        "name": "Melaskóli",
        "lat": 64.142334,
        "lon": -21.958472
    },
    "14001522": {
        "code": "ÖLDUTÚN",
        "name": "Öldutúnsskóli",
        "lat": 64.062594,
        "lon": -21.944402
    },
    "90000033": {
        "code": "SUÐURL1",
        "name": "Laugardalshöll",
        "lat": 64.138023,
        "lon": -21.87757
    },
    "90000275": {
        "code": "ÆGISSÍÐ",
        "name": "Ægisíða / Hofsvallagata",
        "lat": 64.143521,
        "lon": -21.966996
    },
    "14001523": {
        "code": "KALDÁR3",
        "name": "Kaldárselsvegur / Dalsás",
        "lat": 64.057965,
        "lon": -21.934665
    },
    "90000034": {
        "code": "SUÐURL2",
        "name": "Orkuhúsið",
        "lat": 64.135553,
        "lon": -21.873334
    },
    "90000276": {
        "code": "NESVEGU",
        "name": "Kaplaskjól",
        "lat": 64.144942,
        "lon": -21.97167
    },
    "14001524": {
        "code": "BREKKUÁ",
        "name": "Brekkuás",
        "lat": 64.054817,
        "lon": -21.93035
    },
    "90000277": {
        "code": "EIÐISGR",
        "name": "Öldugrandi",
        "lat": 64.150563,
        "lon": -21.981538
    },
    "14001525": {
        "code": "GOÐATOR",
        "name": "Goðatorg",
        "lat": 64.057963,
        "lon": -21.949083
    },
    "90000036": {
        "code": "KRINGL5",
        "name": "Teigar",
        "lat": 64.144585,
        "lon": -21.892053
    },
    "90000278": {
        "code": "EIÐISG3",
        "name": "Seilugrandi",
        "lat": 64.149861,
        "lon": -21.976382
    },
    "14001526": {
        "code": "REYKJA1",
        "name": "Hjallabraut",
        "lat": 64.079085,
        "lon": -21.94997
    },
    "90000037": {
        "code": "KRINGL6",
        "name": "Tún",
        "lat": 64.143826,
        "lon": -21.892754
    },
    "90000279": {
        "code": "EIÐISG2",
        "name": "Keilugrandi",
        "lat": 64.149581,
        "lon": -21.971682
    },
    "14001527": {
        "code": "REYKJA2",
        "name": "Hraunbrún",
        "lat": 64.074785,
        "lon": -21.952547
    },
    "90000038": {
        "code": "SKEIÐAR",
        "name": "Fen",
        "lat": 64.129481,
        "lon": -21.863616
    },
    "14001528": {
        "code": "REYKJA3",
        "name": "Hellisgerði",
        "lat": 64.071812,
        "lon": -21.955183
    },
    "90000039": {
        "code": "SKEIÐA1",
        "name": "Mörkin",
        "lat": 64.129537,
        "lon": -21.863101
    },
    "14001529": {
        "code": "VESTU37",
        "name": "Vesturgata / Pakkhúsið",
        "lat": 64.069953,
        "lon": -21.960135
    },
    "60000029": {
        "code": "MÝRARV2",
        "name": "Mýrarvegur / Hringteigur",
        "lat": 65.669796,
        "lon": -18.101431
    },
    "60000028": {
        "code": "KJARNA4",
        "name": "Kjarnagata / Ásatún",
        "lat": 65.668827,
        "lon": -18.108455
    },
    "11000109": {
        "code": "NORÐU17",
        "name": "Norðurströnd / Fornaströnd",
        "lat": 64.154798,
        "lon": -21.986627
    },
    "11000108": {
        "code": "NORÐU15",
        "name": "Norðurströnd / Bollagarðar",
        "lat": 64.157636,
        "lon": -21.99257
    },
    "11000107": {
        "code": "LINDAR5",
        "name": "Lindarbraut / Hofgarðar",
        "lat": 64.15764,
        "lon": -22.001297
    },
    "11000106": {
        "code": "LINDAR4",
        "name": "Lindarbraut / Hæðarbraut",
        "lat": 64.155473,
        "lon": -22.003511
    },
    "11000105": {
        "code": "SUÐURS7",
        "name": "Suðurströnd / Miðbraut",
        "lat": 64.153259,
        "lon": -22.004812
    },
    "11000104": {
        "code": "SUÐURS6",
        "name": "Suðurströnd / Bakkavör",
        "lat": 64.151323,
        "lon": -22.002626
    },
    "11000103": {
        "code": "SUÐURS5",
        "name": "Íþróttamiðstöð Seltjarnarness",
        "lat": 64.149908,
        "lon": -21.992431
    },
    "11000102": {
        "code": "SUÐURS4",
        "name": "Eiðistorg",
        "lat": 64.150701,
        "lon": -21.987077
    },
    "11000101": {
        "code": "NESVEG8",
        "name": "Nesvegur / Skerjabraut",
        "lat": 64.148336,
        "lon": -21.98321
    },
    "11000100": {
        "code": "NESVEG7",
        "name": "Grænamýri",
        "lat": 64.146191,
        "lon": -21.977659
    },
    "62500004": {
        "code": "SIGLUF2",
        "name": "Siglufjörður - Snorragata suður",
        "lat": 66.141952,
        "lon": -18.915041
    },
    "62500003": {
        "code": "SIGLUF1",
        "name": "Siglufjörður - Snorragata suður",
        "lat": 66.142078,
        "lon": -18.915306
    },
    "62500002": {
        "code": "SIGLUFJ",
        "name": "Siglufjörður - Olís",
        "lat": 66.149834,
        "lon": -18.903148
    },
    "62500001": {
        "code": "ÓLAFSFJ",
        "name": "Ólafsfjörður - Aðalgata",
        "lat": 66.07082,
        "lon": -18.655939
    },
    "62500007": {
        "code": "ÓLAFSF1",
        "name": "Ólafsfjörður - Múlavegur",
        "lat": 66.074606,
        "lon": -18.642297
    },
    "62500006": {
        "code": "ÓLAFSF3",
        "name": "Ólafsfjörður - Múlavegur",
        "lat": 66.074536,
        "lon": -18.642085
    },
    "62500005": {
        "code": "ÓLAFSF2",
        "name": "Ólafsfjörður - Aðalgata",
        "lat": 66.070939,
        "lon": -18.657531
    },
    "13001504": {
        "code": "REYKJA7",
        "name": "Hraunsholt",
        "lat": 64.086284,
        "lon": -21.937748
    },
    "13001506": {
        "code": "HAFNAR4",
        "name": "Silfurtún",
        "lat": 64.095163,
        "lon": -21.922373
    },
    "13001507": {
        "code": "HAFNAR5",
        "name": "Arnarneshæð",
        "lat": 64.099366,
        "lon": -21.914992
    },
    "70007101": {
        "code": "SEYÐIS1",
        "name": "Seyðisfjörður / Herðubreið",
        "lat": 65.2601,
        "lon": -14.0067
    },
    "25060003": {
        "code": "VOGAR",
        "name": "Vogar - Gamla pósthúsið",
        "lat": 63.982788,
        "lon": -22.379973
    },
    "25060005": {
        "code": "VOGAAF1",
        "name": "Vogaafleggjari",
        "lat": 63.9736092996408,
        "lon": -22.3576843410923
    },
    "25060001": {
        "code": "GRINDAV",
        "name": "Grindavíkurafleggjari",
        "lat": 63.96244,
        "lon": -22.42051
    },
    "25060002": {
        "code": "VOGAAFL",
        "name": "Vogaafleggjari",
        "lat": 63.975115,
        "lon": -22.359635
    },
    "52000001": {
        "code": "SAUÐÁRK",
        "name": "Sauðárkrókur - N1",
        "lat": 65.740862,
        "lon": -19.637706
    },
    "52000002": {
        "code": "VARMAHL",
        "name": "Varmahlíð",
        "lat": 65.553491,
        "lon": -19.446279
    },
    "10000893": {
        "code": "LINDARV",
        "name": "Hlíðarvegur / Vogatunga",
        "lat": 64.107808,
        "lon": -21.901346
    },
    "10000892": {
        "code": "FITJALI",
        "name": "Hlíðarvegur / Grænatunga",
        "lat": 64.108302,
        "lon": -21.895524
    },
    "10000895": {
        "code": "SKÁLAH1",
        "name": "Hlíðarhjalli / Brekkuhjalli",
        "lat": 64.107587,
        "lon": -21.879616
    },
    "10000894": {
        "code": "HLÍÐAR9",
        "name": "Hlíðarvegur / Hrauntunga",
        "lat": 64.108752,
        "lon": -21.890088
    },
    "52000003": {
        "code": "HOFSÓS",
        "name": "Hofsós",
        "lat": 65.8972428027096,
        "lon": -19.4128769310479
    },
    "52000004": {
        "code": "HÓLAR",
        "name": "Hólar",
        "lat": 65.7328344508586,
        "lon": -19.1120048033639
    },
    "13001339": {
        "code": "VÍFILS3",
        "name": "Vífilsstaðavegur / Asparlundur",
        "lat": 64.084172,
        "lon": -21.902866
    },
    "90000515": {
        "code": "JAÐARS7",
        "name": "Jaðarsel / Klyfjasel",
        "lat": 64.092906,
        "lon": -21.836071
    },
    "90000757": {
        "code": "GRJÓTH1",
        "name": "Hálsabraut / Grjótháls",
        "lat": 64.123163,
        "lon": -21.797097
    },
    "90000516": {
        "code": "JAÐARS8",
        "name": "Jaðarsel / Kaldasel",
        "lat": 64.094552,
        "lon": -21.831356
    },
    "90000758": {
        "code": "GRJÓTH3",
        "name": "Hálsabraut / Grjótháls",
        "lat": 64.123374,
        "lon": -21.796756
    },
    "13001337": {
        "code": "VÍFILST",
        "name": "Vífilsstaðavegur / Markarflöt",
        "lat": 64.084208,
        "lon": -21.904143
    },
    "75097201": {
        "code": "BORGARF",
        "name": "Borgarfjörður / Fjarðarborg",
        "lat": 65.5274,
        "lon": -13.8172
    },
    "90000517": {
        "code": "JAÐARS9",
        "name": "Jaðarsel / Jakasel",
        "lat": 64.09639,
        "lon": -21.827377
    },
    "90000759": {
        "code": "GRJÓTH2",
        "name": "Grjótháls / Bitruháls",
        "lat": 64.123692,
        "lon": -21.803101
    },
    "13001338": {
        "code": "VÍFILS1",
        "name": "Vífilsstaðir",
        "lat": 64.082296,
        "lon": -21.890236
    },
    "90000518": {
        "code": "VÍKURV2",
        "name": "Egilshöll",
        "lat": 64.148161,
        "lon": -21.772222
    },
    "90000519": {
        "code": "BORGAV3",
        "name": "Víkurvegur / Borgavegur",
        "lat": 64.145171,
        "lon": -21.774141
    },
    "13001330": {
        "code": "VÍFIL10",
        "name": "Vífilsstaðavegur / Sjáland",
        "lat": 64.091666,
        "lon": -21.942918
    },
    "13001335": {
        "code": "VÍFILS7",
        "name": "Vídalínskirkja",
        "lat": 64.086336,
        "lon": -21.915694
    },
    "13001336": {
        "code": "VÍFILS5",
        "name": "Vífilsstaðavegur / Sjávargrund",
        "lat": 64.092021,
        "lon": -21.929626
    },
    "13001333": {
        "code": "VÍFILS6",
        "name": "Vífilsstaðavegur / Sjáland",
        "lat": 64.09182,
        "lon": -21.942956
    },
    "13001334": {
        "code": "VÍFILS8",
        "name": "Garðatorg",
        "lat": 64.088165,
        "lon": -21.921699
    },
    "90000760": {
        "code": "BITRUH1",
        "name": "Bitruháls",
        "lat": 64.12195,
        "lon": -21.806758
    },
    "90000521": {
        "code": "JAÐAR10",
        "name": "Jaðarsel / Seljabraut",
        "lat": 64.097864,
        "lon": -21.827733
    },
    "90000763": {
        "code": "LAMBHAG",
        "name": "Lambhagavegur / Mímisbrunnur",
        "lat": 64.134029,
        "lon": -21.750167
    },
    "90000522": {
        "code": "SUÐURHÓ",
        "name": "Hólabrekkuskóli",
        "lat": 64.107946,
        "lon": -21.81773
    },
    "90000764": {
        "code": "REYNIS2",
        "name": "Reynisvatn",
        "lat": 64.126632,
        "lon": -21.731949
    },
    "90000523": {
        "code": "SUÐURH4",
        "name": "Lokinhamrar / Hesthamrar",
        "lat": 64.139332,
        "lon": -21.818393
    },
    "90000524": {
        "code": "AUSTURB",
        "name": "Gerðuberg",
        "lat": 64.104986,
        "lon": -21.817051
    },
    "90000525": {
        "code": "NORÐURF",
        "name": "Norðurfell / Austurberg",
        "lat": 64.101994,
        "lon": -21.817495
    },
    "90000767": {
        "code": "REYNIS4",
        "name": "Reynisvatn",
        "lat": 64.126568,
        "lon": -21.732504
    },
    "13001328": {
        "code": "ÁLFTAN3",
        "name": "Álftanesvegur / Garðaholtsvegur",
        "lat": 64.088769,
        "lon": -21.981235
    },
    "90000526": {
        "code": "NORÐUR1",
        "name": "Fellaskóli / Nýlistasafnið",
        "lat": 64.101775,
        "lon": -21.82293
    },
    "90000768": {
        "code": "GUFUNES",
        "name": "Gufunesbær",
        "lat": 64.144192,
        "lon": -21.809488
    },
    "13001329": {
        "code": "ÁLFTAN2",
        "name": "Álftanesvegur / Herjólfsgata",
        "lat": 64.08481,
        "lon": -21.967695
    },
    "90000527": {
        "code": "BISKUP1",
        "name": "Biskupsgata",
        "lat": 64.12567,
        "lon": -21.735857
    },
    "90000769": {
        "code": "EGILSHÖ",
        "name": "Egilshöll",
        "lat": 64.145946,
        "lon": -21.772323
    },
    "90000529": {
        "code": "LANGIRI",
        "name": "Langirimi / Hallsvegur",
        "lat": 64.140749,
        "lon": -21.793928
    },
    "13001322": {
        "code": "ÁLFTAN6",
        "name": "Garðahraun",
        "lat": 64.084827,
        "lon": -21.958036
    },
    "13001323": {
        "code": "ÁLFTAN7",
        "name": "Garðahraun",
        "lat": 64.084719,
        "lon": -21.957896
    },
    "87160001": {
        "code": "HVERAGE",
        "name": "Hveragerði - Shell",
        "lat": 63.995477,
        "lon": -21.184366
    },
    "87160002": {
        "code": "HVERAG3",
        "name": "Hveragerði - Shell",
        "lat": 63.995464,
        "lon": -21.184515
    },
    "90000770": {
        "code": "STRAND9",
        "name": "Strandvegur / Rimaflöt",
        "lat": 64.144722,
        "lon": -21.805754
    },
    "90000771": {
        "code": "VESTU39",
        "name": "Vesturlandsvegur / Úlfarsá",
        "lat": 64.1358527085922,
        "lon": -21.7601463181546
    },
    "90000530": {
        "code": "LANGIR1",
        "name": "Langirimi / Flétturimi",
        "lat": 64.142384,
        "lon": -21.792345
    },
    "90000772": {
        "code": "VESTU38",
        "name": "Vesturlandsvegur / Úlfarsá",
        "lat": 64.135916,
        "lon": -21.760679
    },
    "90000531": {
        "code": "LANGIR2",
        "name": "Miðgarður",
        "lat": 64.144566,
        "lon": -21.791284
    },
    "90000532": {
        "code": "LANGIR3",
        "name": "Langirimi / Lyngrimi",
        "lat": 64.146055,
        "lon": -21.787453
    },
    "90000533": {
        "code": "GULLENG",
        "name": "Gullengi / Borgavegur",
        "lat": 64.147038,
        "lon": -21.783137
    },
    "90000534": {
        "code": "VÍKURV1",
        "name": "Víkurvegur / Keldnaholt",
        "lat": 64.139227,
        "lon": -21.772367
    },
    "90000535": {
        "code": "GULLEN1",
        "name": "Gullengi / Laufengi",
        "lat": 64.147091,
        "lon": -21.779353
    },
    "90000777": {
        "code": "MIMISBR",
        "name": "Mimisbrunnur / Skyggnistorg",
        "lat": 64.136328,
        "lon": -21.740712
    },
    "90000536": {
        "code": "SKÓLAVE",
        "name": "Skólavegur",
        "lat": 64.149016,
        "lon": -21.779588
    },
    "90000778": {
        "code": "SKYGGNI",
        "name": "Skyggnisbraut",
        "lat": 64.1359144921465,
        "lon": -21.7353817590145
    },
    "90000736": {
        "code": "LOKINH9",
        "name": "Lokinhamrar / Bláhamrar",
        "lat": 64.136947,
        "lon": -21.810359
    },
    "90000737": {
        "code": "VÍKURV4",
        "name": "Víkurvegur / Borgavegur",
        "lat": 64.144201,
        "lon": -21.774926
    },
    "13001353": {
        "code": "ÁSABRA6",
        "name": "Ásabraut / Birkiás",
        "lat": 64.088124,
        "lon": -21.940319
    },
    "13001354": {
        "code": "ÁSABRA7",
        "name": "Ásabraut / Arnarás",
        "lat": 64.090879,
        "lon": -21.942775
    },
    "13001351": {
        "code": "ÁSABRA4",
        "name": "Ásabraut / Hraunsholtsbraut",
        "lat": 64.085576,
        "lon": -21.950153
    },
    "13001352": {
        "code": "ÁSABRA5",
        "name": "Ásabraut / Brekkuás",
        "lat": 64.086953,
        "lon": -21.941986
    },
    "13001355": {
        "code": "SJÁLAND",
        "name": "Sjálandsskóli",
        "lat": 64.092082,
        "lon": -21.936259
    },
    "13001356": {
        "code": "SJÁLAN1",
        "name": "Sjálandsskóli",
        "lat": 64.092176,
        "lon": -21.93456
    },
    "13001361": {
        "code": "KAUPTÚN",
        "name": "Kauptún",
        "lat": 64.074007,
        "lon": -21.914028
    },
    "90000740": {
        "code": "GAGNVE6",
        "name": "Gagnvegur / Völundarhús",
        "lat": 64.138161,
        "lon": -21.773972
    },
    "90000741": {
        "code": "GAGNVE7",
        "name": "Gagnvegur / Völundarhús",
        "lat": 64.138281,
        "lon": -21.77421
    },
    "90000500": {
        "code": "BORGAV5",
        "name": "Borgavegur",
        "lat": 64.149625,
        "lon": -21.788861
    },
    "90000501": {
        "code": "STRÆTÓ1",
        "name": "Strætóvegur við Vættaborgir",
        "lat": 64.153015,
        "lon": -21.785335
    },
    "90000502": {
        "code": "HAMRAV1",
        "name": "Kelduskóli / Vík",
        "lat": 64.15272,
        "lon": -21.779028
    },
    "90000744": {
        "code": "STRAUM5",
        "name": "Straumur / Nethylur",
        "lat": 64.122195,
        "lon": -21.815114
    },
    "90000503": {
        "code": "LOKINH5",
        "name": "Lokinhamrar / Hesthamrar",
        "lat": 64.139427,
        "lon": -21.818164
    },
    "90000745": {
        "code": "HAMRAV2",
        "name": "Hamravík / Mosavegur",
        "lat": 64.151333,
        "lon": -21.775997
    },
    "90000504": {
        "code": "GULLINB",
        "name": "Gullinbrú",
        "lat": 64.133315,
        "lon": -21.813624
    },
    "90000746": {
        "code": "HAMRAV3",
        "name": "Hamravík / Mosavegur",
        "lat": 64.151367,
        "lon": -21.775864
    },
    "90000747": {
        "code": "ESJUMEL",
        "name": "Esjumelar",
        "lat": 64.194126,
        "lon": -21.697398
    },
    "13001348": {
        "code": "MAREL1",
        "name": "Marel",
        "lat": 64.076844,
        "lon": -21.919126
    },
    "90000748": {
        "code": "ESJUME1",
        "name": "Esjumelar",
        "lat": 64.194212,
        "lon": -21.697271
    },
    "13001349": {
        "code": "AUSTU10",
        "name": "Austurhraun / Suðurhraun",
        "lat": 64.076222,
        "lon": -21.922933
    },
    "90000507": {
        "code": "LOKINH6",
        "name": "Lokinhamrar / Leiðhamrar",
        "lat": 64.140539,
        "lon": -21.81694
    },
    "90000749": {
        "code": "NOÐLING",
        "name": "Norðlingabraut / Helluvað",
        "lat": 64.102703,
        "lon": -21.766723
    },
    "90000508": {
        "code": "SKÓGAR6",
        "name": "Skógarsel / Árskógar",
        "lat": 64.104707,
        "lon": -21.843823
    },
    "90000509": {
        "code": "SKÓGAR3",
        "name": "Íþróttamiðstöð ÍR",
        "lat": 64.102635,
        "lon": -21.850158
    },
    "13001584": {
        "code": "FLATAH6",
        "name": "Flatahraun / Álftanesvegur",
        "lat": 64.077452,
        "lon": -21.92963
    },
    "13001343": {
        "code": "SUÐURHR",
        "name": "Suðurhraun",
        "lat": 64.077767,
        "lon": -21.926526
    },
    "13001585": {
        "code": "GÓA",
        "name": "Góa",
        "lat": 64.075887,
        "lon": -21.928453
    },
    "13001346": {
        "code": "AUSTUR9",
        "name": "Austurhraun / Miðhraun",
        "lat": 64.078026,
        "lon": -21.914426
    },
    "13001347": {
        "code": "AUSTU11",
        "name": "Austurhraun / Miðhraun",
        "lat": 64.078047,
        "lon": -21.914549
    },
    "13001344": {
        "code": "AUSTUR8",
        "name": "Austurhraun / Suðurhraun",
        "lat": 64.076161,
        "lon": -21.922743
    },
    "13001586": {
        "code": "REYKJ23",
        "name": "Reykjanesbraut / Vífilsstaðir",
        "lat": 64.082286,
        "lon": -21.890105
    },
    "13001345": {
        "code": "MAREL",
        "name": "Marel",
        "lat": 64.076783,
        "lon": -21.918972
    },
    "13001587": {
        "code": "REYKJ24",
        "name": "Reykjanesbraut / Vífilsstaðavegur",
        "lat": 64.083042,
        "lon": -21.896583
    },
    "13001350": {
        "code": "SUÐURH8",
        "name": "Suðurhraun",
        "lat": 64.077831,
        "lon": -21.926387
    },
    "61000002": {
        "code": "ÁSBYRGI",
        "name": "Ásbyrgi",
        "lat": 66.030795,
        "lon": -16.492863
    },
    "61000001": {
        "code": "HÚSAVÍK",
        "name": "Húsavík",
        "lat": 66.046915,
        "lon": -17.343375
    },
    "90000750": {
        "code": "NORÐLI3",
        "name": "Norðlingabraut / Ferjuvað",
        "lat": 64.103901,
        "lon": -21.771639
    },
    "61000004": {
        "code": "RAUFARH",
        "name": "Raufarhöfn",
        "lat": 66.452615,
        "lon": -15.949477
    },
    "90000751": {
        "code": "NORÐLI4",
        "name": "Norðlingabraut / Bjallavað",
        "lat": 64.102903,
        "lon": -21.776744
    },
    "61000003": {
        "code": "KÓPASKE",
        "name": "Kópasker",
        "lat": 66.301272,
        "lon": -16.443471
    },
    "90000510": {
        "code": "SKÓGAR4",
        "name": "Skógarsel / Stúfsel",
        "lat": 64.100688,
        "lon": -21.857382
    },
    "90000752": {
        "code": "NORÐLI5",
        "name": "Norðlingabraut / Árvað",
        "lat": 64.101478,
        "lon": -21.778261
    },
    "90000511": {
        "code": "SKÓGAR5",
        "name": "Skógarsel / Stokkasel",
        "lat": 64.098484,
        "lon": -21.851918
    },
    "90000753": {
        "code": "MÍMISBR",
        "name": "Mímisbrunnur / Úlfarsbraut",
        "lat": 64.134738,
        "lon": -21.745795
    },
    "90000512": {
        "code": "HÓLMAS1",
        "name": "Hólmasel",
        "lat": 64.096777,
        "lon": -21.843647
    },
    "90000754": {
        "code": "BORGAV8",
        "name": "Borgavegur / Gullengi",
        "lat": 64.146047,
        "lon": -21.783243
    },
    "90000513": {
        "code": "JAÐARS5",
        "name": "Jaðarsel / Holtasel",
        "lat": 64.095962,
        "lon": -21.845364
    },
    "90000755": {
        "code": "BITRUHÁ",
        "name": "Bitruháls",
        "lat": 64.121937,
        "lon": -21.80651
    },
    "90000514": {
        "code": "JAÐARS6",
        "name": "Jaðarsel / Látrasel",
        "lat": 64.093635,
        "lon": -21.841113
    },
    "90000756": {
        "code": "GRJÓTHÁ",
        "name": "Grjótháls / Bitruháls",
        "lat": 64.123575,
        "lon": -21.803081
    },
    "90000717": {
        "code": "VESTU30",
        "name": "Vesturhólar / Höfðabakki",
        "lat": 64.110748,
        "lon": -21.819954
    },
    "61000005": {
        "code": "HÓLSFJA",
        "name": "Jökulsá á Fjöllum",
        "lat": 65.626341,
        "lon": -16.17725
    },
    "90000718": {
        "code": "VESTU31",
        "name": "Vesturhólar / Fýlshólar",
        "lat": 64.11162,
        "lon": -21.817805
    },
    "90000719": {
        "code": "VESTU32",
        "name": "Vesturhólar / Hrafnhólar",
        "lat": 64.110622,
        "lon": -21.815554
    },
    "10000956": {
        "code": "VATNSE8",
        "name": "Vatnsendahvarf / Víkurhvarf",
        "lat": 64.093697,
        "lon": -21.808651
    },
    "10000955": {
        "code": "VATNSE9",
        "name": "Vatnsendahvarf / Ögurhvarf",
        "lat": 64.09653,
        "lon": -21.80577
    },
    "10000957": {
        "code": "DALAÞIN",
        "name": "Dalaþing",
        "lat": 64.08076,
        "lon": -21.813769
    },
    "10000950": {
        "code": "ÞINGMAN",
        "name": "Þingmannaleið / Vallakór",
        "lat": 64.083772,
        "lon": -21.818533
    },
    "90000720": {
        "code": "NORÐU19",
        "name": "Norðurhólar / Smyrilshólar",
        "lat": 64.11019,
        "lon": -21.809423
    },
    "10000951": {
        "code": "BOÐAÞIN",
        "name": "Boðaþing",
        "lat": 64.082119,
        "lon": -21.817871
    },
    "90000721": {
        "code": "NORÐU20",
        "name": "Norðurhólar / Stelkshólar",
        "lat": 64.10909,
        "lon": -21.804492
    },
    "10000954": {
        "code": "VATNSE7",
        "name": "Vatnsendahvarf / Ögurhvarf",
        "lat": 64.096425,
        "lon": -21.805488
    },
    "90000722": {
        "code": "SUÐURH6",
        "name": "Suðurhólar / Þrastarhólar",
        "lat": 64.107807,
        "lon": -21.808807
    },
    "10000953": {
        "code": "VATNSE6",
        "name": "Vatnsendahvarf / Víkurhvarf",
        "lat": 64.093626,
        "lon": -21.808357
    },
    "90000723": {
        "code": "SUÐURH7",
        "name": "Suðurhólar / Austurberg",
        "lat": 64.107845,
        "lon": -21.81604
    },
    "90000724": {
        "code": "SELJASK",
        "name": "Seljabraut / Seljaskógar",
        "lat": 64.103092,
        "lon": -21.835326
    },
    "90000725": {
        "code": "SELJAB8",
        "name": "Seljabraut / Engjasel",
        "lat": 64.101909,
        "lon": -21.833665
    },
    "90000726": {
        "code": "SELJAB9",
        "name": "Seljabraut",
        "lat": 64.099638,
        "lon": -21.830507
    },
    "13001525": {
        "code": "REYKJAV",
        "name": "Ásar",
        "lat": 64.086355,
        "lon": -21.938269
    },
    "90000727": {
        "code": "SELJA10",
        "name": "Seljabraut / Flúðasel",
        "lat": 64.098228,
        "lon": -21.828427
    },
    "90000729": {
        "code": "ROFABÆ9",
        "name": "Rofabær / Brautarás",
        "lat": 64.114922,
        "lon": -21.787623
    },
    "73007403": {
        "code": "MIÐSTRÆ",
        "name": "Miðstræti / Stekkjargata",
        "lat": 65.1484,
        "lon": -13.69
    },
    "73007404": {
        "code": "HAFNA14",
        "name": "Hafnarbraut / Gilsbakki",
        "lat": 65.1479,
        "lon": -13.6982
    },
    "73007405": {
        "code": "NORÐFJÖ",
        "name": "Norðfjörður / Orkan",
        "lat": 65.1475,
        "lon": -13.7069
    },
    "13001523": {
        "code": "HAFNAR3",
        "name": "Hegranes",
        "lat": 64.096185,
        "lon": -21.921988
    },
    "73007401": {
        "code": "NORÐFJ2",
        "name": "Norðfjörður / Nesbakki",
        "lat": 65.1485,
        "lon": -13.668
    },
    "73007402": {
        "code": "NORÐFJ1",
        "name": "Norðfjörður / VA",
        "lat": 65.1489,
        "lon": -13.6785
    },
    "66010001": {
        "code": "SVALBA4",
        "name": "Svalbarðseyri",
        "lat": 65.749465,
        "lon": -18.075727
    },
    "90000731": {
        "code": "HÁLSAB2",
        "name": "Hálsabraut",
        "lat": 64.119654,
        "lon": -21.797871
    },
    "90000732": {
        "code": "BÆJARB8",
        "name": "Bæjarbraut",
        "lat": 64.117652,
        "lon": -21.799352
    },
    "90000733": {
        "code": "BÆJARB9",
        "name": "Bæjarbraut",
        "lat": 64.117725,
        "lon": -21.799091
    },
    "90000734": {
        "code": "HÁLSAB3",
        "name": "Hálsabraut",
        "lat": 64.119641,
        "lon": -21.797586
    },
    "55080001": {
        "code": "HVAMMST",
        "name": "Hvammstangavegur",
        "lat": 65.3524758007671,
        "lon": -20.8844365209368
    },
    "55080003": {
        "code": "VÍÐIGER",
        "name": "Víðigerði",
        "lat": 65.381,
        "lon": -20.645
    },
    "55080002": {
        "code": "HVAMMS1",
        "name": "Hvammstangi",
        "lat": 65.392146,
        "lon": -20.937127
    },
    "56040001": {
        "code": "BLÖNDUÓ",
        "name": "Blönduós",
        "lat": 65.659872,
        "lon": -20.2769
    },
    "13001306": {
        "code": "ÁLFTAN1",
        "name": "Álftanesvegur / Garðaholtsvegur",
        "lat": 64.089246,
        "lon": -21.982334
    },
    "90000702": {
        "code": "VESTU28",
        "name": "Esjurætur - Hiking Center",
        "lat": 64.208419,
        "lon": -21.712028
    },
    "90000703": {
        "code": "VALLAR4",
        "name": "Klébergsskóli",
        "lat": 64.237889,
        "lon": -21.824185
    },
    "13001304": {
        "code": "ÁSABRA1",
        "name": "Ásabraut / Hraunsholtsbraut",
        "lat": 64.085691,
        "lon": -21.950248
    },
    "90000704": {
        "code": "VALLAR5",
        "name": "Vallargrund / Esjugrund",
        "lat": 64.240824,
        "lon": -21.828048
    },
    "13001305": {
        "code": "ÁLFTANE",
        "name": "Álftanesvegur / Herjólfsgata",
        "lat": 64.085066,
        "lon": -21.968358
    },
    "90000705": {
        "code": "ESJUSK1",
        "name": "Esjuskáli",
        "lat": 64.241862,
        "lon": -21.829999
    },
    "90000707": {
        "code": "VALLAR7",
        "name": "Vallargrund / Esjugrund",
        "lat": 64.240629,
        "lon": -21.827924
    },
    "90000708": {
        "code": "VALLAR6",
        "name": "Klébergsskóli",
        "lat": 64.237805,
        "lon": -21.824264
    },
    "90000709": {
        "code": "LSH / 1",
        "name": "LSH / Hringbraut",
        "lat": 64.135909,
        "lon": -21.928974
    },
    "64000001": {
        "code": "DALVÍK",
        "name": "Dalvík",
        "lat": 65.978846,
        "lon": -18.530109
    },
    "13001302": {
        "code": "ÁSABRA3",
        "name": "Ásabraut / Birkiás",
        "lat": 64.088076,
        "lon": -21.940529
    },
    "13001303": {
        "code": "ÁSABRA2",
        "name": "Ásabraut / Brekkuás",
        "lat": 64.086973,
        "lon": -21.942166
    },
    "13001300": {
        "code": "ÁSGARÐ2",
        "name": "Ásgarður",
        "lat": 64.089679,
        "lon": -21.929797
    },
    "13001301": {
        "code": "ÁSABRAU",
        "name": "Ásabraut / Arnarás",
        "lat": 64.09075,
        "lon": -21.942956
    },
    "10000945": {
        "code": "VATNSE3",
        "name": "Vatnsendavegur / Breiðahvarf",
        "lat": 64.090774,
        "lon": -21.807935
    },
    "10000946": {
        "code": "ÁLFHÓL5",
        "name": "Álfhólsskóli / Digranes",
        "lat": 64.111428,
        "lon": -21.872992
    },
    "10000948": {
        "code": "NÝBÝL12",
        "name": "Lundur",
        "lat": 64.114587,
        "lon": -21.89492
    },
    "90000711": {
        "code": "ESJUSK2",
        "name": "Esjuskáli",
        "lat": 64.241735,
        "lon": -21.82977
    },
    "90000119": {
        "code": "RAUÐAR1",
        "name": "Rauðarárstígur",
        "lat": 64.140139,
        "lon": -21.915417
    },
    "10000919": {
        "code": "HLÍÐA12",
        "name": "Hlíðarhjalli / Fífuhjalli",
        "lat": 64.107695,
        "lon": -21.860097
    },
    "82000039": {
        "code": "LITLA-H",
        "name": "Litla-Hraun",
        "lat": 63.8605686110691,
        "lon": -21.1290119338803
    },
    "76200002": {
        "code": "SKJÖLDÓ",
        "name": "Skjöldólfsstaðir",
        "lat": 65.31667,
        "lon": -15.1163
    },
    "10000911": {
        "code": "SALAVE8",
        "name": "Salavegur / Rjúpnasalir",
        "lat": 64.090012,
        "lon": -21.843933
    },
    "76200001": {
        "code": "NORÐAU1",
        "name": "Vopnafjörður - Vegamót",
        "lat": 65.459261,
        "lon": -15.50708
    },
    "82000043": {
        "code": "EYRARV2",
        "name": "Eyravegur / Kirkjuvegur",
        "lat": 63.9363199996518,
        "lon": -21.006666020836
    },
    "90000360": {
        "code": "FJALLK4",
        "name": "Fjallkonuvegur / Reykjafold",
        "lat": 64.137719,
        "lon": -21.790887
    },
    "82000042": {
        "code": "EYRARV1",
        "name": "Eyravegur / Kirkjuvegur",
        "lat": 63.936383,
        "lon": -21.00682
    },
    "90000361": {
        "code": "FJALLK5",
        "name": "Fjallkonuvegur / Gagnvegur",
        "lat": 64.139241,
        "lon": -21.789273
    },
    "10000918": {
        "code": "HJALLAK",
        "name": "Hjallakirkja",
        "lat": 64.109514,
        "lon": -21.866139
    },
    "90000120": {
        "code": "HÁTEIG1",
        "name": "Háteigsvegur / Langahlíð",
        "lat": 64.138606,
        "lon": -21.908553
    },
    "90000362": {
        "code": "GAGNVEG",
        "name": "Gagnvegur / Dalhús",
        "lat": 64.139278,
        "lon": -21.784549
    },
    "10000917": {
        "code": "SKÁLAH4",
        "name": "Skálaheiði",
        "lat": 64.110944,
        "lon": -21.873839
    },
    "82000044": {
        "code": "Barnask",
        "name": "Barnaskólinn Stokkseyri",
        "lat": 63.83781,
        "lon": -21.06716
    },
    "90000121": {
        "code": "HÁTEIG5",
        "name": "Háteigskirkja",
        "lat": 64.137992,
        "lon": -21.903821
    },
    "90000363": {
        "code": "GAGNVE1",
        "name": "Gagnvegur / Vallarhús",
        "lat": 64.139608,
        "lon": -21.780282
    },
    "90000122": {
        "code": "HÁTEIG4",
        "name": "Háteigsvegur / Bólstaðarhlíð",
        "lat": 64.137245,
        "lon": -21.898562
    },
    "90000364": {
        "code": "GAGNVE2",
        "name": "Gagnvegur / Brekkuhús",
        "lat": 64.138552,
        "lon": -21.776655
    },
    "90000365": {
        "code": "VÆTTAB1",
        "name": "Vættaborgir",
        "lat": 64.154372,
        "lon": -21.784844
    },
    "82000041": {
        "code": "BARNAS2",
        "name": "Barnaskólinn Stokkseyri",
        "lat": 63.8374936404431,
        "lon": -21.0650827999881
    },
    "90000124": {
        "code": "HÁALE13",
        "name": "Háaleitisbraut / Lágmúli",
        "lat": 64.137737,
        "lon": -21.89164
    },
    "90000366": {
        "code": "SPÖNG1",
        "name": "Spöngin",
        "lat": 64.150208,
        "lon": -21.791357
    },
    "90000125": {
        "code": "HÁALE12",
        "name": "Háaleitisbraut / Mýri",
        "lat": 64.136179,
        "lon": -21.887205
    },
    "90000367": {
        "code": "BORGAV2",
        "name": "Borgavegur",
        "lat": 64.149303,
        "lon": -21.787535
    },
    "90000126": {
        "code": "HÁALE11",
        "name": "Miðbær",
        "lat": 64.133848,
        "lon": -21.883877
    },
    "90000368": {
        "code": "LANGIR4",
        "name": "Langirimi / Mosarimi",
        "lat": 64.145972,
        "lon": -21.787892
    },
    "90000127": {
        "code": "HÁALE10",
        "name": "Fellsmúli",
        "lat": 64.131478,
        "lon": -21.883643
    },
    "90000369": {
        "code": "LANGIR5",
        "name": "Miðgarður",
        "lat": 64.144487,
        "lon": -21.791621
    },
    "10000910": {
        "code": "LINDAR3",
        "name": "Lindarvegur",
        "lat": 64.100794,
        "lon": -21.871763
    },
    "90000129": {
        "code": "SELÁSB4",
        "name": "Selásbraut / Þverás",
        "lat": 64.102916,
        "lon": -21.783692
    },
    "60000098": {
        "code": "AUSTU12",
        "name": "Austursíða / Lindarsíða",
        "lat": 65.694946,
        "lon": -18.129359
    },
    "60000097": {
        "code": "AUSTURS",
        "name": "Austursíða / Lindarsíða",
        "lat": 65.695,
        "lon": -18.12924
    },
    "60000096": {
        "code": "BUGÐUSÍ",
        "name": "Bugðusíða / Bjarg",
        "lat": 65.694296,
        "lon": -18.132572
    },
    "60000095": {
        "code": "BUGÐUS3",
        "name": "Bugðusíða / Bjarg",
        "lat": 65.694203,
        "lon": -18.132513
    },
    "60000094": {
        "code": "MIÐSÍÐ3",
        "name": "Miðsíða / Múlasíða",
        "lat": 65.694808,
        "lon": -18.13657
    },
    "77080008": {
        "code": "JÖKULS1",
        "name": "Jökulsárlón",
        "lat": 64.046031,
        "lon": -16.177135
    },
    "60000093": {
        "code": "MIÐSÍÐA",
        "name": "Miðsíða / Múlasíða",
        "lat": 65.694974,
        "lon": -18.136863
    },
    "60000092": {
        "code": "MIÐSÍÐ2",
        "name": "Miðsíða / Móasíða",
        "lat": 65.696066,
        "lon": -18.142001
    },
    "82000029": {
        "code": "HÁEYRA1",
        "name": "Háeyrarvellir",
        "lat": 63.860717,
        "lon": -21.142391
    },
    "60000091": {
        "code": "MIÐSÍÐ1",
        "name": "Miðsíða",
        "lat": 65.69608,
        "lon": -18.14319
    },
    "76200005": {
        "code": "EGILSS5",
        "name": "Egilsstaðir - Tjaldsvæðið",
        "lat": 65.2587083533151,
        "lon": -14.4069628003902
    },
    "82000028": {
        "code": "EYRARG1",
        "name": "Eyrargata",
        "lat": 63.862126,
        "lon": -21.14676
    },
    "60000090": {
        "code": "VESTU36",
        "name": "Vestursíða / Bæjarsíða",
        "lat": 65.694557,
        "lon": -18.14418
    },
    "76200004": {
        "code": "EGILSTA",
        "name": "Egilsstaðir / Tjaldsvæði",
        "lat": 65.2614,
        "lon": -14.4059
    },
    "76200003": {
        "code": "FELLABÆ",
        "name": "Fellabær - Olís",
        "lat": 65.2825,
        "lon": -14.4257
    },
    "10000923": {
        "code": "BÚÐAKÓ5",
        "name": "Hörðuvallaskóli",
        "lat": 64.084678,
        "lon": -21.826078
    },
    "77080002": {
        "code": "FREYSNE",
        "name": "Freysnes",
        "lat": 63.990386,
        "lon": -16.893033
    },
    "82000036": {
        "code": "VALLASK",
        "name": "Selfoss - Vallaskóli",
        "lat": 63.933871,
        "lon": -20.995996
    },
    "10000922": {
        "code": "BÚÐAKÓ2",
        "name": "Hörðuvallaskóli",
        "lat": 64.084613,
        "lon": -21.825444
    },
    "77080003": {
        "code": "SKAFTAF",
        "name": "Skaftafell",
        "lat": 64.015611,
        "lon": -16.965545
    },
    "10000925": {
        "code": "BÚÐAKÓ3",
        "name": "Rjúpnavegur",
        "lat": 64.086905,
        "lon": -21.833585
    },
    "82000038": {
        "code": "LANGHO8",
        "name": "Langholt / Larensstræti",
        "lat": 63.937487,
        "lon": -20.978881
    },
    "77080001": {
        "code": "HÖFN Í",
        "name": "Höfn í Hornafirði",
        "lat": 64.254227,
        "lon": -15.207482
    },
    "82000037": {
        "code": "LANGHO7",
        "name": "Langholt / Larensstræti",
        "lat": 63.9374810619796,
        "lon": -20.9790163141965
    },
    "90000370": {
        "code": "LANGIR6",
        "name": "Langirimi / Flétturimi",
        "lat": 64.142182,
        "lon": -21.792563
    },
    "10000927": {
        "code": "ENGIHJA",
        "name": "Engihjalli",
        "lat": 64.109807,
        "lon": -21.860418
    },
    "90000371": {
        "code": "LANGIR7",
        "name": "Langirimi / Hallsvegur",
        "lat": 64.140847,
        "lon": -21.794042
    },
    "10000926": {
        "code": "SKÁLAH5",
        "name": "Skálaheiði",
        "lat": 64.110981,
        "lon": -21.873669
    },
    "77080007": {
        "code": "JÖKULSÁ",
        "name": "Jökulsárlón",
        "lat": 64.046076,
        "lon": -16.177622
    },
    "77080004": {
        "code": "SKAFTA1",
        "name": "Skaftafell",
        "lat": 64.015599,
        "lon": -16.9654
    },
    "90000373": {
        "code": "LOKINH3",
        "name": "Lokinhamrar / Vegghamrar",
        "lat": 64.138438,
        "lon": -21.808477
    },
    "10000928": {
        "code": "ÁLFHÓL3",
        "name": "Álfhólsskóli / Efstihjalli",
        "lat": 64.110826,
        "lon": -21.862431
    },
    "77080005": {
        "code": "FREYSN1",
        "name": "Freysnes",
        "lat": 63.990355,
        "lon": -16.893124
    },
    "90000132": {
        "code": "BÚSTAÐ8",
        "name": "Borgarspítalinn",
        "lat": 64.123797,
        "lon": -21.88669
    },
    "90000374": {
        "code": "HÖFÐAB1",
        "name": "Höfðar",
        "lat": 64.126982,
        "lon": -21.812224
    },
    "90000133": {
        "code": "BÚSTAÐ7",
        "name": "Eyrarland",
        "lat": 64.123012,
        "lon": -21.881728
    },
    "90000375": {
        "code": "NORÐLI1",
        "name": "Norðlingabraut / Bjallavað",
        "lat": 64.102854,
        "lon": -21.776629
    },
    "90000134": {
        "code": "BÚSTA16",
        "name": "Grímsbær",
        "lat": 64.122275,
        "lon": -21.874306
    },
    "90000376": {
        "code": "STRAUM3",
        "name": "Straumur / Nesti",
        "lat": 64.123281,
        "lon": -21.825963
    },
    "82000030": {
        "code": "BARNAS1",
        "name": "Barnaskólinn Eyrarbakka",
        "lat": 63.858538,
        "lon": -21.133986
    },
    "90000135": {
        "code": "BÚSTA15",
        "name": "Ásgarður Fossvogi",
        "lat": 64.121175,
        "lon": -21.864596
    },
    "90000377": {
        "code": "STRENGU",
        "name": "Strengur / Sílakvísl",
        "lat": 64.121292,
        "lon": -21.82718
    },
    "90000136": {
        "code": "BÚSTA14",
        "name": "Bústaðakirkja",
        "lat": 64.12046,
        "lon": -21.858523
    },
    "90000378": {
        "code": "STRENG1",
        "name": "Strengur / Laxakvísl",
        "lat": 64.121186,
        "lon": -21.817062
    },
    "90000137": {
        "code": "BÚSTA13",
        "name": "Víkin",
        "lat": 64.120418,
        "lon": -21.852499
    },
    "90000379": {
        "code": "HÖFÐAB3",
        "name": "Árbæjarsafn",
        "lat": 64.119353,
        "lon": -21.813471
    },
    "90000138": {
        "code": "REYKJAN",
        "name": "Blesugróf",
        "lat": 64.117293,
        "lon": -21.844929
    },
    "90000139": {
        "code": "ARNARB2",
        "name": "Dvergabakki",
        "lat": 64.110215,
        "lon": -21.834442
    },
    "10000920": {
        "code": "BÚÐAKÓR",
        "name": "Rjúpnavegur",
        "lat": 64.086819,
        "lon": -21.83374
    },
    "60000089": {
        "code": "VESTURS",
        "name": "Vestursíða / Bæjarsíða",
        "lat": 65.694333,
        "lon": -18.143371
    },
    "60000088": {
        "code": "VESTU35",
        "name": "Vestursíða / Brattasíða",
        "lat": 65.691989,
        "lon": -18.141542
    },
    "60000087": {
        "code": "VESTU34",
        "name": "Vestursíða / Brattasíða",
        "lat": 65.691614,
        "lon": -18.14159
    },
    "60000086": {
        "code": "SÍÐUSEL",
        "name": "Vestursíða / Lögmannshlíð",
        "lat": 65.689528,
        "lon": -18.137961
    },
    "60000085": {
        "code": "SÍÐUSE1",
        "name": "Vestursíða / Lögmannshlíð",
        "lat": 65.689778,
        "lon": -18.138472
    },
    "76207002": {
        "code": "EGILSS4",
        "name": "Egilsstaðir / Flugvöllur",
        "lat": 65.2748,
        "lon": -14.4062
    },
    "60000084": {
        "code": "BUGÐUS2",
        "name": "Bugðusíða / Vestursíða",
        "lat": 65.688803,
        "lon": -18.135289
    },
    "76207003": {
        "code": "EGILSS3",
        "name": "Egilsstaðir / Hamragerði",
        "lat": 65.2561,
        "lon": -14.4129
    },
    "60000083": {
        "code": "BUGÐUS1",
        "name": "Bugðusíða / Núpasíða",
        "lat": 65.688269,
        "lon": -18.136218
    },
    "60000082": {
        "code": "MERKIG6",
        "name": "Merkigil / Urðargil",
        "lat": 65.687563,
        "lon": -18.141172
    },
    "76207005": {
        "code": "EGILSS1",
        "name": "Egilsstaðir / Íþróttamiðstöð",
        "lat": 65.2668,
        "lon": -14.3965
    },
    "60000081": {
        "code": "MERKIGI",
        "name": "Merkigil / Urðargil",
        "lat": 65.687645,
        "lon": -18.141245
    },
    "76207006": {
        "code": "ÁRSSKÓG",
        "name": "Ársskógar / Dalskógar",
        "lat": 65.2648,
        "lon": -14.3869
    },
    "82000018": {
        "code": "TJARNAR",
        "name": "Tjarnarbyggð",
        "lat": 63.89266,
        "lon": -21.076469
    },
    "60000080": {
        "code": "MERKIG1",
        "name": "Merkigil / Skuggagil",
        "lat": 65.68549,
        "lon": -18.14048
    },
    "76207007": {
        "code": "EGILSST",
        "name": "Egilsstaðir / Selbrekka v. Sey.fj.veg",
        "lat": 65.26,
        "lon": -14.3891
    },
    "82000017": {
        "code": "SANDVÍ1",
        "name": "Sandvíkurbæir",
        "lat": 63.911587,
        "lon": -21.053372
    },
    "82000019": {
        "code": "TJARNA1",
        "name": "Tjarnarbyggð",
        "lat": 63.892595,
        "lon": -21.076437
    },
    "82000025": {
        "code": "EYRARB1",
        "name": "Eyrarbraut / Eyjasel",
        "lat": 63.838655,
        "lon": -21.070147
    },
    "82000024": {
        "code": "HÁSTEI2",
        "name": "Hásteinsvegur / Strandgata",
        "lat": 63.834397,
        "lon": -21.058756
    },
    "82000027": {
        "code": "BÚÐARS1",
        "name": "Búðarstígur",
        "lat": 63.864845,
        "lon": -21.157722
    },
    "82000026": {
        "code": "HAFNA12",
        "name": "Hafnarbrú",
        "lat": 63.866803,
        "lon": -21.16298
    },
    "82000021": {
        "code": "HÁSTEIN",
        "name": "Hásteinsvegur / Stjörnusteinar",
        "lat": 63.8367,
        "lon": -21.062546
    },
    "82000020": {
        "code": "EYRARBR",
        "name": "Eyrarbraut / Eyjasel",
        "lat": 63.838602,
        "lon": -21.070039
    },
    "82000023": {
        "code": "BALDURS",
        "name": "Baldurshagi",
        "lat": 63.8324,
        "lon": -21.045467
    },
    "82000022": {
        "code": "HÁSTEI1",
        "name": "Hásteinsvegur / Ólafsvellir",
        "lat": 63.832863,
        "lon": -21.05072
    },
    "90000342": {
        "code": "STÓRHÖ5",
        "name": "Stórhöfði / Breiðhöfði",
        "lat": 64.128853,
        "lon": -21.82392
    },
    "90000343": {
        "code": "SUÐURFE",
        "name": "Suðurfell",
        "lat": 64.099588,
        "lon": -21.82799
    },
    "90000344": {
        "code": "NORÐUR4",
        "name": "Norðurfell / Æsufell",
        "lat": 64.101751,
        "lon": -21.830021
    },
    "90000345": {
        "code": "VESTU12",
        "name": "Vesturberg / Norðurfell",
        "lat": 64.103687,
        "lon": -21.824862
    },
    "90000346": {
        "code": "VESTU11",
        "name": "Vesturberg",
        "lat": 64.105647,
        "lon": -21.823142
    },
    "90000347": {
        "code": "VESTU10",
        "name": "Vesturberg / Suðurhólar",
        "lat": 64.107929,
        "lon": -21.821143
    },
    "90000348": {
        "code": "HÖFÐAB2",
        "name": "Árbæjarsafn",
        "lat": 64.118633,
        "lon": -21.813898
    },
    "90000349": {
        "code": "STRENG3",
        "name": "Strengur / Laxakvísl",
        "lat": 64.121233,
        "lon": -21.817246
    },
    "60000079": {
        "code": "MERKIG2",
        "name": "Merkigil / Vesturgil",
        "lat": 65.683492,
        "lon": -18.138369
    },
    "60000078": {
        "code": "MERKIG5",
        "name": "Merkigil / Vesturgil",
        "lat": 65.683851,
        "lon": -18.138579
    },
    "60000077": {
        "code": "MERKIG3",
        "name": "Merkigil / Kiðagil",
        "lat": 65.684187,
        "lon": -18.131765
    },
    "60000076": {
        "code": "MERKIG4",
        "name": "Merkigil / Kiðagil",
        "lat": 65.684259,
        "lon": -18.130902
    },
    "60000075": {
        "code": "HLÍÐA19",
        "name": "Hlíðarbraut / Borgarbraut",
        "lat": 65.686596,
        "lon": -18.129162
    },
    "10000909": {
        "code": "HLÍÐA10",
        "name": "Hlíðardalsvegur / Krossalind",
        "lat": 64.102217,
        "lon": -21.863889
    },
    "60000074": {
        "code": "BORGAR5",
        "name": "Borgarbraut / Háskóli",
        "lat": 65.687289,
        "lon": -18.122405
    },
    "10000908": {
        "code": "HLÍÐA11",
        "name": "Hlíðardalsvegur / Iðalind",
        "lat": 64.098855,
        "lon": -21.86228
    },
    "60000073": {
        "code": "BORGAR8",
        "name": "Borgarbraut / Háskóli",
        "lat": 65.687106,
        "lon": -18.120173
    },
    "60000072": {
        "code": "BORGAR7",
        "name": "Borgarbraut / Glerártorg",
        "lat": 65.688173,
        "lon": -18.103687
    },
    "60000071": {
        "code": "BORGAR6",
        "name": "Borgarbraut / Glerártorg",
        "lat": 65.688442,
        "lon": -18.103093
    },
    "60000070": {
        "code": "GLERÁR1",
        "name": "Glerárgata / Eyrarvegur",
        "lat": 65.687259,
        "lon": -18.096295
    },
    "82000007": {
        "code": "FSU",
        "name": "FSU",
        "lat": 63.932158,
        "lon": -20.999297
    },
    "82000006": {
        "code": "FSU1",
        "name": "Selfoss - FSU",
        "lat": 63.932287,
        "lon": -20.999224
    },
    "82000009": {
        "code": "SUNNULÆ",
        "name": "Sunnulækjarskóli",
        "lat": 63.926157,
        "lon": -20.994187
    },
    "82000008": {
        "code": "TRYGGV4",
        "name": "Tryggvagata / Suðurengi",
        "lat": 63.926847,
        "lon": -20.999575
    },
    "10000901": {
        "code": "SMÁRAH2",
        "name": "Smáralind",
        "lat": 64.100015,
        "lon": -21.889215
    },
    "82000014": {
        "code": "HÚSASMI",
        "name": "Húsasmiðjan",
        "lat": 63.932257,
        "lon": -21.015843
    },
    "10000900": {
        "code": "SMÁRAH3",
        "name": "Smárahvammsvegur / Hlíðarsmári",
        "lat": 64.097631,
        "lon": -21.891484
    },
    "82000013": {
        "code": "SUNDHÖ1",
        "name": "Selfoss - Sundhöll",
        "lat": 63.935719,
        "lon": -20.998998
    },
    "10000903": {
        "code": "SMÁRAHV",
        "name": "Smáralind",
        "lat": 64.099989,
        "lon": -21.889837
    },
    "82000016": {
        "code": "SANDVÍK",
        "name": "Sandvíkurbæir",
        "lat": 63.911659,
        "lon": -21.053337
    },
    "82000015": {
        "code": "EYRARVE",
        "name": "Eyrarvegur / Lágheiði",
        "lat": 63.931925,
        "lon": -21.016417
    },
    "10000905": {
        "code": "FÍFUHV8",
        "name": "Versalir",
        "lat": 64.091631,
        "lon": -21.858004
    },
    "82000010": {
        "code": "ERLURIM",
        "name": "Erlurimi / Sílatjörn",
        "lat": 63.928054,
        "lon": -20.991604
    },
    "10000904": {
        "code": "SMÁRAH1",
        "name": "Smárahvammsvegur / Hlíðarsmári",
        "lat": 64.097616,
        "lon": -21.891752
    },
    "90000350": {
        "code": "STRENG2",
        "name": "Strengur / Sílakvísl",
        "lat": 64.121369,
        "lon": -21.827198
    },
    "10000907": {
        "code": "HVAMMSV",
        "name": "Hvammsvegur",
        "lat": 64.096463,
        "lon": -21.858742
    },
    "82000012": {
        "code": "SUNDHÖL",
        "name": "Selfoss - Sundhöll",
        "lat": 63.935726,
        "lon": -20.998903
    },
    "90000351": {
        "code": "STRAUM4",
        "name": "Straumur / Nesti",
        "lat": 64.123209,
        "lon": -21.825763
    },
    "10000906": {
        "code": "KÁRSNE4",
        "name": "Kársnesbraut / Huldubraut",
        "lat": 64.114277,
        "lon": -21.914967
    },
    "82000011": {
        "code": "VALLAS1",
        "name": "Selfoss - Vallaskóli",
        "lat": 63.933829,
        "lon": -20.995979
    },
    "90000352": {
        "code": "ELLIÐA2",
        "name": "Elliðabraut / Sandavað",
        "lat": 64.099133,
        "lon": -21.780392
    },
    "90000353": {
        "code": "BÍLDSHÖ",
        "name": "Bíldshöfði / Vagnhöfði",
        "lat": 64.125553,
        "lon": -21.819096
    },
    "90000354": {
        "code": "BÍLDSH1",
        "name": "Bíldshöfði / Höfðabakki",
        "lat": 64.12564,
        "lon": -21.813708
    },
    "90000355": {
        "code": "HÖFÐABA",
        "name": "Höfðabakki / Dvergshöfði",
        "lat": 64.127211,
        "lon": -21.811826
    },
    "90000114": {
        "code": "NESVEG6",
        "name": "Kaplaskjól",
        "lat": 64.144683,
        "lon": -21.97099
    },
    "90000356": {
        "code": "FJALLKO",
        "name": "Funafold",
        "lat": 64.13638,
        "lon": -21.806745
    },
    "90000115": {
        "code": "KAPLAS2",
        "name": "KR",
        "lat": 64.146022,
        "lon": -21.96482
    },
    "90000357": {
        "code": "FJALLK1",
        "name": "Fjallkonuvegur / Hverafold",
        "lat": 64.135579,
        "lon": -21.801782
    },
    "90000116": {
        "code": "MEISTA2",
        "name": "Meistaravellir",
        "lat": 64.147147,
        "lon": -21.963372
    },
    "90000358": {
        "code": "FJALLK2",
        "name": "Fjallkonuvegur / Frostafold",
        "lat": 64.134635,
        "lon": -21.797646
    },
    "90000117": {
        "code": "MEISTA3",
        "name": "Meistaravellir / Grandavegur",
        "lat": 64.147845,
        "lon": -21.959979
    },
    "90000359": {
        "code": "FJALLK3",
        "name": "Fjallkonuvegur / Logafold",
        "lat": 64.135548,
        "lon": -21.793114
    },
    "90000317": {
        "code": "ROFABÆ6",
        "name": "Árbæjarskóli",
        "lat": 64.116201,
        "lon": -21.796686
    },
    "90000559": {
        "code": "STÓRH13",
        "name": "Stórhöfði / Tengivegur",
        "lat": 64.129017,
        "lon": -21.819683
    },
    "90000318": {
        "code": "ROFABÆ5",
        "name": "Rofabær / Hábær",
        "lat": 64.116903,
        "lon": -21.801745
    },
    "90000319": {
        "code": "ROFABÆ4",
        "name": "Rofabær / Hraunbær",
        "lat": 64.117902,
        "lon": -21.808532
    },
    "14001592": {
        "code": "HLÍÐAR6",
        "name": "Hlíðarberg / Móberg",
        "lat": 64.060179,
        "lon": -21.92368
    },
    "82000003": {
        "code": "OLÍS /",
        "name": "Selfoss - Olís",
        "lat": 63.943484,
        "lon": -21.008142
    },
    "14001593": {
        "code": "HLÍÐAB3",
        "name": "Hlíðarberg / Lindarberg",
        "lat": 64.062247,
        "lon": -21.925334
    },
    "82000002": {
        "code": "TRYGGVA",
        "name": "Selfoss - Ráðhúsið",
        "lat": 63.937351,
        "lon": -21.001897
    },
    "14001594": {
        "code": "HLÍÐAB2",
        "name": "Hlíðarberg / Klettaberg",
        "lat": 64.064481,
        "lon": -21.927641
    },
    "82000005": {
        "code": "TRYGGV1",
        "name": "Selfoss - Ráðhúsið",
        "lat": 63.937271,
        "lon": -21.001902
    },
    "14001595": {
        "code": "HLÍÐAB1",
        "name": "Setbergsskóli",
        "lat": 64.066093,
        "lon": -21.933594
    },
    "82000004": {
        "code": "ORKAN /",
        "name": "Selfoss - Olís",
        "lat": 63.943386,
        "lon": -21.008523
    },
    "14001596": {
        "code": "HLÍÐABE",
        "name": "Hlíðarberg / Hamraberg",
        "lat": 64.067181,
        "lon": -21.936016
    },
    "14001597": {
        "code": "LÆKJAR1",
        "name": "Lækjargata",
        "lat": 64.067344,
        "lon": -21.94798
    },
    "82000001": {
        "code": "FOSSNES",
        "name": "Selfoss - N1",
        "lat": 63.937022,
        "lon": -20.987522
    },
    "90000320": {
        "code": "HRAUNB1",
        "name": "Hraunbær",
        "lat": 64.119824,
        "lon": -21.807887
    },
    "90000321": {
        "code": "BÍLDSH3",
        "name": "Norðlingabraut / Helluvað",
        "lat": 64.102624,
        "lon": -21.766771
    },
    "90000322": {
        "code": "BUGÐA",
        "name": "Bugða / Kambavað",
        "lat": 64.100787,
        "lon": -21.765827
    },
    "90000323": {
        "code": "ELLIÐA3",
        "name": "Elliðabraut / Bugða",
        "lat": 64.097712,
        "lon": -21.779661
    },
    "90000324": {
        "code": "BÚSTAÐ6",
        "name": "Leiti",
        "lat": 64.125435,
        "lon": -21.896738
    },
    "90000325": {
        "code": "BÚSTAÐA",
        "name": "Veðurstofan",
        "lat": 64.127259,
        "lon": -21.907243
    },
    "90000326": {
        "code": "BÚSTAÐ1",
        "name": "Perlan",
        "lat": 64.130237,
        "lon": -21.913789
    },
    "90000327": {
        "code": "EINARS3",
        "name": "Einarsnes",
        "lat": 64.129536,
        "lon": -21.949619
    },
    "90000329": {
        "code": "EINARS2",
        "name": "Einarsnes",
        "lat": 64.129624,
        "lon": -21.949739
    },
    "87170001": {
        "code": "ÞORLÁKS",
        "name": "Þorlákshöfn",
        "lat": 63.856668,
        "lon": -21.383841
    },
    "13001362": {
        "code": "ARNAR12",
        "name": "Arnarnesvegur / Nónhæð",
        "lat": 64.096512,
        "lon": -21.894143
    },
    "14001590": {
        "code": "HLÍÐAR4",
        "name": "Hlíðarberg / Engjahlíð",
        "lat": 64.060324,
        "lon": -21.932901
    },
    "14001591": {
        "code": "HLÍÐAR5",
        "name": "Hlíðarberg / Sóleyjarhlíð",
        "lat": 64.058767,
        "lon": -21.927344
    },
    "14001582": {
        "code": "ÁLFASK2",
        "name": "Álfaskeið / Mávahraun",
        "lat": 64.074792,
        "lon": -21.942185
    },
    "49110001": {
        "code": "HÓLMAVÍ",
        "name": "Hólmavík - Kaupfélag",
        "lat": 65.700898,
        "lon": -21.685735
    },
    "14001583": {
        "code": "SÓLVAN1",
        "name": "Sólvangur",
        "lat": 64.0689,
        "lon": -21.939511
    },
    "14001585": {
        "code": "HJALLAH",
        "name": "Hjallahraun",
        "lat": 64.078219,
        "lon": -21.947617
    },
    "14001586": {
        "code": "SUÐURB2",
        "name": "Suðurbraut / Þúfubarð",
        "lat": 64.058719,
        "lon": -21.971502
    },
    "14001587": {
        "code": "HRINGB7",
        "name": "Suðurbæjarlaug",
        "lat": 64.060403,
        "lon": -21.962432
    },
    "14001588": {
        "code": "HLÍÐARB",
        "name": "Hlíðarberg / 10-11",
        "lat": 64.066405,
        "lon": -21.935842
    },
    "90000330": {
        "code": "HRINGB3",
        "name": "Landspítalinn",
        "lat": 64.13756,
        "lon": -21.927844
    },
    "14001589": {
        "code": "HLÍÐAR3",
        "name": "Hlíðarberg / Birkihlíð",
        "lat": 64.062642,
        "lon": -21.93457
    },
    "90000331": {
        "code": "HRINGB4",
        "name": "BSÍ",
        "lat": 64.138581,
        "lon": -21.934487
    },
    "90000332": {
        "code": "HRINGB5",
        "name": "Háskóli Íslands",
        "lat": 64.14222,
        "lon": -21.946825
    },
    "90000333": {
        "code": "NAUTHÓL",
        "name": "Nauthóll - HR",
        "lat": 64.124713,
        "lon": -21.927988
    },
    "90000334": {
        "code": "STÓRHÖ3",
        "name": "Stórhöfði / Höfðabakki",
        "lat": 64.129027,
        "lon": -21.814546
    },
    "90000335": {
        "code": "STÓRHÖ4",
        "name": "Bugða / Lindarvað",
        "lat": 64.100203,
        "lon": -21.770962
    },
    "90000336": {
        "code": "BUGÐA V",
        "name": "Bugða / Móvað",
        "lat": 64.098996,
        "lon": -21.773999
    },
    "90000338": {
        "code": "SELJABR",
        "name": "Bugða / Reiðvað",
        "lat": 64.098217,
        "lon": -21.776816
    },
    "90000537": {
        "code": "SELÁSB5",
        "name": "Selásbraut / Þverás",
        "lat": 64.102823,
        "lon": -21.783553
    },
    "90000779": {
        "code": "MIMISB1",
        "name": "Mimisbrunnur / Úlfarsbraut",
        "lat": 64.1348595193503,
        "lon": -21.7459323444902
    },
    "90000780": {
        "code": "BORGA12",
        "name": "Borgartún / Nóatún",
        "lat": 64.1457430268965,
        "lon": -21.9018100702188
    },
    "90000781": {
        "code": "BORGA13",
        "name": "Borgartún / Nóatún",
        "lat": 64.1458538511298,
        "lon": -21.902033705472
    },
    "80000001": {
        "code": "LANDEYJ",
        "name": "Landeyjahöfn",
        "lat": 63.5323020405119,
        "lon": -20.1197098339123
    },
    "90000542": {
        "code": "ÞÚSÖLD",
        "name": "Þúsöld",
        "lat": 64.129225,
        "lon": -21.765284
    },
    "90000784": {
        "code": "FLYÐRUG",
        "name": "Flyðrugrandi",
        "lat": 64.1464975865129,
        "lon": -21.9649264770744
    },
    "90000301": {
        "code": "BÚSTAÐ3",
        "name": "Perlan",
        "lat": 64.130145,
        "lon": -21.914348
    },
    "90000302": {
        "code": "BÚSTAÐ2",
        "name": "Veðurstofan",
        "lat": 64.12699,
        "lon": -21.907186
    },
    "90000303": {
        "code": "RAFSTÖÐ",
        "name": "Rafstöðvarvegur",
        "lat": 64.123938,
        "lon": -21.840328
    },
    "90000304": {
        "code": "FYLKISV",
        "name": "Fylkisvegur",
        "lat": 64.114242,
        "lon": -21.790704
    },
    "90000546": {
        "code": "GVENDAR",
        "name": "Gvendargeisli / Þórðarsveigur",
        "lat": 64.126337,
        "lon": -21.744283
    },
    "90000305": {
        "code": "FYLKIS1",
        "name": "Fylkisvegur",
        "lat": 64.11428,
        "lon": -21.790484
    },
    "90000547": {
        "code": "KRISTNI",
        "name": "Kristnibraut / Prestastígur",
        "lat": 64.126919,
        "lon": -21.752396
    },
    "90000306": {
        "code": "STÓRH11",
        "name": "Stórhöfði / Breiðhöfði",
        "lat": 64.12877,
        "lon": -21.823604
    },
    "90000548": {
        "code": "KRISTN1",
        "name": "Ingunnarskóli",
        "lat": 64.126812,
        "lon": -21.757564
    },
    "90000549": {
        "code": "GVENDA2",
        "name": "Gvendargeisli / Sæmundarsel",
        "lat": 64.125966,
        "lon": -21.740398
    },
    "90000308": {
        "code": "STÓRHÖ9",
        "name": "Stórhöfði / Höfðabakki",
        "lat": 64.128908,
        "lon": -21.814619
    },
    "90000550": {
        "code": "KRISTN2",
        "name": "Kristnibraut / Maríubaugur",
        "lat": 64.127102,
        "lon": -21.767292
    },
    "90000551": {
        "code": "BISKUPS",
        "name": "Biskupsgata",
        "lat": 64.125667,
        "lon": -21.735566
    },
    "90000797": {
        "code": "NORÐURÁ",
        "name": "Norðurás",
        "lat": 64.113354,
        "lon": -21.784981
    },
    "90000556": {
        "code": "GRENSÁ8",
        "name": "Grensásvegur / Skálagerði",
        "lat": 64.126062,
        "lon": -21.878182
    },
    "90000315": {
        "code": "HRAUNSÁ",
        "name": "Hraunsás",
        "lat": 64.113179,
        "lon": -21.788441
    },
    "90000557": {
        "code": "GRENSÁ9",
        "name": "Grensásvegur / Breiðagerði",
        "lat": 64.12604,
        "lon": -21.87778
    },
    "90000316": {
        "code": "ROFABÆ7",
        "name": "Rofabær / Brekkubær",
        "lat": 64.115511,
        "lon": -21.791777
    },
    "90000558": {
        "code": "STÓRH12",
        "name": "Stórhöfði / Tengivegur",
        "lat": 64.129084,
        "lon": -21.820368
    }
}

export default busStopNames
