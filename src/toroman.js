// jshint esversion: 6


var cntable = {
    1: ['I', 'V', 'X'],
    10 : ['X', 'L', 'C'],
    100 : ['C', 'D', 'M'],
    1000 : ['M']
};

function convertDigit(n, tens) {
    var res='';
    var larger=1;
    if (n>=5) {
        larger=2;
        n-=5;
        if (n<=3) res=cntable[tens][1];
    }
    if (n<=3) {
        for (let j=0; j<n; j++) res+=cntable[tens][0];
    }
    else if (n===4) {
        res+=cntable[tens][0];
        res+=cntable[tens][larger];
    }
    return res;
}

function convertToRoman(num) {
    if (num<1 || num>4999) return 0;
    var snum = num.toString().split('');
    var slen=snum.length;
    var res='';
    for (let i=0; i<slen; i++) {
        var n=Number(snum[i]);
        if (n !== 0) 
          res+=convertDigit(n, Math.pow(10, slen-1-i));
    }
    return res;
}

export default convertToRoman;
