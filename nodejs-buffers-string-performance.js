console.log("---------Testing Buffers--------");

var len = 1000;
var baseMemory = process.memoryUsage().heapUsed;
var stringToWrite = [
"<!-- start slipsum code -->Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.<!-- end slipsum code -->",
"Random things that don't seem to make much sense when repeated over and over.  Random things that don't seem to make much sense when repeated over and over.  Random things that don't seem to make much sense when repeated over and over.",
"Yes, I know that there are performance issues with having to do this over and over, that's why we test these things ahead of time.",
"No, I'm not sure why there wouldn't be a string buffer built into Node.JS that does appends natively.  It seems very odd to me too."
];

console.log('Name        Iterations       Duration                Memory');
console.log('======================================================================');
timer('Buffer',
function() {
	bufferBuild(stringToWrite, len);
}, len);
timer('Array',
function() {
	arrayJoin(stringToWrite, len);
}, len);
timer('String',
function() {
	stringConcat(stringToWrite, len);
}, len);

len *= 10;
timer('Buffer',
function() {
	bufferBuild(stringToWrite, len);
}, len);
timer('Array',
function() {
	arrayJoin(stringToWrite, len);
}, len);
timer('String',
function() {
	stringConcat(stringToWrite, len);
}, len);

len *= 10;
timer('Buffer',
function() {
	bufferBuild(stringToWrite, len);
}, len);
timer('Array',
function() {
	arrayJoin(stringToWrite, len);
}, len);
timer('String',
function() {
	stringConcat(stringToWrite, len);
}, len);


function bufferBuild(s, l){
    var ii, i, len = s.length, offset = 0;
    var buffSize = s[0].length * s.length * l;
    //console.log('Buffer Len: ' + buffSize.toString());
    //console.log('Buffer Size Type: ' + (typeof buffSize).toString());
    var b = new Buffer(buffSize);

    for (ii = 0; ii < l; ii++){
        for (i = 0; i < len; i++){
            b.write(s[i], offset);
			offset += s[i].length;
        }
    }

    return b.toString('utf8', 0, offset);
}

function arrayJoin(s, l){
    var ii, i, b = [], x, len;

    for (ii = 0; ii < l; ii++){
        for (i = 0, len = s.length; i < len; i++){
             b.push(s[i]);
        }
    }
	return b.join("");
}

function stringConcat(s, l){
    var ii, i, b, x, len;

    for (ii = 0; ii < l; ii++){
        for (i = 0, len = s.length; i < len; i++){
            b += s[i];
        }
    }
	return b;
}

function timer(name, f, i){
    var startTime = new Date().getTime();

    f();

    var endTime = new Date().getTime();

	var iterations = i.toString();
	var timing = (endTime - startTime).toString() + "ms";
	var memory = (process.memoryUsage().heapUsed - baseMemory).toString();
	//Name        Duration                Memory
	console.log(
		name + Array(13 - name.length).join(' ') +
		iterations + Array(18 - iterations.length).join(' ') +
		timing + Array(25 - timing.length).join(' ') +
		memory
	);
}
