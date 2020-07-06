var buf1 = Buffer.from('123456789');
var buf2=Buffer.from('HELLO');

buf2.copy(buf1,2);                                              //Copy data from one buffer to another , starting from 3rd element

console.log(buf1.toString());                         
console.log(Buffer.concat([buf1,buf2]).toString());             //Add two strings

console.log(buf1.equals(buf2));                                //check if they are equal
console.log(Buffer.compare(buf1,buf2));                        //know the difference between the string