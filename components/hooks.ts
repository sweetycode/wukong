import { httpGet } from "@wukong/utilities/http"
import { addEscKeyListener } from "../utilities/dom"
import { useEffect, useState, type Dispatch, type Inputs, type StateUpdater } from "preact/hooks"


export function usePageTitle(title: string) {
    useEffect(() => {
        document.title = title
    }, [])
}


export function useErrorCaptureState<T>(): [Error|null, (fn: () => T) => (T|null), (promise: Promise<T>) => Promise<T|void>] {
    const [error, setError] = useState(null)

    return [
        error,
        fn => {
            try {
                const res = fn()
                setError(null)
                return res
            } catch (e) {
                setError(e)
            }
        },
        promise => {
            return promise.then(v => {setError(null); return v}, setError)
        },
    ]
}

export function useObjectState<S>(initialState: S|(() => S)): [S, Dispatch<{[key in keyof S]?: S[key]}>, Dispatch<StateUpdater<S>>]  {
    const [value, setValue] = useState<S>(initialState)
    return [value, (partials) => {setValue({...value, ...partials})}, setValue]
}

export function useToggleState(initialState: boolean|(() => boolean) = false): [boolean, () => void, Dispatch<StateUpdater<boolean>>] {
    const [value, setValue] = useState<boolean>(initialState)
    return [
        value,
        () => setValue(value => !value),
        setValue,
    ]
}


export function useFullscreenToggleState(initialState: boolean|(() => boolean) = false): [boolean, () => void] {
    const [value, setValue] = useState(initialState)
    return [
        value,
        () => setValue(old => {
            var newValue = !old
            if (newValue) {
                addEscKeyListener(() => setValue(false))
            }
            return newValue
        })
    ]
}


export function useHttpGet(url: string, callback: (body: Object) => any, inputs: Inputs = []) {
    useEffect(() => {
        httpGet(url).then(callback)
    }, inputs)
}

export function useHttpBody<T>(url: string, initialState: T|(()=>T), inputs: Inputs): T {
    const [value, setValue] = useState<T>(initialState)
    useHttpGet(url, setValue, inputs)
    return value
}
