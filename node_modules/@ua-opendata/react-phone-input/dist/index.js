import { forwardRef, createElement } from 'react';
import InputMask from 'react-input-mask';

const beforeMaskedValueChange = (nextState, prevState, userInput, maskOptions) => {
    if (userInput) {
        const match = userInput.replace(/\D/g, '').match(/^(?:38)?0(\d{1,9})/);
        if (match && "string" === typeof maskOptions.mask) {
            const userNumbers = match[1].split('');
            return Object.assign(Object.assign({}, nextState), { value: maskOptions.mask.replace(/9/g, (s) => {
                    const userNumber = userNumbers.shift();
                    return (userNumber === undefined) ? s : userNumber;
                }) });
        }
    }
    if (nextState.value.match(/^\+38 \(038\)/)) {
        return {
            value: '',
            selection: { start: 7, end: 7, }
        };
    }
    if (nextState.value.match(/^\+38 \(00[1-9]\)/)) {
        const value = nextState.value.replace(/^\+38 \(00([1-9])\)/, '+38 (0$1)');
        return {
            value,
            selection: { start: 7, end: 7, }
        };
    }
    return nextState;
};
const PhoneInputDefaultProps = Object.freeze({
    beforeMaskedValueChange,
    mask: "+38 (099) 999-99-99",
    alwaysShowMask: false,
    inputMode: "tel",
});
const PhoneInput = forwardRef((props, ref) => {
    return (createElement(InputMask, Object.assign({ maskChar: null }, props, PhoneInputDefaultProps)));
});

export { PhoneInput, PhoneInputDefaultProps, beforeMaskedValueChange };
