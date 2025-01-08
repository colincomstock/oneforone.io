export default function numberCondenser(uncondensedNumber) {
    const num = Number(uncondensedNumber);

    if(6 >= uncondensedNumber.toString().length && uncondensedNumber.toString().length >= 4) {
        const thousands = Math.floor(num / 1000 );
        const hundredsRounded = Math.floor((num % 1000) / 100);
        return `${thousands}.${hundredsRounded}K`.replace('.0', '')
    } else if (uncondensedNumber.toString().length >= 7){
        const millions = Math.floor(num / 1000000)
        const hundredThousandsRounded = Math.floor((num % 1000000) / 100000)
        return `${millions}.${hundredThousandsRounded}M`.replace('.0', '')
    } else {
        return uncondensedNumber.toString();
    }
}