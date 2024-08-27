let _autoIncVal = 0
const _onceRemeber = new Map<string, any>()


const _ = {
    get: function <T>(data: {[key: string]: T}|null, key: string, defaultValue: T|null = null): T|null {
        return data != null ? (data[key] ?? defaultValue): defaultValue
    },

    incrementalGet: () => ++_autoIncVal,

    debounce: (callback: Function, wait: number) => {
        let timeoutId: number|null = null;
        return (...args: any[]) => {
          timeoutId && window.clearTimeout(timeoutId);
          timeoutId = window.setTimeout(() => {
            callback(...args);
          }, wait);
        };
    },

    plural: (noun: string) => {
        if (noun.endsWith('y')) { // category -> categories
            return noun.substring(0, noun.length - 1) + 'ies'
        }
        return noun + 's'
    },

    singular: (noun: string) => {
        if (noun.endsWith('ies')) {
            return noun.substring(0, noun.length - 3) + 'y'
        }
        if (noun.endsWith('s')) {
            return noun.substring(0, noun.length - 1)
        }
        return noun
    },

    capitalize: (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    camel: (str: string) => {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(_, chr)
            {
                return chr.toUpperCase();
            });
    },
    hash: (s: string) => {
        let hash = 0
        if (s.length === 0) return hash;
        for (let i = 0; i < s.length; i++) {
            let chr = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    },
    curry(fn: Function, ...bindArgs: any[]): Function {
        return (...args: any[]) => fn(...bindArgs, ...args)
    },
    curryRight(fn: Function, ...bindArgs: any): Function {
        return (...args: any[]) => fn(...args, ...bindArgs)
    },
    flip(data: {[key: string]: string}): {[key: string]: string} {
        return Object.fromEntries(
            Object
              .entries(data)
              .map(([key, value]) => [value, key])
            );
    },
    once<T>(key: string, fn: () => T): T {
        if (_onceRemeber.has(key)) {
            return _onceRemeber.get(key)
        }
        const ret = fn()
        _onceRemeber.set(key, ret)
        return ret
    },
}


export default _;
