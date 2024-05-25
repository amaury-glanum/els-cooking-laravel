

export const useCapitalize = (string)=> {
    return string.length > 0 ? string.replace(/^\w/, (c) => c.toUpperCase()) : string
}


