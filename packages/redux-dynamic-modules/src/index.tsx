import React, { useEffect, PropsWithChildren, useState } from "react";
import { IModuleStore, IModuleTuple } from "redux-dynamic-modules-core";
import { useStore } from "@react-nano/redux";

/** Provide modules to load */
export interface DynamicModuleLoaderProps {
    /** Modules that need to be dynamically registered */
    modules: IModuleTuple;
}

/**
 * The DynamicModuleLoader adds a way to register a module on mount
 * When this component is initialized, the reducer and saga from the module passed as props will be registered with the system
 * On unmount, they will be unregistered
 */
export const DynamicModuleLoader = ({ modules, children }: PropsWithChildren<DynamicModuleLoaderProps>) => {
    const store = useStore() as IModuleStore<unknown>;
    const [active, setActive] = useState(false);
    useEffect(() => {
        const added = store.addModules(modules);
        setActive(true);
        return () => added.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store]);
    return active ? <>{children}</> : null;
};
