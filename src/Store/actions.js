export const SET_NUM = 'SET_NUM';
export const SET_PREV_NUM = 'SET_PREV_NUM';
export const SET_OPERATOR = 'SET_OPERATOR';

export function setNum(num) {
    return {
        type: SET_NUM,
        num
    };
}

export function setPrevNum(prevNum) {
    return {
        type: SET_PREV_NUM,
        prevNum
    };
}

export function setOperator(operator) {
    return {
        type: SET_OPERATOR,
        operator
    };
}
