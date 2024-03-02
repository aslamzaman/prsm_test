export const Lib = {
    util: {
        daysArray: [
            "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
        ],
        monthEnArr: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        monthBnArr: [
            "Rvbyqvix",
            "†deªæqvix",
            "gvP©",
            "GwcÖj",
            "†g",
            "Ryb",
            "RyjvB",
            "AvMó",
            "†m‡Þ¤^i",
            "A‡±vei",
            "b‡f¤^i",
            "wW‡m¤^i"
        ],
        monthsObj: [
            { bn: "Rvbyqvix", en: "January" },
            { bn: "†deªæqvix", en: "February" },
            { bn: "gvP©", en: "March" },
            { bn: "GwcÖj", en: "April" },
            { bn: "†g", en: "May" },
            { bn: "Ryb", en: "June" },
            { bn: "RyjvB", en: "July" },
            { bn: "AvMó", en: "August" },
            { bn: "†m‡Þ¤^i", en: "September" },
            { bn: "A‡±vei", en: "October" },
            { bn: "b‡f¤^i", en: "November" },
            { bn: "wW‡m¤^i", en: "December" }
        ],
        yearObj: [
            { yr: 2023 },
            { yr: 2024 },
            { yr: 2025 },
            { yr: 2026 },
            { yr: 2027 },
            { yr: 2028 },
            { yr: 2029 },
            { yr: 2030 },
            { yr: 2031 },
            { yr: 2032 },
            { yr: 2033 },
            { yr: 2034 },
            { yr: 2035 },
            { yr: 2036 },
            { yr: 2037 },
            { yr: 2038 },
            { yr: 2039 },
            { yr: 2040 }
        ],
        dateFormat(dt: string, format: string) {
            // *** date_format:("2010-06-25",".")      result= 25.06.2010
            let d = new Date(dt);
            if (format === "-") {
                return d.getFullYear() + "-" + this.daysArray[d.getMonth() + 1] + "-" + this.daysArray[d.getDate()];
            } else if (format === "long") {
                return this.monthEnArr[d.getMonth()] + " " + this.daysArray[d.getDate()] + ", " + d.getFullYear();
            } else {
                return this.daysArray[d.getDate()] + "." + this.daysArray[d.getMonth() + 1] + "." + d.getFullYear();
            }
        },
        dateTimeFormat(dt: string) {
            var d = new Date(dt);
            return d.getFullYear() + "-" + this.daysArray[d.getMonth() + 1] + "-" + this.daysArray[d.getDate()] + " | " + this.daysArray[d.getHours() + 1] + ":" + this.daysArray[d.getMinutes() + 1] + ":" + this.daysArray[d.getSeconds() + 1];
        },
        dateFormatBn(dt: string) {
            var d = new Date(dt);
            return this.daysArray[d.getDate()] + " " + this.monthBnArr[d.getMonth()] + ", " + d.getFullYear();
        },
        yearsMontshDays(d1: string, d2: string) {
            let a = new Date(d1).getTime();
            let b = new Date(d2).getTime();
            let days = (b - a) / 86400000; // days

            let y = Math.floor(days / 365); // yrs
            let yrsToDays = days % 365; // days

            let m = Math.floor(yrsToDays / 30); // months
            let d = yrsToDays % 30; // days

            let ret = y + "yrs. " + m + "months " + d + "days";
            return ret;
        },
        lastDayInMonth(yyyy: number, m: number) {
            // example (2021, 0) = 31 ; (2021, 1) = 28;
            let dt = new Date(yyyy, (m + 1), 0);
            return dt.getDate();
        },
        Age(dt: string) {
            let d1 = new Date(dt);
            let d2 = d1.getTime();
            let d3 = new Date();
            let d4 = d3.getTime();
            let d5 = (d4 - d2) / (1000 * 60 * 60 * 24 * 365);
            return d5.toFixed(2);
        },
        dateDiff(dt1: string, dt2: string, add_one_day: number) {
            let d1 = new Date(dt1);
            let d2 = d1.getTime();
            let d3 = new Date(dt2);
            let d4 = d3.getTime();
            let d5 = 0;
            if (add_one_day === 1) {
                d5 = ((d4 - d2) + (3600000 * 24)) / (3600000 * 24);
            } else {
                d5 = (d4 - d2) / (3600000 * 24);
            }
            return d5;
        },
        titleCase(str: string) {
            return str
                .split(" ")
                .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        },
        dateAdd(dt: string, days: number) {
            let d1 = new Date(dt);
            let dt_to_time = d1.getTime();
            let days_to_time = days * 86400 * 1000;
            let total_time = dt_to_time + days_to_time;
            let date_add = new Date(total_time);
            return date_add;
        },
        manulalDateDiff(da1: string, da2: string) {
            var d1 = new Date(da1);
            var d2 = new Date(da2);

            let dt1 = d1.getFullYear() + "-" + this.daysArray[d1.getMonth() + 1] + "-" + this.daysArray[d1.getDate()];
            let dt2 = d2.getFullYear() + "-" + this.daysArray[d2.getMonth() + 1] + "-" + this.daysArray[d2.getDate()];

            let sp1 = dt1.split("-");
            let sp2 = dt2.split("-");

            let extMonth = 0;
            let d = 0;
            let extYrs = 0;
            let m = 0;
            let y = 0;

            // Days 
            if (parseInt(sp2[2]) < parseInt(sp1[2])) {
                extMonth = 1;
                d = ((parseInt(sp2[2]) + 30) - parseInt(sp1[2]));
            } else {
                extMonth = 0;
                d = (parseInt(sp2[2]) - parseInt(sp1[2]));
            }

            // Months 
            if (parseInt(sp2[1]) < (parseInt(sp1[1]) + extMonth)) {
                extYrs = 1;
                m = ((parseInt(sp2[1]) + 12) - (parseInt(sp1[1]) + extMonth));
            } else {
                extYrs = 0;
                m = (parseInt(sp2[1]) - (parseInt(sp1[1]) + extMonth));
            }

            // Years 
            y = (parseInt(sp2[0]) - (parseInt(sp1[0]) + extYrs));

            let result = y + " years " + m + " months " + d + " days";
            return result;
        },
        numberWithCommas(x: number) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        inword: {
            bn(number: string) {
                let num_to_bd = [
                    'k~b¨',
                    'GK',
                    '`yB',
                    'wZb',
                    'Pvi',
                    'cvuP',
                    'Qq',
                    'mvZ',
                    'AvU',
                    'bq',
                    '`k',
                    'GMvi',
                    'evi',
                    '‡Zi',
                    '‡PŠÏ',
                    'c‡bi',
                    '‡lvj',
                    'm‡Zi',
                    'AvVvi',
                    'Ewbk',
                    'wek',
                    'GKyk',
                    'evBk',
                    '‡ZBk',
                    'PweŸk',
                    'cuwPk',
                    'QvweŸk',
                    'mvZvk',
                    'AvVvk',
                    'EbwÎk',
                    'wÎk',
                    'GKwÎk',
                    'ewÎk',
                    '‡ZwÎk',
                    '‡PŠwÎk',
                    'cuh়wÎk',
                    'QwÎk',
                    'mvuBwÎk',
                    'AvUwÎk',
                    'EbPwjøk',
                    'Pwjøk',
                    'GKPwjøk',
                    'weqvwjøk',
                    '‡ZZvwjøk',
                    'Pyqvwjøk',
                    'cuqZvwjøk',
                    '‡QPwjøk',
                    'mvZPwjøk',
                    'AvUPwjøk',
                    'EbcÂvk',
                    'cÂvk',
                    'GKvbœ',
                    'evqvbœ',
                    'wZàvbœ',
                    'Pyqvbœ',
                    'cÂvbœ',
                    'Qvàvbœ',
                    'mvZvbœ',
                    'AvUvbœ',
                    'EblvU',
                    'lvU',
                    'GKlwÆ',
                    'evlwÆ',
                    '‡ZlwÆ',
                    '‡PŠlwÆ',
                    'cuqlwÆ',
                    '‡QlwÆ',
                    'mvZlwÆ',
                    'AvUlwÆ',
                    'EbmËi',
                    'mËi',
                    'GKvËi',
                    'evnvËi',
                    'wZqvËi',
                    'PyqvËi',
                    'cuPvËi',
                    'wQqvËi',
                    'mvZvËi',
                    'AvUvËi',
                    'EbAvwk',
                    'Avwk',
                    'GKvwk',
                    'weivwk',
                    'wZivwk',
                    'Pyivwk',
                    'cuPvwk',
                    'wQqvwk',
                    'mvZvwk',
                    'AvUvwk',
                    'EbbeŸB',
                    'beŸB',
                    'GKvbeŸB',
                    'weivbeŸB',
                    'wZivbeŸB',
                    'PyivbeŸB',
                    'cuPvbeŸB',
                    'wQqvbeŸB',
                    'mvZvbeŸB',
                    'AvUvbeŸB',
                    'wbivbeŸB'
                ];

                let num = number.toString();
                //00,00,20,000
                let n = "000000000000" + num.toString();
                let n1 = n.substring((n.length - 9), n.length);
                let n2 = n1.toString();
                let n3 = n2.split("");

                let c1 = parseInt(n3[0] + n3[1]);
                let c2 = parseInt(n3[2] + n3[3]);
                let c3 = parseInt(n3[4] + n3[5]);
                let c4 = parseInt(n3[6]);
                let c5 = parseInt(n3[7] + n3[8]);

                let st1 = "";
                let st2 = "";
                let st3 = "";
                let st4 = "";
                let st5 = "";

                if (c1 === 0) {
                    st1 = "";
                } else {
                    st1 = num_to_bd[c1] + " †KvwU ";
                }

                if (c2 === 0) {
                    st2 = "";
                } else {
                    st2 = num_to_bd[c2] + " j¶ ";
                }

                if (c3 === 0) {
                    st3 = "";
                } else {
                    st3 = num_to_bd[c3] + " nvRvi ";
                }


                if (c4 === 0) {
                    st4 = "";
                } else {
                    st4 = num_to_bd[c4] + " kZ ";
                }

                if (c5 === 0) {
                    st5 = "";
                } else {
                    st5 = num_to_bd[c5];
                }

                if (number.length > 9) {
                    return "Amxg";
                } else {
                    return st1 + st2 + st3 + st4 + st5;
                }
            },
            en(){
                const numbersToWords: { [key: number]: string } = {
                    0: "zero",
                    1: "one",
                    2: "two",
                    3: "three",
                    4: "four",
                    5: "five",
                    6: "six",
                    7: "seven",
                    8: "eight",
                    9: "nine",
                    10: "ten",
                    11: "eleven",
                    12: "twelve",
                    13: "thirteen",
                    14: "fourteen",
                    15: "fifteen",
                    16: "sixteen",
                    17: "seventeen",
                    18: "eighteen",
                    19: "nineteen",
                    20: "twenty",
                    30: "thirty",
                    40: "forty",
                    50: "fifty",
                    60: "sixty",
                    70: "seventy",
                    80: "eighty",
                    90: "ninety",
                  };
                  
                  // Define the convertNumberToWords function
                  function convertNumberToWords(number: number): string {
                    // if number present in object no need to go further
                    if (number in numbersToWords) return numbersToWords[number];
                  
                    // Initialize the words variable to an empty string
                    let words = "";
                  
                    // If the number is greater than or equal to 100, handle the hundreds place (ie, get the number of hundres)
                    if (number >= 100) {
                      // Add the word form of the number of hundreds to the words string
                      words += convertNumberToWords(Math.floor(number / 100)) + " hundred";
                  
                      // Remove the hundreds place from the number
                      number %= 100;
                    }
                  
                    // If the number is greater than zero, handle the remaining digits
                    if (number > 0) {
                      // If the words string is not empty, add "and"
                      if (words !== "") words += " and ";
                  
                      // If the number is less than 20, look up the word form in the numbersToWords object
                      if (number < 20) words += numbersToWords[number];
                      else {
                        // Otherwise, add the word form of the tens place to the words string
                        //if number = 37, Math.floor(number /10) will give you 3 and 3 * 10 will give you 30
                        words += numbersToWords[Math.floor(number / 10) * 10];
                  
                        // If the ones place is not zero, add the word form of the ones place
                        if (number % 10 > 0) {
                          words += "-" + numbersToWords[number % 10];
                        }
                      }
                    }
                  
                    // Return the word form of the number
                    return words;
                  }
            }


        }
    }
}