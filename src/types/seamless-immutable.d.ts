declare module "seamless-immutable" {
    type ImmutableObject<T> = T & {
        merge(other: Partial<T>): ImmutableObject<T>;
        set<K extends keyof T>(key: K, value: T[K]): ImmutableObject<T>;
        asMutable(opts?: { deep: boolean }): T;
    };
    interface ImmutableStatic {
        <T>(obj: T): ImmutableObject<T>;
        from<T>(obj: T): ImmutableObject<T>;
    }
    const Immutable: ImmutableStatic;
    export default Immutable;
}
