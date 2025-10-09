
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model call
 * 
 */
export type call = $Result.DefaultSelection<Prisma.$callPayload>
/**
 * Model call_family
 * 
 */
export type call_family = $Result.DefaultSelection<Prisma.$call_familyPayload>
/**
 * Model call_formation
 * 
 */
export type call_formation = $Result.DefaultSelection<Prisma.$call_formationPayload>
/**
 * Model formation
 * 
 */
export type formation = $Result.DefaultSelection<Prisma.$formationPayload>
/**
 * Model program
 * 
 */
export type program = $Result.DefaultSelection<Prisma.$programPayload>
/**
 * Model sequence
 * 
 */
export type sequence = $Result.DefaultSelection<Prisma.$sequencePayload>
/**
 * Model sequence_calls
 * 
 */
export type sequence_calls = $Result.DefaultSelection<Prisma.$sequence_callsPayload>
/**
 * Model country
 * 
 */
export type country = $Result.DefaultSelection<Prisma.$countryPayload>
/**
 * Model dancer
 * 
 */
export type dancer = $Result.DefaultSelection<Prisma.$dancerPayload>
/**
 * Model dance_group
 * 
 */
export type dance_group = $Result.DefaultSelection<Prisma.$dance_groupPayload>
/**
 * Model dance_program
 * 
 */
export type dance_program = $Result.DefaultSelection<Prisma.$dance_programPayload>
/**
 * Model group
 * 
 */
export type group = $Result.DefaultSelection<Prisma.$groupPayload>
/**
 * Model group_assocations
 * 
 */
export type group_assocations = $Result.DefaultSelection<Prisma.$group_assocationsPayload>
/**
 * Model state
 * 
 */
export type state = $Result.DefaultSelection<Prisma.$statePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Calls
 * const calls = await prisma.call.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Calls
   * const calls = await prisma.call.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.call`: Exposes CRUD operations for the **call** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Calls
    * const calls = await prisma.call.findMany()
    * ```
    */
  get call(): Prisma.callDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.call_family`: Exposes CRUD operations for the **call_family** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Call_families
    * const call_families = await prisma.call_family.findMany()
    * ```
    */
  get call_family(): Prisma.call_familyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.call_formation`: Exposes CRUD operations for the **call_formation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Call_formations
    * const call_formations = await prisma.call_formation.findMany()
    * ```
    */
  get call_formation(): Prisma.call_formationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formation`: Exposes CRUD operations for the **formation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Formations
    * const formations = await prisma.formation.findMany()
    * ```
    */
  get formation(): Prisma.formationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.program`: Exposes CRUD operations for the **program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.programDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sequence`: Exposes CRUD operations for the **sequence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sequences
    * const sequences = await prisma.sequence.findMany()
    * ```
    */
  get sequence(): Prisma.sequenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sequence_calls`: Exposes CRUD operations for the **sequence_calls** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sequence_calls
    * const sequence_calls = await prisma.sequence_calls.findMany()
    * ```
    */
  get sequence_calls(): Prisma.sequence_callsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.countryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dancer`: Exposes CRUD operations for the **dancer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dancers
    * const dancers = await prisma.dancer.findMany()
    * ```
    */
  get dancer(): Prisma.dancerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dance_group`: Exposes CRUD operations for the **dance_group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dance_groups
    * const dance_groups = await prisma.dance_group.findMany()
    * ```
    */
  get dance_group(): Prisma.dance_groupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dance_program`: Exposes CRUD operations for the **dance_program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dance_programs
    * const dance_programs = await prisma.dance_program.findMany()
    * ```
    */
  get dance_program(): Prisma.dance_programDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.groupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group_assocations`: Exposes CRUD operations for the **group_assocations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Group_assocations
    * const group_assocations = await prisma.group_assocations.findMany()
    * ```
    */
  get group_assocations(): Prisma.group_assocationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.state`: Exposes CRUD operations for the **state** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more States
    * const states = await prisma.state.findMany()
    * ```
    */
  get state(): Prisma.stateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    call: 'call',
    call_family: 'call_family',
    call_formation: 'call_formation',
    formation: 'formation',
    program: 'program',
    sequence: 'sequence',
    sequence_calls: 'sequence_calls',
    country: 'country',
    dancer: 'dancer',
    dance_group: 'dance_group',
    dance_program: 'dance_program',
    group: 'group',
    group_assocations: 'group_assocations',
    state: 'state'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "call" | "call_family" | "call_formation" | "formation" | "program" | "sequence" | "sequence_calls" | "country" | "dancer" | "dance_group" | "dance_program" | "group" | "group_assocations" | "state"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      call: {
        payload: Prisma.$callPayload<ExtArgs>
        fields: Prisma.callFieldRefs
        operations: {
          findUnique: {
            args: Prisma.callFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.callFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>
          }
          findFirst: {
            args: Prisma.callFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.callFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>
          }
          findMany: {
            args: Prisma.callFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>[]
          }
          create: {
            args: Prisma.callCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>
          }
          createMany: {
            args: Prisma.callCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.callCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>[]
          }
          delete: {
            args: Prisma.callDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>
          }
          update: {
            args: Prisma.callUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>
          }
          deleteMany: {
            args: Prisma.callDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.callUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.callUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>[]
          }
          upsert: {
            args: Prisma.callUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callPayload>
          }
          aggregate: {
            args: Prisma.CallAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCall>
          }
          groupBy: {
            args: Prisma.callGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallGroupByOutputType>[]
          }
          count: {
            args: Prisma.callCountArgs<ExtArgs>
            result: $Utils.Optional<CallCountAggregateOutputType> | number
          }
        }
      }
      call_family: {
        payload: Prisma.$call_familyPayload<ExtArgs>
        fields: Prisma.call_familyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.call_familyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.call_familyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>
          }
          findFirst: {
            args: Prisma.call_familyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.call_familyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>
          }
          findMany: {
            args: Prisma.call_familyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>[]
          }
          create: {
            args: Prisma.call_familyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>
          }
          createMany: {
            args: Prisma.call_familyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.call_familyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>[]
          }
          delete: {
            args: Prisma.call_familyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>
          }
          update: {
            args: Prisma.call_familyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>
          }
          deleteMany: {
            args: Prisma.call_familyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.call_familyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.call_familyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>[]
          }
          upsert: {
            args: Prisma.call_familyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_familyPayload>
          }
          aggregate: {
            args: Prisma.Call_familyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCall_family>
          }
          groupBy: {
            args: Prisma.call_familyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Call_familyGroupByOutputType>[]
          }
          count: {
            args: Prisma.call_familyCountArgs<ExtArgs>
            result: $Utils.Optional<Call_familyCountAggregateOutputType> | number
          }
        }
      }
      call_formation: {
        payload: Prisma.$call_formationPayload<ExtArgs>
        fields: Prisma.call_formationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.call_formationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.call_formationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>
          }
          findFirst: {
            args: Prisma.call_formationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.call_formationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>
          }
          findMany: {
            args: Prisma.call_formationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>[]
          }
          create: {
            args: Prisma.call_formationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>
          }
          createMany: {
            args: Prisma.call_formationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.call_formationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>[]
          }
          delete: {
            args: Prisma.call_formationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>
          }
          update: {
            args: Prisma.call_formationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>
          }
          deleteMany: {
            args: Prisma.call_formationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.call_formationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.call_formationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>[]
          }
          upsert: {
            args: Prisma.call_formationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_formationPayload>
          }
          aggregate: {
            args: Prisma.Call_formationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCall_formation>
          }
          groupBy: {
            args: Prisma.call_formationGroupByArgs<ExtArgs>
            result: $Utils.Optional<Call_formationGroupByOutputType>[]
          }
          count: {
            args: Prisma.call_formationCountArgs<ExtArgs>
            result: $Utils.Optional<Call_formationCountAggregateOutputType> | number
          }
        }
      }
      formation: {
        payload: Prisma.$formationPayload<ExtArgs>
        fields: Prisma.formationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.formationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.formationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>
          }
          findFirst: {
            args: Prisma.formationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.formationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>
          }
          findMany: {
            args: Prisma.formationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>[]
          }
          create: {
            args: Prisma.formationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>
          }
          createMany: {
            args: Prisma.formationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.formationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>[]
          }
          delete: {
            args: Prisma.formationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>
          }
          update: {
            args: Prisma.formationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>
          }
          deleteMany: {
            args: Prisma.formationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.formationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.formationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>[]
          }
          upsert: {
            args: Prisma.formationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$formationPayload>
          }
          aggregate: {
            args: Prisma.FormationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormation>
          }
          groupBy: {
            args: Prisma.formationGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormationGroupByOutputType>[]
          }
          count: {
            args: Prisma.formationCountArgs<ExtArgs>
            result: $Utils.Optional<FormationCountAggregateOutputType> | number
          }
        }
      }
      program: {
        payload: Prisma.$programPayload<ExtArgs>
        fields: Prisma.programFieldRefs
        operations: {
          findUnique: {
            args: Prisma.programFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.programFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>
          }
          findFirst: {
            args: Prisma.programFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.programFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>
          }
          findMany: {
            args: Prisma.programFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>[]
          }
          create: {
            args: Prisma.programCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>
          }
          createMany: {
            args: Prisma.programCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.programCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>[]
          }
          delete: {
            args: Prisma.programDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>
          }
          update: {
            args: Prisma.programUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>
          }
          deleteMany: {
            args: Prisma.programDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.programUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.programUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>[]
          }
          upsert: {
            args: Prisma.programUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$programPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.programGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.programCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramCountAggregateOutputType> | number
          }
        }
      }
      sequence: {
        payload: Prisma.$sequencePayload<ExtArgs>
        fields: Prisma.sequenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sequenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sequenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>
          }
          findFirst: {
            args: Prisma.sequenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sequenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>
          }
          findMany: {
            args: Prisma.sequenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>[]
          }
          create: {
            args: Prisma.sequenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>
          }
          createMany: {
            args: Prisma.sequenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sequenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>[]
          }
          delete: {
            args: Prisma.sequenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>
          }
          update: {
            args: Prisma.sequenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>
          }
          deleteMany: {
            args: Prisma.sequenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sequenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sequenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>[]
          }
          upsert: {
            args: Prisma.sequenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequencePayload>
          }
          aggregate: {
            args: Prisma.SequenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSequence>
          }
          groupBy: {
            args: Prisma.sequenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SequenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.sequenceCountArgs<ExtArgs>
            result: $Utils.Optional<SequenceCountAggregateOutputType> | number
          }
        }
      }
      sequence_calls: {
        payload: Prisma.$sequence_callsPayload<ExtArgs>
        fields: Prisma.sequence_callsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sequence_callsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sequence_callsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>
          }
          findFirst: {
            args: Prisma.sequence_callsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sequence_callsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>
          }
          findMany: {
            args: Prisma.sequence_callsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>[]
          }
          create: {
            args: Prisma.sequence_callsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>
          }
          createMany: {
            args: Prisma.sequence_callsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sequence_callsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>[]
          }
          delete: {
            args: Prisma.sequence_callsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>
          }
          update: {
            args: Prisma.sequence_callsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>
          }
          deleteMany: {
            args: Prisma.sequence_callsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sequence_callsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sequence_callsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>[]
          }
          upsert: {
            args: Prisma.sequence_callsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sequence_callsPayload>
          }
          aggregate: {
            args: Prisma.Sequence_callsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSequence_calls>
          }
          groupBy: {
            args: Prisma.sequence_callsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Sequence_callsGroupByOutputType>[]
          }
          count: {
            args: Prisma.sequence_callsCountArgs<ExtArgs>
            result: $Utils.Optional<Sequence_callsCountAggregateOutputType> | number
          }
        }
      }
      country: {
        payload: Prisma.$countryPayload<ExtArgs>
        fields: Prisma.countryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.countryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.countryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          findFirst: {
            args: Prisma.countryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.countryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          findMany: {
            args: Prisma.countryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>[]
          }
          create: {
            args: Prisma.countryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          createMany: {
            args: Prisma.countryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.countryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>[]
          }
          delete: {
            args: Prisma.countryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          update: {
            args: Prisma.countryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          deleteMany: {
            args: Prisma.countryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.countryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.countryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>[]
          }
          upsert: {
            args: Prisma.countryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$countryPayload>
          }
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry>
          }
          groupBy: {
            args: Prisma.countryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountryGroupByOutputType>[]
          }
          count: {
            args: Prisma.countryCountArgs<ExtArgs>
            result: $Utils.Optional<CountryCountAggregateOutputType> | number
          }
        }
      }
      dancer: {
        payload: Prisma.$dancerPayload<ExtArgs>
        fields: Prisma.dancerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.dancerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.dancerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>
          }
          findFirst: {
            args: Prisma.dancerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.dancerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>
          }
          findMany: {
            args: Prisma.dancerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>[]
          }
          create: {
            args: Prisma.dancerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>
          }
          createMany: {
            args: Prisma.dancerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.dancerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>[]
          }
          delete: {
            args: Prisma.dancerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>
          }
          update: {
            args: Prisma.dancerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>
          }
          deleteMany: {
            args: Prisma.dancerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.dancerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.dancerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>[]
          }
          upsert: {
            args: Prisma.dancerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dancerPayload>
          }
          aggregate: {
            args: Prisma.DancerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDancer>
          }
          groupBy: {
            args: Prisma.dancerGroupByArgs<ExtArgs>
            result: $Utils.Optional<DancerGroupByOutputType>[]
          }
          count: {
            args: Prisma.dancerCountArgs<ExtArgs>
            result: $Utils.Optional<DancerCountAggregateOutputType> | number
          }
        }
      }
      dance_group: {
        payload: Prisma.$dance_groupPayload<ExtArgs>
        fields: Prisma.dance_groupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.dance_groupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.dance_groupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>
          }
          findFirst: {
            args: Prisma.dance_groupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.dance_groupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>
          }
          findMany: {
            args: Prisma.dance_groupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>[]
          }
          create: {
            args: Prisma.dance_groupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>
          }
          createMany: {
            args: Prisma.dance_groupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.dance_groupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>[]
          }
          delete: {
            args: Prisma.dance_groupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>
          }
          update: {
            args: Prisma.dance_groupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>
          }
          deleteMany: {
            args: Prisma.dance_groupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.dance_groupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.dance_groupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>[]
          }
          upsert: {
            args: Prisma.dance_groupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_groupPayload>
          }
          aggregate: {
            args: Prisma.Dance_groupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDance_group>
          }
          groupBy: {
            args: Prisma.dance_groupGroupByArgs<ExtArgs>
            result: $Utils.Optional<Dance_groupGroupByOutputType>[]
          }
          count: {
            args: Prisma.dance_groupCountArgs<ExtArgs>
            result: $Utils.Optional<Dance_groupCountAggregateOutputType> | number
          }
        }
      }
      dance_program: {
        payload: Prisma.$dance_programPayload<ExtArgs>
        fields: Prisma.dance_programFieldRefs
        operations: {
          findUnique: {
            args: Prisma.dance_programFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.dance_programFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>
          }
          findFirst: {
            args: Prisma.dance_programFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.dance_programFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>
          }
          findMany: {
            args: Prisma.dance_programFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>[]
          }
          create: {
            args: Prisma.dance_programCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>
          }
          createMany: {
            args: Prisma.dance_programCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.dance_programCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>[]
          }
          delete: {
            args: Prisma.dance_programDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>
          }
          update: {
            args: Prisma.dance_programUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>
          }
          deleteMany: {
            args: Prisma.dance_programDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.dance_programUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.dance_programUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>[]
          }
          upsert: {
            args: Prisma.dance_programUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$dance_programPayload>
          }
          aggregate: {
            args: Prisma.Dance_programAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDance_program>
          }
          groupBy: {
            args: Prisma.dance_programGroupByArgs<ExtArgs>
            result: $Utils.Optional<Dance_programGroupByOutputType>[]
          }
          count: {
            args: Prisma.dance_programCountArgs<ExtArgs>
            result: $Utils.Optional<Dance_programCountAggregateOutputType> | number
          }
        }
      }
      group: {
        payload: Prisma.$groupPayload<ExtArgs>
        fields: Prisma.groupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.groupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.groupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          findFirst: {
            args: Prisma.groupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.groupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          findMany: {
            args: Prisma.groupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>[]
          }
          create: {
            args: Prisma.groupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          createMany: {
            args: Prisma.groupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.groupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>[]
          }
          delete: {
            args: Prisma.groupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          update: {
            args: Prisma.groupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          deleteMany: {
            args: Prisma.groupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.groupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.groupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>[]
          }
          upsert: {
            args: Prisma.groupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$groupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.groupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.groupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      group_assocations: {
        payload: Prisma.$group_assocationsPayload<ExtArgs>
        fields: Prisma.group_assocationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.group_assocationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.group_assocationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>
          }
          findFirst: {
            args: Prisma.group_assocationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.group_assocationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>
          }
          findMany: {
            args: Prisma.group_assocationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>[]
          }
          create: {
            args: Prisma.group_assocationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>
          }
          createMany: {
            args: Prisma.group_assocationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.group_assocationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>[]
          }
          delete: {
            args: Prisma.group_assocationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>
          }
          update: {
            args: Prisma.group_assocationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>
          }
          deleteMany: {
            args: Prisma.group_assocationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.group_assocationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.group_assocationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>[]
          }
          upsert: {
            args: Prisma.group_assocationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$group_assocationsPayload>
          }
          aggregate: {
            args: Prisma.Group_assocationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup_assocations>
          }
          groupBy: {
            args: Prisma.group_assocationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Group_assocationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.group_assocationsCountArgs<ExtArgs>
            result: $Utils.Optional<Group_assocationsCountAggregateOutputType> | number
          }
        }
      }
      state: {
        payload: Prisma.$statePayload<ExtArgs>
        fields: Prisma.stateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.stateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.stateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>
          }
          findFirst: {
            args: Prisma.stateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.stateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>
          }
          findMany: {
            args: Prisma.stateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>[]
          }
          create: {
            args: Prisma.stateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>
          }
          createMany: {
            args: Prisma.stateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.stateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>[]
          }
          delete: {
            args: Prisma.stateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>
          }
          update: {
            args: Prisma.stateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>
          }
          deleteMany: {
            args: Prisma.stateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.stateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.stateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>[]
          }
          upsert: {
            args: Prisma.stateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$statePayload>
          }
          aggregate: {
            args: Prisma.StateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateState>
          }
          groupBy: {
            args: Prisma.stateGroupByArgs<ExtArgs>
            result: $Utils.Optional<StateGroupByOutputType>[]
          }
          count: {
            args: Prisma.stateCountArgs<ExtArgs>
            result: $Utils.Optional<StateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    call?: callOmit
    call_family?: call_familyOmit
    call_formation?: call_formationOmit
    formation?: formationOmit
    program?: programOmit
    sequence?: sequenceOmit
    sequence_calls?: sequence_callsOmit
    country?: countryOmit
    dancer?: dancerOmit
    dance_group?: dance_groupOmit
    dance_program?: dance_programOmit
    group?: groupOmit
    group_assocations?: group_assocationsOmit
    state?: stateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CallCountOutputType
   */

  export type CallCountOutputType = {
    formations: number
    sequences: number
  }

  export type CallCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formations?: boolean | CallCountOutputTypeCountFormationsArgs
    sequences?: boolean | CallCountOutputTypeCountSequencesArgs
  }

  // Custom InputTypes
  /**
   * CallCountOutputType without action
   */
  export type CallCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallCountOutputType
     */
    select?: CallCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CallCountOutputType without action
   */
  export type CallCountOutputTypeCountFormationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_formationWhereInput
  }

  /**
   * CallCountOutputType without action
   */
  export type CallCountOutputTypeCountSequencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sequence_callsWhereInput
  }


  /**
   * Count Type Call_familyCountOutputType
   */

  export type Call_familyCountOutputType = {
    call: number
  }

  export type Call_familyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | Call_familyCountOutputTypeCountCallArgs
  }

  // Custom InputTypes
  /**
   * Call_familyCountOutputType without action
   */
  export type Call_familyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Call_familyCountOutputType
     */
    select?: Call_familyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Call_familyCountOutputType without action
   */
  export type Call_familyCountOutputTypeCountCallArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: callWhereInput
  }


  /**
   * Count Type FormationCountOutputType
   */

  export type FormationCountOutputType = {
    callStart: number
    callEnding: number
    sequences: number
  }

  export type FormationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callStart?: boolean | FormationCountOutputTypeCountCallStartArgs
    callEnding?: boolean | FormationCountOutputTypeCountCallEndingArgs
    sequences?: boolean | FormationCountOutputTypeCountSequencesArgs
  }

  // Custom InputTypes
  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormationCountOutputType
     */
    select?: FormationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountCallStartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_formationWhereInput
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountCallEndingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_formationWhereInput
  }

  /**
   * FormationCountOutputType without action
   */
  export type FormationCountOutputTypeCountSequencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sequence_callsWhereInput
  }


  /**
   * Count Type ProgramCountOutputType
   */

  export type ProgramCountOutputType = {
    dancers: number
  }

  export type ProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancers?: boolean | ProgramCountOutputTypeCountDancersArgs
  }

  // Custom InputTypes
  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramCountOutputType
     */
    select?: ProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountDancersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dance_programWhereInput
  }


  /**
   * Count Type SequenceCountOutputType
   */

  export type SequenceCountOutputType = {
    calls: number
  }

  export type SequenceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | SequenceCountOutputTypeCountCallsArgs
  }

  // Custom InputTypes
  /**
   * SequenceCountOutputType without action
   */
  export type SequenceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SequenceCountOutputType
     */
    select?: SequenceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SequenceCountOutputType without action
   */
  export type SequenceCountOutputTypeCountCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sequence_callsWhereInput
  }


  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    states: number
  }

  export type CountryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    states?: boolean | CountryCountOutputTypeCountStatesArgs
  }

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountStatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: stateWhereInput
  }


  /**
   * Count Type DancerCountOutputType
   */

  export type DancerCountOutputType = {
    groups: number
    levels: number
  }

  export type DancerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | DancerCountOutputTypeCountGroupsArgs
    levels?: boolean | DancerCountOutputTypeCountLevelsArgs
  }

  // Custom InputTypes
  /**
   * DancerCountOutputType without action
   */
  export type DancerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DancerCountOutputType
     */
    select?: DancerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DancerCountOutputType without action
   */
  export type DancerCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dance_groupWhereInput
  }

  /**
   * DancerCountOutputType without action
   */
  export type DancerCountOutputTypeCountLevelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dance_programWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    dancers: number
    parent: number
    child: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancers?: boolean | GroupCountOutputTypeCountDancersArgs
    parent?: boolean | GroupCountOutputTypeCountParentArgs
    child?: boolean | GroupCountOutputTypeCountChildArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountDancersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dance_groupWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountParentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: group_assocationsWhereInput
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountChildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: group_assocationsWhereInput
  }


  /**
   * Count Type StateCountOutputType
   */

  export type StateCountOutputType = {
    groups: number
  }

  export type StateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | StateCountOutputTypeCountGroupsArgs
  }

  // Custom InputTypes
  /**
   * StateCountOutputType without action
   */
  export type StateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StateCountOutputType
     */
    select?: StateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StateCountOutputType without action
   */
  export type StateCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: groupWhereInput
  }


  /**
   * Models
   */

  /**
   * Model call
   */

  export type AggregateCall = {
    _count: CallCountAggregateOutputType | null
    _avg: CallAvgAggregateOutputType | null
    _sum: CallSumAggregateOutputType | null
    _min: CallMinAggregateOutputType | null
    _max: CallMaxAggregateOutputType | null
  }

  export type CallAvgAggregateOutputType = {
    callId: number | null
    familyId: number | null
  }

  export type CallSumAggregateOutputType = {
    callId: number | null
    familyId: number | null
  }

  export type CallMinAggregateOutputType = {
    callId: number | null
    name: string | null
    tamSeq: string | null
    familyId: number | null
  }

  export type CallMaxAggregateOutputType = {
    callId: number | null
    name: string | null
    tamSeq: string | null
    familyId: number | null
  }

  export type CallCountAggregateOutputType = {
    callId: number
    name: number
    tamSeq: number
    familyId: number
    _all: number
  }


  export type CallAvgAggregateInputType = {
    callId?: true
    familyId?: true
  }

  export type CallSumAggregateInputType = {
    callId?: true
    familyId?: true
  }

  export type CallMinAggregateInputType = {
    callId?: true
    name?: true
    tamSeq?: true
    familyId?: true
  }

  export type CallMaxAggregateInputType = {
    callId?: true
    name?: true
    tamSeq?: true
    familyId?: true
  }

  export type CallCountAggregateInputType = {
    callId?: true
    name?: true
    tamSeq?: true
    familyId?: true
    _all?: true
  }

  export type CallAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call to aggregate.
     */
    where?: callWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callOrderByWithRelationInput | callOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: callWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned calls
    **/
    _count?: true | CallCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallMaxAggregateInputType
  }

  export type GetCallAggregateType<T extends CallAggregateArgs> = {
        [P in keyof T & keyof AggregateCall]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCall[P]>
      : GetScalarType<T[P], AggregateCall[P]>
  }




  export type callGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: callWhereInput
    orderBy?: callOrderByWithAggregationInput | callOrderByWithAggregationInput[]
    by: CallScalarFieldEnum[] | CallScalarFieldEnum
    having?: callScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallCountAggregateInputType | true
    _avg?: CallAvgAggregateInputType
    _sum?: CallSumAggregateInputType
    _min?: CallMinAggregateInputType
    _max?: CallMaxAggregateInputType
  }

  export type CallGroupByOutputType = {
    callId: number
    name: string
    tamSeq: string | null
    familyId: number | null
    _count: CallCountAggregateOutputType | null
    _avg: CallAvgAggregateOutputType | null
    _sum: CallSumAggregateOutputType | null
    _min: CallMinAggregateOutputType | null
    _max: CallMaxAggregateOutputType | null
  }

  type GetCallGroupByPayload<T extends callGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallGroupByOutputType[P]>
            : GetScalarType<T[P], CallGroupByOutputType[P]>
        }
      >
    >


  export type callSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    callId?: boolean
    name?: boolean
    tamSeq?: boolean
    familyId?: boolean
    callFamily?: boolean | call$callFamilyArgs<ExtArgs>
    formations?: boolean | call$formationsArgs<ExtArgs>
    sequences?: boolean | call$sequencesArgs<ExtArgs>
    _count?: boolean | CallCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call"]>

  export type callSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    callId?: boolean
    name?: boolean
    tamSeq?: boolean
    familyId?: boolean
    callFamily?: boolean | call$callFamilyArgs<ExtArgs>
  }, ExtArgs["result"]["call"]>

  export type callSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    callId?: boolean
    name?: boolean
    tamSeq?: boolean
    familyId?: boolean
    callFamily?: boolean | call$callFamilyArgs<ExtArgs>
  }, ExtArgs["result"]["call"]>

  export type callSelectScalar = {
    callId?: boolean
    name?: boolean
    tamSeq?: boolean
    familyId?: boolean
  }

  export type callOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"callId" | "name" | "tamSeq" | "familyId", ExtArgs["result"]["call"]>
  export type callInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callFamily?: boolean | call$callFamilyArgs<ExtArgs>
    formations?: boolean | call$formationsArgs<ExtArgs>
    sequences?: boolean | call$sequencesArgs<ExtArgs>
    _count?: boolean | CallCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type callIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callFamily?: boolean | call$callFamilyArgs<ExtArgs>
  }
  export type callIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callFamily?: boolean | call$callFamilyArgs<ExtArgs>
  }

  export type $callPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "call"
    objects: {
      callFamily: Prisma.$call_familyPayload<ExtArgs> | null
      formations: Prisma.$call_formationPayload<ExtArgs>[]
      sequences: Prisma.$sequence_callsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      callId: number
      name: string
      tamSeq: string | null
      familyId: number | null
    }, ExtArgs["result"]["call"]>
    composites: {}
  }

  type callGetPayload<S extends boolean | null | undefined | callDefaultArgs> = $Result.GetResult<Prisma.$callPayload, S>

  type callCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<callFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallCountAggregateInputType | true
    }

  export interface callDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['call'], meta: { name: 'call' } }
    /**
     * Find zero or one Call that matches the filter.
     * @param {callFindUniqueArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends callFindUniqueArgs>(args: SelectSubset<T, callFindUniqueArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Call that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {callFindUniqueOrThrowArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends callFindUniqueOrThrowArgs>(args: SelectSubset<T, callFindUniqueOrThrowArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callFindFirstArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends callFindFirstArgs>(args?: SelectSubset<T, callFindFirstArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callFindFirstOrThrowArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends callFindFirstOrThrowArgs>(args?: SelectSubset<T, callFindFirstOrThrowArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calls
     * const calls = await prisma.call.findMany()
     * 
     * // Get first 10 Calls
     * const calls = await prisma.call.findMany({ take: 10 })
     * 
     * // Only select the `callId`
     * const callWithCallIdOnly = await prisma.call.findMany({ select: { callId: true } })
     * 
     */
    findMany<T extends callFindManyArgs>(args?: SelectSubset<T, callFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Call.
     * @param {callCreateArgs} args - Arguments to create a Call.
     * @example
     * // Create one Call
     * const Call = await prisma.call.create({
     *   data: {
     *     // ... data to create a Call
     *   }
     * })
     * 
     */
    create<T extends callCreateArgs>(args: SelectSubset<T, callCreateArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Calls.
     * @param {callCreateManyArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const call = await prisma.call.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends callCreateManyArgs>(args?: SelectSubset<T, callCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Calls and returns the data saved in the database.
     * @param {callCreateManyAndReturnArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const call = await prisma.call.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Calls and only return the `callId`
     * const callWithCallIdOnly = await prisma.call.createManyAndReturn({
     *   select: { callId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends callCreateManyAndReturnArgs>(args?: SelectSubset<T, callCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Call.
     * @param {callDeleteArgs} args - Arguments to delete one Call.
     * @example
     * // Delete one Call
     * const Call = await prisma.call.delete({
     *   where: {
     *     // ... filter to delete one Call
     *   }
     * })
     * 
     */
    delete<T extends callDeleteArgs>(args: SelectSubset<T, callDeleteArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Call.
     * @param {callUpdateArgs} args - Arguments to update one Call.
     * @example
     * // Update one Call
     * const call = await prisma.call.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends callUpdateArgs>(args: SelectSubset<T, callUpdateArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Calls.
     * @param {callDeleteManyArgs} args - Arguments to filter Calls to delete.
     * @example
     * // Delete a few Calls
     * const { count } = await prisma.call.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends callDeleteManyArgs>(args?: SelectSubset<T, callDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calls
     * const call = await prisma.call.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends callUpdateManyArgs>(args: SelectSubset<T, callUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calls and returns the data updated in the database.
     * @param {callUpdateManyAndReturnArgs} args - Arguments to update many Calls.
     * @example
     * // Update many Calls
     * const call = await prisma.call.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Calls and only return the `callId`
     * const callWithCallIdOnly = await prisma.call.updateManyAndReturn({
     *   select: { callId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends callUpdateManyAndReturnArgs>(args: SelectSubset<T, callUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Call.
     * @param {callUpsertArgs} args - Arguments to update or create a Call.
     * @example
     * // Update or create a Call
     * const call = await prisma.call.upsert({
     *   create: {
     *     // ... data to create a Call
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Call we want to update
     *   }
     * })
     */
    upsert<T extends callUpsertArgs>(args: SelectSubset<T, callUpsertArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callCountArgs} args - Arguments to filter Calls to count.
     * @example
     * // Count the number of Calls
     * const count = await prisma.call.count({
     *   where: {
     *     // ... the filter for the Calls we want to count
     *   }
     * })
    **/
    count<T extends callCountArgs>(
      args?: Subset<T, callCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Call.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallAggregateArgs>(args: Subset<T, CallAggregateArgs>): Prisma.PrismaPromise<GetCallAggregateType<T>>

    /**
     * Group by Call.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends callGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: callGroupByArgs['orderBy'] }
        : { orderBy?: callGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, callGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the call model
   */
  readonly fields: callFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for call.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__callClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    callFamily<T extends call$callFamilyArgs<ExtArgs> = {}>(args?: Subset<T, call$callFamilyArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    formations<T extends call$formationsArgs<ExtArgs> = {}>(args?: Subset<T, call$formationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sequences<T extends call$sequencesArgs<ExtArgs> = {}>(args?: Subset<T, call$sequencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the call model
   */
  interface callFieldRefs {
    readonly callId: FieldRef<"call", 'Int'>
    readonly name: FieldRef<"call", 'String'>
    readonly tamSeq: FieldRef<"call", 'String'>
    readonly familyId: FieldRef<"call", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * call findUnique
   */
  export type callFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * Filter, which call to fetch.
     */
    where: callWhereUniqueInput
  }

  /**
   * call findUniqueOrThrow
   */
  export type callFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * Filter, which call to fetch.
     */
    where: callWhereUniqueInput
  }

  /**
   * call findFirst
   */
  export type callFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * Filter, which call to fetch.
     */
    where?: callWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callOrderByWithRelationInput | callOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for calls.
     */
    cursor?: callWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of calls.
     */
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * call findFirstOrThrow
   */
  export type callFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * Filter, which call to fetch.
     */
    where?: callWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callOrderByWithRelationInput | callOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for calls.
     */
    cursor?: callWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of calls.
     */
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * call findMany
   */
  export type callFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * Filter, which calls to fetch.
     */
    where?: callWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callOrderByWithRelationInput | callOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing calls.
     */
    cursor?: callWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * call create
   */
  export type callCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * The data needed to create a call.
     */
    data: XOR<callCreateInput, callUncheckedCreateInput>
  }

  /**
   * call createMany
   */
  export type callCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many calls.
     */
    data: callCreateManyInput | callCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * call createManyAndReturn
   */
  export type callCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * The data used to create many calls.
     */
    data: callCreateManyInput | callCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * call update
   */
  export type callUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * The data needed to update a call.
     */
    data: XOR<callUpdateInput, callUncheckedUpdateInput>
    /**
     * Choose, which call to update.
     */
    where: callWhereUniqueInput
  }

  /**
   * call updateMany
   */
  export type callUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update calls.
     */
    data: XOR<callUpdateManyMutationInput, callUncheckedUpdateManyInput>
    /**
     * Filter which calls to update
     */
    where?: callWhereInput
    /**
     * Limit how many calls to update.
     */
    limit?: number
  }

  /**
   * call updateManyAndReturn
   */
  export type callUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * The data used to update calls.
     */
    data: XOR<callUpdateManyMutationInput, callUncheckedUpdateManyInput>
    /**
     * Filter which calls to update
     */
    where?: callWhereInput
    /**
     * Limit how many calls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * call upsert
   */
  export type callUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * The filter to search for the call to update in case it exists.
     */
    where: callWhereUniqueInput
    /**
     * In case the call found by the `where` argument doesn't exist, create a new call with this data.
     */
    create: XOR<callCreateInput, callUncheckedCreateInput>
    /**
     * In case the call was found with the provided `where` argument, update it with this data.
     */
    update: XOR<callUpdateInput, callUncheckedUpdateInput>
  }

  /**
   * call delete
   */
  export type callDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    /**
     * Filter which call to delete.
     */
    where: callWhereUniqueInput
  }

  /**
   * call deleteMany
   */
  export type callDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which calls to delete
     */
    where?: callWhereInput
    /**
     * Limit how many calls to delete.
     */
    limit?: number
  }

  /**
   * call.callFamily
   */
  export type call$callFamilyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    where?: call_familyWhereInput
  }

  /**
   * call.formations
   */
  export type call$formationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    where?: call_formationWhereInput
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    cursor?: call_formationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Call_formationScalarFieldEnum | Call_formationScalarFieldEnum[]
  }

  /**
   * call.sequences
   */
  export type call$sequencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    where?: sequence_callsWhereInput
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    cursor?: sequence_callsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sequence_callsScalarFieldEnum | Sequence_callsScalarFieldEnum[]
  }

  /**
   * call without action
   */
  export type callDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
  }


  /**
   * Model call_family
   */

  export type AggregateCall_family = {
    _count: Call_familyCountAggregateOutputType | null
    _avg: Call_familyAvgAggregateOutputType | null
    _sum: Call_familySumAggregateOutputType | null
    _min: Call_familyMinAggregateOutputType | null
    _max: Call_familyMaxAggregateOutputType | null
  }

  export type Call_familyAvgAggregateOutputType = {
    familyId: number | null
  }

  export type Call_familySumAggregateOutputType = {
    familyId: number | null
  }

  export type Call_familyMinAggregateOutputType = {
    familyId: number | null
    name: string | null
  }

  export type Call_familyMaxAggregateOutputType = {
    familyId: number | null
    name: string | null
  }

  export type Call_familyCountAggregateOutputType = {
    familyId: number
    name: number
    _all: number
  }


  export type Call_familyAvgAggregateInputType = {
    familyId?: true
  }

  export type Call_familySumAggregateInputType = {
    familyId?: true
  }

  export type Call_familyMinAggregateInputType = {
    familyId?: true
    name?: true
  }

  export type Call_familyMaxAggregateInputType = {
    familyId?: true
    name?: true
  }

  export type Call_familyCountAggregateInputType = {
    familyId?: true
    name?: true
    _all?: true
  }

  export type Call_familyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call_family to aggregate.
     */
    where?: call_familyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_families to fetch.
     */
    orderBy?: call_familyOrderByWithRelationInput | call_familyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: call_familyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned call_families
    **/
    _count?: true | Call_familyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Call_familyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Call_familySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Call_familyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Call_familyMaxAggregateInputType
  }

  export type GetCall_familyAggregateType<T extends Call_familyAggregateArgs> = {
        [P in keyof T & keyof AggregateCall_family]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCall_family[P]>
      : GetScalarType<T[P], AggregateCall_family[P]>
  }




  export type call_familyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_familyWhereInput
    orderBy?: call_familyOrderByWithAggregationInput | call_familyOrderByWithAggregationInput[]
    by: Call_familyScalarFieldEnum[] | Call_familyScalarFieldEnum
    having?: call_familyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Call_familyCountAggregateInputType | true
    _avg?: Call_familyAvgAggregateInputType
    _sum?: Call_familySumAggregateInputType
    _min?: Call_familyMinAggregateInputType
    _max?: Call_familyMaxAggregateInputType
  }

  export type Call_familyGroupByOutputType = {
    familyId: number
    name: string
    _count: Call_familyCountAggregateOutputType | null
    _avg: Call_familyAvgAggregateOutputType | null
    _sum: Call_familySumAggregateOutputType | null
    _min: Call_familyMinAggregateOutputType | null
    _max: Call_familyMaxAggregateOutputType | null
  }

  type GetCall_familyGroupByPayload<T extends call_familyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Call_familyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Call_familyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Call_familyGroupByOutputType[P]>
            : GetScalarType<T[P], Call_familyGroupByOutputType[P]>
        }
      >
    >


  export type call_familySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    familyId?: boolean
    name?: boolean
    call?: boolean | call_family$callArgs<ExtArgs>
    _count?: boolean | Call_familyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_family"]>

  export type call_familySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    familyId?: boolean
    name?: boolean
  }, ExtArgs["result"]["call_family"]>

  export type call_familySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    familyId?: boolean
    name?: boolean
  }, ExtArgs["result"]["call_family"]>

  export type call_familySelectScalar = {
    familyId?: boolean
    name?: boolean
  }

  export type call_familyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"familyId" | "name", ExtArgs["result"]["call_family"]>
  export type call_familyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | call_family$callArgs<ExtArgs>
    _count?: boolean | Call_familyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type call_familyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type call_familyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $call_familyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "call_family"
    objects: {
      call: Prisma.$callPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      familyId: number
      name: string
    }, ExtArgs["result"]["call_family"]>
    composites: {}
  }

  type call_familyGetPayload<S extends boolean | null | undefined | call_familyDefaultArgs> = $Result.GetResult<Prisma.$call_familyPayload, S>

  type call_familyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<call_familyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Call_familyCountAggregateInputType | true
    }

  export interface call_familyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['call_family'], meta: { name: 'call_family' } }
    /**
     * Find zero or one Call_family that matches the filter.
     * @param {call_familyFindUniqueArgs} args - Arguments to find a Call_family
     * @example
     * // Get one Call_family
     * const call_family = await prisma.call_family.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends call_familyFindUniqueArgs>(args: SelectSubset<T, call_familyFindUniqueArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Call_family that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {call_familyFindUniqueOrThrowArgs} args - Arguments to find a Call_family
     * @example
     * // Get one Call_family
     * const call_family = await prisma.call_family.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends call_familyFindUniqueOrThrowArgs>(args: SelectSubset<T, call_familyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call_family that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_familyFindFirstArgs} args - Arguments to find a Call_family
     * @example
     * // Get one Call_family
     * const call_family = await prisma.call_family.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends call_familyFindFirstArgs>(args?: SelectSubset<T, call_familyFindFirstArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call_family that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_familyFindFirstOrThrowArgs} args - Arguments to find a Call_family
     * @example
     * // Get one Call_family
     * const call_family = await prisma.call_family.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends call_familyFindFirstOrThrowArgs>(args?: SelectSubset<T, call_familyFindFirstOrThrowArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Call_families that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_familyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Call_families
     * const call_families = await prisma.call_family.findMany()
     * 
     * // Get first 10 Call_families
     * const call_families = await prisma.call_family.findMany({ take: 10 })
     * 
     * // Only select the `familyId`
     * const call_familyWithFamilyIdOnly = await prisma.call_family.findMany({ select: { familyId: true } })
     * 
     */
    findMany<T extends call_familyFindManyArgs>(args?: SelectSubset<T, call_familyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Call_family.
     * @param {call_familyCreateArgs} args - Arguments to create a Call_family.
     * @example
     * // Create one Call_family
     * const Call_family = await prisma.call_family.create({
     *   data: {
     *     // ... data to create a Call_family
     *   }
     * })
     * 
     */
    create<T extends call_familyCreateArgs>(args: SelectSubset<T, call_familyCreateArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Call_families.
     * @param {call_familyCreateManyArgs} args - Arguments to create many Call_families.
     * @example
     * // Create many Call_families
     * const call_family = await prisma.call_family.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends call_familyCreateManyArgs>(args?: SelectSubset<T, call_familyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Call_families and returns the data saved in the database.
     * @param {call_familyCreateManyAndReturnArgs} args - Arguments to create many Call_families.
     * @example
     * // Create many Call_families
     * const call_family = await prisma.call_family.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Call_families and only return the `familyId`
     * const call_familyWithFamilyIdOnly = await prisma.call_family.createManyAndReturn({
     *   select: { familyId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends call_familyCreateManyAndReturnArgs>(args?: SelectSubset<T, call_familyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Call_family.
     * @param {call_familyDeleteArgs} args - Arguments to delete one Call_family.
     * @example
     * // Delete one Call_family
     * const Call_family = await prisma.call_family.delete({
     *   where: {
     *     // ... filter to delete one Call_family
     *   }
     * })
     * 
     */
    delete<T extends call_familyDeleteArgs>(args: SelectSubset<T, call_familyDeleteArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Call_family.
     * @param {call_familyUpdateArgs} args - Arguments to update one Call_family.
     * @example
     * // Update one Call_family
     * const call_family = await prisma.call_family.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends call_familyUpdateArgs>(args: SelectSubset<T, call_familyUpdateArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Call_families.
     * @param {call_familyDeleteManyArgs} args - Arguments to filter Call_families to delete.
     * @example
     * // Delete a few Call_families
     * const { count } = await prisma.call_family.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends call_familyDeleteManyArgs>(args?: SelectSubset<T, call_familyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Call_families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_familyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Call_families
     * const call_family = await prisma.call_family.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends call_familyUpdateManyArgs>(args: SelectSubset<T, call_familyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Call_families and returns the data updated in the database.
     * @param {call_familyUpdateManyAndReturnArgs} args - Arguments to update many Call_families.
     * @example
     * // Update many Call_families
     * const call_family = await prisma.call_family.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Call_families and only return the `familyId`
     * const call_familyWithFamilyIdOnly = await prisma.call_family.updateManyAndReturn({
     *   select: { familyId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends call_familyUpdateManyAndReturnArgs>(args: SelectSubset<T, call_familyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Call_family.
     * @param {call_familyUpsertArgs} args - Arguments to update or create a Call_family.
     * @example
     * // Update or create a Call_family
     * const call_family = await prisma.call_family.upsert({
     *   create: {
     *     // ... data to create a Call_family
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Call_family we want to update
     *   }
     * })
     */
    upsert<T extends call_familyUpsertArgs>(args: SelectSubset<T, call_familyUpsertArgs<ExtArgs>>): Prisma__call_familyClient<$Result.GetResult<Prisma.$call_familyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Call_families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_familyCountArgs} args - Arguments to filter Call_families to count.
     * @example
     * // Count the number of Call_families
     * const count = await prisma.call_family.count({
     *   where: {
     *     // ... the filter for the Call_families we want to count
     *   }
     * })
    **/
    count<T extends call_familyCountArgs>(
      args?: Subset<T, call_familyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Call_familyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Call_family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Call_familyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Call_familyAggregateArgs>(args: Subset<T, Call_familyAggregateArgs>): Prisma.PrismaPromise<GetCall_familyAggregateType<T>>

    /**
     * Group by Call_family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_familyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends call_familyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: call_familyGroupByArgs['orderBy'] }
        : { orderBy?: call_familyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, call_familyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCall_familyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the call_family model
   */
  readonly fields: call_familyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for call_family.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__call_familyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    call<T extends call_family$callArgs<ExtArgs> = {}>(args?: Subset<T, call_family$callArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the call_family model
   */
  interface call_familyFieldRefs {
    readonly familyId: FieldRef<"call_family", 'Int'>
    readonly name: FieldRef<"call_family", 'String'>
  }
    

  // Custom InputTypes
  /**
   * call_family findUnique
   */
  export type call_familyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * Filter, which call_family to fetch.
     */
    where: call_familyWhereUniqueInput
  }

  /**
   * call_family findUniqueOrThrow
   */
  export type call_familyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * Filter, which call_family to fetch.
     */
    where: call_familyWhereUniqueInput
  }

  /**
   * call_family findFirst
   */
  export type call_familyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * Filter, which call_family to fetch.
     */
    where?: call_familyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_families to fetch.
     */
    orderBy?: call_familyOrderByWithRelationInput | call_familyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for call_families.
     */
    cursor?: call_familyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of call_families.
     */
    distinct?: Call_familyScalarFieldEnum | Call_familyScalarFieldEnum[]
  }

  /**
   * call_family findFirstOrThrow
   */
  export type call_familyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * Filter, which call_family to fetch.
     */
    where?: call_familyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_families to fetch.
     */
    orderBy?: call_familyOrderByWithRelationInput | call_familyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for call_families.
     */
    cursor?: call_familyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of call_families.
     */
    distinct?: Call_familyScalarFieldEnum | Call_familyScalarFieldEnum[]
  }

  /**
   * call_family findMany
   */
  export type call_familyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * Filter, which call_families to fetch.
     */
    where?: call_familyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_families to fetch.
     */
    orderBy?: call_familyOrderByWithRelationInput | call_familyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing call_families.
     */
    cursor?: call_familyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_families.
     */
    skip?: number
    distinct?: Call_familyScalarFieldEnum | Call_familyScalarFieldEnum[]
  }

  /**
   * call_family create
   */
  export type call_familyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * The data needed to create a call_family.
     */
    data: XOR<call_familyCreateInput, call_familyUncheckedCreateInput>
  }

  /**
   * call_family createMany
   */
  export type call_familyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many call_families.
     */
    data: call_familyCreateManyInput | call_familyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * call_family createManyAndReturn
   */
  export type call_familyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * The data used to create many call_families.
     */
    data: call_familyCreateManyInput | call_familyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * call_family update
   */
  export type call_familyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * The data needed to update a call_family.
     */
    data: XOR<call_familyUpdateInput, call_familyUncheckedUpdateInput>
    /**
     * Choose, which call_family to update.
     */
    where: call_familyWhereUniqueInput
  }

  /**
   * call_family updateMany
   */
  export type call_familyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update call_families.
     */
    data: XOR<call_familyUpdateManyMutationInput, call_familyUncheckedUpdateManyInput>
    /**
     * Filter which call_families to update
     */
    where?: call_familyWhereInput
    /**
     * Limit how many call_families to update.
     */
    limit?: number
  }

  /**
   * call_family updateManyAndReturn
   */
  export type call_familyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * The data used to update call_families.
     */
    data: XOR<call_familyUpdateManyMutationInput, call_familyUncheckedUpdateManyInput>
    /**
     * Filter which call_families to update
     */
    where?: call_familyWhereInput
    /**
     * Limit how many call_families to update.
     */
    limit?: number
  }

  /**
   * call_family upsert
   */
  export type call_familyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * The filter to search for the call_family to update in case it exists.
     */
    where: call_familyWhereUniqueInput
    /**
     * In case the call_family found by the `where` argument doesn't exist, create a new call_family with this data.
     */
    create: XOR<call_familyCreateInput, call_familyUncheckedCreateInput>
    /**
     * In case the call_family was found with the provided `where` argument, update it with this data.
     */
    update: XOR<call_familyUpdateInput, call_familyUncheckedUpdateInput>
  }

  /**
   * call_family delete
   */
  export type call_familyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
    /**
     * Filter which call_family to delete.
     */
    where: call_familyWhereUniqueInput
  }

  /**
   * call_family deleteMany
   */
  export type call_familyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call_families to delete
     */
    where?: call_familyWhereInput
    /**
     * Limit how many call_families to delete.
     */
    limit?: number
  }

  /**
   * call_family.call
   */
  export type call_family$callArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call
     */
    select?: callSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call
     */
    omit?: callOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callInclude<ExtArgs> | null
    where?: callWhereInput
    orderBy?: callOrderByWithRelationInput | callOrderByWithRelationInput[]
    cursor?: callWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[]
  }

  /**
   * call_family without action
   */
  export type call_familyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_family
     */
    select?: call_familySelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_family
     */
    omit?: call_familyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_familyInclude<ExtArgs> | null
  }


  /**
   * Model call_formation
   */

  export type AggregateCall_formation = {
    _count: Call_formationCountAggregateOutputType | null
    _avg: Call_formationAvgAggregateOutputType | null
    _sum: Call_formationSumAggregateOutputType | null
    _min: Call_formationMinAggregateOutputType | null
    _max: Call_formationMaxAggregateOutputType | null
  }

  export type Call_formationAvgAggregateOutputType = {
    callId: number | null
    startId: number | null
    endId: number | null
  }

  export type Call_formationSumAggregateOutputType = {
    callId: number | null
    startId: number | null
    endId: number | null
  }

  export type Call_formationMinAggregateOutputType = {
    callId: number | null
    startId: number | null
    endId: number | null
  }

  export type Call_formationMaxAggregateOutputType = {
    callId: number | null
    startId: number | null
    endId: number | null
  }

  export type Call_formationCountAggregateOutputType = {
    callId: number
    startId: number
    endId: number
    _all: number
  }


  export type Call_formationAvgAggregateInputType = {
    callId?: true
    startId?: true
    endId?: true
  }

  export type Call_formationSumAggregateInputType = {
    callId?: true
    startId?: true
    endId?: true
  }

  export type Call_formationMinAggregateInputType = {
    callId?: true
    startId?: true
    endId?: true
  }

  export type Call_formationMaxAggregateInputType = {
    callId?: true
    startId?: true
    endId?: true
  }

  export type Call_formationCountAggregateInputType = {
    callId?: true
    startId?: true
    endId?: true
    _all?: true
  }

  export type Call_formationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call_formation to aggregate.
     */
    where?: call_formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_formations to fetch.
     */
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: call_formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned call_formations
    **/
    _count?: true | Call_formationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Call_formationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Call_formationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Call_formationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Call_formationMaxAggregateInputType
  }

  export type GetCall_formationAggregateType<T extends Call_formationAggregateArgs> = {
        [P in keyof T & keyof AggregateCall_formation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCall_formation[P]>
      : GetScalarType<T[P], AggregateCall_formation[P]>
  }




  export type call_formationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_formationWhereInput
    orderBy?: call_formationOrderByWithAggregationInput | call_formationOrderByWithAggregationInput[]
    by: Call_formationScalarFieldEnum[] | Call_formationScalarFieldEnum
    having?: call_formationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Call_formationCountAggregateInputType | true
    _avg?: Call_formationAvgAggregateInputType
    _sum?: Call_formationSumAggregateInputType
    _min?: Call_formationMinAggregateInputType
    _max?: Call_formationMaxAggregateInputType
  }

  export type Call_formationGroupByOutputType = {
    callId: number
    startId: number
    endId: number
    _count: Call_formationCountAggregateOutputType | null
    _avg: Call_formationAvgAggregateOutputType | null
    _sum: Call_formationSumAggregateOutputType | null
    _min: Call_formationMinAggregateOutputType | null
    _max: Call_formationMaxAggregateOutputType | null
  }

  type GetCall_formationGroupByPayload<T extends call_formationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Call_formationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Call_formationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Call_formationGroupByOutputType[P]>
            : GetScalarType<T[P], Call_formationGroupByOutputType[P]>
        }
      >
    >


  export type call_formationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    callId?: boolean
    startId?: boolean
    endId?: boolean
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
    endForm?: boolean | formationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_formation"]>

  export type call_formationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    callId?: boolean
    startId?: boolean
    endId?: boolean
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
    endForm?: boolean | formationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_formation"]>

  export type call_formationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    callId?: boolean
    startId?: boolean
    endId?: boolean
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
    endForm?: boolean | formationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_formation"]>

  export type call_formationSelectScalar = {
    callId?: boolean
    startId?: boolean
    endId?: boolean
  }

  export type call_formationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"callId" | "startId" | "endId", ExtArgs["result"]["call_formation"]>
  export type call_formationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
    endForm?: boolean | formationDefaultArgs<ExtArgs>
  }
  export type call_formationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
    endForm?: boolean | formationDefaultArgs<ExtArgs>
  }
  export type call_formationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
    endForm?: boolean | formationDefaultArgs<ExtArgs>
  }

  export type $call_formationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "call_formation"
    objects: {
      call: Prisma.$callPayload<ExtArgs>
      startForm: Prisma.$formationPayload<ExtArgs>
      endForm: Prisma.$formationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      callId: number
      startId: number
      endId: number
    }, ExtArgs["result"]["call_formation"]>
    composites: {}
  }

  type call_formationGetPayload<S extends boolean | null | undefined | call_formationDefaultArgs> = $Result.GetResult<Prisma.$call_formationPayload, S>

  type call_formationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<call_formationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Call_formationCountAggregateInputType | true
    }

  export interface call_formationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['call_formation'], meta: { name: 'call_formation' } }
    /**
     * Find zero or one Call_formation that matches the filter.
     * @param {call_formationFindUniqueArgs} args - Arguments to find a Call_formation
     * @example
     * // Get one Call_formation
     * const call_formation = await prisma.call_formation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends call_formationFindUniqueArgs>(args: SelectSubset<T, call_formationFindUniqueArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Call_formation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {call_formationFindUniqueOrThrowArgs} args - Arguments to find a Call_formation
     * @example
     * // Get one Call_formation
     * const call_formation = await prisma.call_formation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends call_formationFindUniqueOrThrowArgs>(args: SelectSubset<T, call_formationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call_formation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_formationFindFirstArgs} args - Arguments to find a Call_formation
     * @example
     * // Get one Call_formation
     * const call_formation = await prisma.call_formation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends call_formationFindFirstArgs>(args?: SelectSubset<T, call_formationFindFirstArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call_formation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_formationFindFirstOrThrowArgs} args - Arguments to find a Call_formation
     * @example
     * // Get one Call_formation
     * const call_formation = await prisma.call_formation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends call_formationFindFirstOrThrowArgs>(args?: SelectSubset<T, call_formationFindFirstOrThrowArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Call_formations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_formationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Call_formations
     * const call_formations = await prisma.call_formation.findMany()
     * 
     * // Get first 10 Call_formations
     * const call_formations = await prisma.call_formation.findMany({ take: 10 })
     * 
     * // Only select the `callId`
     * const call_formationWithCallIdOnly = await prisma.call_formation.findMany({ select: { callId: true } })
     * 
     */
    findMany<T extends call_formationFindManyArgs>(args?: SelectSubset<T, call_formationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Call_formation.
     * @param {call_formationCreateArgs} args - Arguments to create a Call_formation.
     * @example
     * // Create one Call_formation
     * const Call_formation = await prisma.call_formation.create({
     *   data: {
     *     // ... data to create a Call_formation
     *   }
     * })
     * 
     */
    create<T extends call_formationCreateArgs>(args: SelectSubset<T, call_formationCreateArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Call_formations.
     * @param {call_formationCreateManyArgs} args - Arguments to create many Call_formations.
     * @example
     * // Create many Call_formations
     * const call_formation = await prisma.call_formation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends call_formationCreateManyArgs>(args?: SelectSubset<T, call_formationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Call_formations and returns the data saved in the database.
     * @param {call_formationCreateManyAndReturnArgs} args - Arguments to create many Call_formations.
     * @example
     * // Create many Call_formations
     * const call_formation = await prisma.call_formation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Call_formations and only return the `callId`
     * const call_formationWithCallIdOnly = await prisma.call_formation.createManyAndReturn({
     *   select: { callId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends call_formationCreateManyAndReturnArgs>(args?: SelectSubset<T, call_formationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Call_formation.
     * @param {call_formationDeleteArgs} args - Arguments to delete one Call_formation.
     * @example
     * // Delete one Call_formation
     * const Call_formation = await prisma.call_formation.delete({
     *   where: {
     *     // ... filter to delete one Call_formation
     *   }
     * })
     * 
     */
    delete<T extends call_formationDeleteArgs>(args: SelectSubset<T, call_formationDeleteArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Call_formation.
     * @param {call_formationUpdateArgs} args - Arguments to update one Call_formation.
     * @example
     * // Update one Call_formation
     * const call_formation = await prisma.call_formation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends call_formationUpdateArgs>(args: SelectSubset<T, call_formationUpdateArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Call_formations.
     * @param {call_formationDeleteManyArgs} args - Arguments to filter Call_formations to delete.
     * @example
     * // Delete a few Call_formations
     * const { count } = await prisma.call_formation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends call_formationDeleteManyArgs>(args?: SelectSubset<T, call_formationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Call_formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_formationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Call_formations
     * const call_formation = await prisma.call_formation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends call_formationUpdateManyArgs>(args: SelectSubset<T, call_formationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Call_formations and returns the data updated in the database.
     * @param {call_formationUpdateManyAndReturnArgs} args - Arguments to update many Call_formations.
     * @example
     * // Update many Call_formations
     * const call_formation = await prisma.call_formation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Call_formations and only return the `callId`
     * const call_formationWithCallIdOnly = await prisma.call_formation.updateManyAndReturn({
     *   select: { callId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends call_formationUpdateManyAndReturnArgs>(args: SelectSubset<T, call_formationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Call_formation.
     * @param {call_formationUpsertArgs} args - Arguments to update or create a Call_formation.
     * @example
     * // Update or create a Call_formation
     * const call_formation = await prisma.call_formation.upsert({
     *   create: {
     *     // ... data to create a Call_formation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Call_formation we want to update
     *   }
     * })
     */
    upsert<T extends call_formationUpsertArgs>(args: SelectSubset<T, call_formationUpsertArgs<ExtArgs>>): Prisma__call_formationClient<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Call_formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_formationCountArgs} args - Arguments to filter Call_formations to count.
     * @example
     * // Count the number of Call_formations
     * const count = await prisma.call_formation.count({
     *   where: {
     *     // ... the filter for the Call_formations we want to count
     *   }
     * })
    **/
    count<T extends call_formationCountArgs>(
      args?: Subset<T, call_formationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Call_formationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Call_formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Call_formationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Call_formationAggregateArgs>(args: Subset<T, Call_formationAggregateArgs>): Prisma.PrismaPromise<GetCall_formationAggregateType<T>>

    /**
     * Group by Call_formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_formationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends call_formationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: call_formationGroupByArgs['orderBy'] }
        : { orderBy?: call_formationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, call_formationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCall_formationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the call_formation model
   */
  readonly fields: call_formationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for call_formation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__call_formationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    call<T extends callDefaultArgs<ExtArgs> = {}>(args?: Subset<T, callDefaultArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    startForm<T extends formationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, formationDefaultArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    endForm<T extends formationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, formationDefaultArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the call_formation model
   */
  interface call_formationFieldRefs {
    readonly callId: FieldRef<"call_formation", 'Int'>
    readonly startId: FieldRef<"call_formation", 'Int'>
    readonly endId: FieldRef<"call_formation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * call_formation findUnique
   */
  export type call_formationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * Filter, which call_formation to fetch.
     */
    where: call_formationWhereUniqueInput
  }

  /**
   * call_formation findUniqueOrThrow
   */
  export type call_formationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * Filter, which call_formation to fetch.
     */
    where: call_formationWhereUniqueInput
  }

  /**
   * call_formation findFirst
   */
  export type call_formationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * Filter, which call_formation to fetch.
     */
    where?: call_formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_formations to fetch.
     */
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for call_formations.
     */
    cursor?: call_formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of call_formations.
     */
    distinct?: Call_formationScalarFieldEnum | Call_formationScalarFieldEnum[]
  }

  /**
   * call_formation findFirstOrThrow
   */
  export type call_formationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * Filter, which call_formation to fetch.
     */
    where?: call_formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_formations to fetch.
     */
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for call_formations.
     */
    cursor?: call_formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of call_formations.
     */
    distinct?: Call_formationScalarFieldEnum | Call_formationScalarFieldEnum[]
  }

  /**
   * call_formation findMany
   */
  export type call_formationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * Filter, which call_formations to fetch.
     */
    where?: call_formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_formations to fetch.
     */
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing call_formations.
     */
    cursor?: call_formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_formations.
     */
    skip?: number
    distinct?: Call_formationScalarFieldEnum | Call_formationScalarFieldEnum[]
  }

  /**
   * call_formation create
   */
  export type call_formationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * The data needed to create a call_formation.
     */
    data: XOR<call_formationCreateInput, call_formationUncheckedCreateInput>
  }

  /**
   * call_formation createMany
   */
  export type call_formationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many call_formations.
     */
    data: call_formationCreateManyInput | call_formationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * call_formation createManyAndReturn
   */
  export type call_formationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * The data used to create many call_formations.
     */
    data: call_formationCreateManyInput | call_formationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * call_formation update
   */
  export type call_formationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * The data needed to update a call_formation.
     */
    data: XOR<call_formationUpdateInput, call_formationUncheckedUpdateInput>
    /**
     * Choose, which call_formation to update.
     */
    where: call_formationWhereUniqueInput
  }

  /**
   * call_formation updateMany
   */
  export type call_formationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update call_formations.
     */
    data: XOR<call_formationUpdateManyMutationInput, call_formationUncheckedUpdateManyInput>
    /**
     * Filter which call_formations to update
     */
    where?: call_formationWhereInput
    /**
     * Limit how many call_formations to update.
     */
    limit?: number
  }

  /**
   * call_formation updateManyAndReturn
   */
  export type call_formationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * The data used to update call_formations.
     */
    data: XOR<call_formationUpdateManyMutationInput, call_formationUncheckedUpdateManyInput>
    /**
     * Filter which call_formations to update
     */
    where?: call_formationWhereInput
    /**
     * Limit how many call_formations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * call_formation upsert
   */
  export type call_formationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * The filter to search for the call_formation to update in case it exists.
     */
    where: call_formationWhereUniqueInput
    /**
     * In case the call_formation found by the `where` argument doesn't exist, create a new call_formation with this data.
     */
    create: XOR<call_formationCreateInput, call_formationUncheckedCreateInput>
    /**
     * In case the call_formation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<call_formationUpdateInput, call_formationUncheckedUpdateInput>
  }

  /**
   * call_formation delete
   */
  export type call_formationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    /**
     * Filter which call_formation to delete.
     */
    where: call_formationWhereUniqueInput
  }

  /**
   * call_formation deleteMany
   */
  export type call_formationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call_formations to delete
     */
    where?: call_formationWhereInput
    /**
     * Limit how many call_formations to delete.
     */
    limit?: number
  }

  /**
   * call_formation without action
   */
  export type call_formationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
  }


  /**
   * Model formation
   */

  export type AggregateFormation = {
    _count: FormationCountAggregateOutputType | null
    _avg: FormationAvgAggregateOutputType | null
    _sum: FormationSumAggregateOutputType | null
    _min: FormationMinAggregateOutputType | null
    _max: FormationMaxAggregateOutputType | null
  }

  export type FormationAvgAggregateOutputType = {
    formId: number | null
  }

  export type FormationSumAggregateOutputType = {
    formId: number | null
  }

  export type FormationMinAggregateOutputType = {
    formId: number | null
    name: string | null
    description: string | null
    clCode: string | null
    sdCode: string | null
  }

  export type FormationMaxAggregateOutputType = {
    formId: number | null
    name: string | null
    description: string | null
    clCode: string | null
    sdCode: string | null
  }

  export type FormationCountAggregateOutputType = {
    formId: number
    name: number
    description: number
    clCode: number
    sdCode: number
    _all: number
  }


  export type FormationAvgAggregateInputType = {
    formId?: true
  }

  export type FormationSumAggregateInputType = {
    formId?: true
  }

  export type FormationMinAggregateInputType = {
    formId?: true
    name?: true
    description?: true
    clCode?: true
    sdCode?: true
  }

  export type FormationMaxAggregateInputType = {
    formId?: true
    name?: true
    description?: true
    clCode?: true
    sdCode?: true
  }

  export type FormationCountAggregateInputType = {
    formId?: true
    name?: true
    description?: true
    clCode?: true
    sdCode?: true
    _all?: true
  }

  export type FormationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which formation to aggregate.
     */
    where?: formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of formations to fetch.
     */
    orderBy?: formationOrderByWithRelationInput | formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned formations
    **/
    _count?: true | FormationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormationMaxAggregateInputType
  }

  export type GetFormationAggregateType<T extends FormationAggregateArgs> = {
        [P in keyof T & keyof AggregateFormation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormation[P]>
      : GetScalarType<T[P], AggregateFormation[P]>
  }




  export type formationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: formationWhereInput
    orderBy?: formationOrderByWithAggregationInput | formationOrderByWithAggregationInput[]
    by: FormationScalarFieldEnum[] | FormationScalarFieldEnum
    having?: formationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormationCountAggregateInputType | true
    _avg?: FormationAvgAggregateInputType
    _sum?: FormationSumAggregateInputType
    _min?: FormationMinAggregateInputType
    _max?: FormationMaxAggregateInputType
  }

  export type FormationGroupByOutputType = {
    formId: number
    name: string
    description: string | null
    clCode: string | null
    sdCode: string | null
    _count: FormationCountAggregateOutputType | null
    _avg: FormationAvgAggregateOutputType | null
    _sum: FormationSumAggregateOutputType | null
    _min: FormationMinAggregateOutputType | null
    _max: FormationMaxAggregateOutputType | null
  }

  type GetFormationGroupByPayload<T extends formationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormationGroupByOutputType[P]>
            : GetScalarType<T[P], FormationGroupByOutputType[P]>
        }
      >
    >


  export type formationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    formId?: boolean
    name?: boolean
    description?: boolean
    clCode?: boolean
    sdCode?: boolean
    callStart?: boolean | formation$callStartArgs<ExtArgs>
    callEnding?: boolean | formation$callEndingArgs<ExtArgs>
    sequences?: boolean | formation$sequencesArgs<ExtArgs>
    _count?: boolean | FormationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formation"]>

  export type formationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    formId?: boolean
    name?: boolean
    description?: boolean
    clCode?: boolean
    sdCode?: boolean
  }, ExtArgs["result"]["formation"]>

  export type formationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    formId?: boolean
    name?: boolean
    description?: boolean
    clCode?: boolean
    sdCode?: boolean
  }, ExtArgs["result"]["formation"]>

  export type formationSelectScalar = {
    formId?: boolean
    name?: boolean
    description?: boolean
    clCode?: boolean
    sdCode?: boolean
  }

  export type formationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"formId" | "name" | "description" | "clCode" | "sdCode", ExtArgs["result"]["formation"]>
  export type formationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callStart?: boolean | formation$callStartArgs<ExtArgs>
    callEnding?: boolean | formation$callEndingArgs<ExtArgs>
    sequences?: boolean | formation$sequencesArgs<ExtArgs>
    _count?: boolean | FormationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type formationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type formationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $formationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "formation"
    objects: {
      callStart: Prisma.$call_formationPayload<ExtArgs>[]
      callEnding: Prisma.$call_formationPayload<ExtArgs>[]
      sequences: Prisma.$sequence_callsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      formId: number
      name: string
      description: string | null
      clCode: string | null
      sdCode: string | null
    }, ExtArgs["result"]["formation"]>
    composites: {}
  }

  type formationGetPayload<S extends boolean | null | undefined | formationDefaultArgs> = $Result.GetResult<Prisma.$formationPayload, S>

  type formationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<formationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormationCountAggregateInputType | true
    }

  export interface formationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['formation'], meta: { name: 'formation' } }
    /**
     * Find zero or one Formation that matches the filter.
     * @param {formationFindUniqueArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends formationFindUniqueArgs>(args: SelectSubset<T, formationFindUniqueArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Formation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {formationFindUniqueOrThrowArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends formationFindUniqueOrThrowArgs>(args: SelectSubset<T, formationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {formationFindFirstArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends formationFindFirstArgs>(args?: SelectSubset<T, formationFindFirstArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {formationFindFirstOrThrowArgs} args - Arguments to find a Formation
     * @example
     * // Get one Formation
     * const formation = await prisma.formation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends formationFindFirstOrThrowArgs>(args?: SelectSubset<T, formationFindFirstOrThrowArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Formations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {formationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Formations
     * const formations = await prisma.formation.findMany()
     * 
     * // Get first 10 Formations
     * const formations = await prisma.formation.findMany({ take: 10 })
     * 
     * // Only select the `formId`
     * const formationWithFormIdOnly = await prisma.formation.findMany({ select: { formId: true } })
     * 
     */
    findMany<T extends formationFindManyArgs>(args?: SelectSubset<T, formationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Formation.
     * @param {formationCreateArgs} args - Arguments to create a Formation.
     * @example
     * // Create one Formation
     * const Formation = await prisma.formation.create({
     *   data: {
     *     // ... data to create a Formation
     *   }
     * })
     * 
     */
    create<T extends formationCreateArgs>(args: SelectSubset<T, formationCreateArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Formations.
     * @param {formationCreateManyArgs} args - Arguments to create many Formations.
     * @example
     * // Create many Formations
     * const formation = await prisma.formation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends formationCreateManyArgs>(args?: SelectSubset<T, formationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Formations and returns the data saved in the database.
     * @param {formationCreateManyAndReturnArgs} args - Arguments to create many Formations.
     * @example
     * // Create many Formations
     * const formation = await prisma.formation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Formations and only return the `formId`
     * const formationWithFormIdOnly = await prisma.formation.createManyAndReturn({
     *   select: { formId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends formationCreateManyAndReturnArgs>(args?: SelectSubset<T, formationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Formation.
     * @param {formationDeleteArgs} args - Arguments to delete one Formation.
     * @example
     * // Delete one Formation
     * const Formation = await prisma.formation.delete({
     *   where: {
     *     // ... filter to delete one Formation
     *   }
     * })
     * 
     */
    delete<T extends formationDeleteArgs>(args: SelectSubset<T, formationDeleteArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Formation.
     * @param {formationUpdateArgs} args - Arguments to update one Formation.
     * @example
     * // Update one Formation
     * const formation = await prisma.formation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends formationUpdateArgs>(args: SelectSubset<T, formationUpdateArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Formations.
     * @param {formationDeleteManyArgs} args - Arguments to filter Formations to delete.
     * @example
     * // Delete a few Formations
     * const { count } = await prisma.formation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends formationDeleteManyArgs>(args?: SelectSubset<T, formationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {formationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Formations
     * const formation = await prisma.formation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends formationUpdateManyArgs>(args: SelectSubset<T, formationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formations and returns the data updated in the database.
     * @param {formationUpdateManyAndReturnArgs} args - Arguments to update many Formations.
     * @example
     * // Update many Formations
     * const formation = await prisma.formation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Formations and only return the `formId`
     * const formationWithFormIdOnly = await prisma.formation.updateManyAndReturn({
     *   select: { formId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends formationUpdateManyAndReturnArgs>(args: SelectSubset<T, formationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Formation.
     * @param {formationUpsertArgs} args - Arguments to update or create a Formation.
     * @example
     * // Update or create a Formation
     * const formation = await prisma.formation.upsert({
     *   create: {
     *     // ... data to create a Formation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Formation we want to update
     *   }
     * })
     */
    upsert<T extends formationUpsertArgs>(args: SelectSubset<T, formationUpsertArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Formations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {formationCountArgs} args - Arguments to filter Formations to count.
     * @example
     * // Count the number of Formations
     * const count = await prisma.formation.count({
     *   where: {
     *     // ... the filter for the Formations we want to count
     *   }
     * })
    **/
    count<T extends formationCountArgs>(
      args?: Subset<T, formationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormationAggregateArgs>(args: Subset<T, FormationAggregateArgs>): Prisma.PrismaPromise<GetFormationAggregateType<T>>

    /**
     * Group by Formation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {formationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends formationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: formationGroupByArgs['orderBy'] }
        : { orderBy?: formationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, formationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the formation model
   */
  readonly fields: formationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for formation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__formationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    callStart<T extends formation$callStartArgs<ExtArgs> = {}>(args?: Subset<T, formation$callStartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    callEnding<T extends formation$callEndingArgs<ExtArgs> = {}>(args?: Subset<T, formation$callEndingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_formationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sequences<T extends formation$sequencesArgs<ExtArgs> = {}>(args?: Subset<T, formation$sequencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the formation model
   */
  interface formationFieldRefs {
    readonly formId: FieldRef<"formation", 'Int'>
    readonly name: FieldRef<"formation", 'String'>
    readonly description: FieldRef<"formation", 'String'>
    readonly clCode: FieldRef<"formation", 'String'>
    readonly sdCode: FieldRef<"formation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * formation findUnique
   */
  export type formationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * Filter, which formation to fetch.
     */
    where: formationWhereUniqueInput
  }

  /**
   * formation findUniqueOrThrow
   */
  export type formationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * Filter, which formation to fetch.
     */
    where: formationWhereUniqueInput
  }

  /**
   * formation findFirst
   */
  export type formationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * Filter, which formation to fetch.
     */
    where?: formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of formations to fetch.
     */
    orderBy?: formationOrderByWithRelationInput | formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for formations.
     */
    cursor?: formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * formation findFirstOrThrow
   */
  export type formationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * Filter, which formation to fetch.
     */
    where?: formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of formations to fetch.
     */
    orderBy?: formationOrderByWithRelationInput | formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for formations.
     */
    cursor?: formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` formations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of formations.
     */
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * formation findMany
   */
  export type formationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * Filter, which formations to fetch.
     */
    where?: formationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of formations to fetch.
     */
    orderBy?: formationOrderByWithRelationInput | formationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing formations.
     */
    cursor?: formationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` formations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` formations.
     */
    skip?: number
    distinct?: FormationScalarFieldEnum | FormationScalarFieldEnum[]
  }

  /**
   * formation create
   */
  export type formationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * The data needed to create a formation.
     */
    data: XOR<formationCreateInput, formationUncheckedCreateInput>
  }

  /**
   * formation createMany
   */
  export type formationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many formations.
     */
    data: formationCreateManyInput | formationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * formation createManyAndReturn
   */
  export type formationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * The data used to create many formations.
     */
    data: formationCreateManyInput | formationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * formation update
   */
  export type formationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * The data needed to update a formation.
     */
    data: XOR<formationUpdateInput, formationUncheckedUpdateInput>
    /**
     * Choose, which formation to update.
     */
    where: formationWhereUniqueInput
  }

  /**
   * formation updateMany
   */
  export type formationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update formations.
     */
    data: XOR<formationUpdateManyMutationInput, formationUncheckedUpdateManyInput>
    /**
     * Filter which formations to update
     */
    where?: formationWhereInput
    /**
     * Limit how many formations to update.
     */
    limit?: number
  }

  /**
   * formation updateManyAndReturn
   */
  export type formationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * The data used to update formations.
     */
    data: XOR<formationUpdateManyMutationInput, formationUncheckedUpdateManyInput>
    /**
     * Filter which formations to update
     */
    where?: formationWhereInput
    /**
     * Limit how many formations to update.
     */
    limit?: number
  }

  /**
   * formation upsert
   */
  export type formationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * The filter to search for the formation to update in case it exists.
     */
    where: formationWhereUniqueInput
    /**
     * In case the formation found by the `where` argument doesn't exist, create a new formation with this data.
     */
    create: XOR<formationCreateInput, formationUncheckedCreateInput>
    /**
     * In case the formation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<formationUpdateInput, formationUncheckedUpdateInput>
  }

  /**
   * formation delete
   */
  export type formationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
    /**
     * Filter which formation to delete.
     */
    where: formationWhereUniqueInput
  }

  /**
   * formation deleteMany
   */
  export type formationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which formations to delete
     */
    where?: formationWhereInput
    /**
     * Limit how many formations to delete.
     */
    limit?: number
  }

  /**
   * formation.callStart
   */
  export type formation$callStartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    where?: call_formationWhereInput
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    cursor?: call_formationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Call_formationScalarFieldEnum | Call_formationScalarFieldEnum[]
  }

  /**
   * formation.callEnding
   */
  export type formation$callEndingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_formation
     */
    select?: call_formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_formation
     */
    omit?: call_formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_formationInclude<ExtArgs> | null
    where?: call_formationWhereInput
    orderBy?: call_formationOrderByWithRelationInput | call_formationOrderByWithRelationInput[]
    cursor?: call_formationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Call_formationScalarFieldEnum | Call_formationScalarFieldEnum[]
  }

  /**
   * formation.sequences
   */
  export type formation$sequencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    where?: sequence_callsWhereInput
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    cursor?: sequence_callsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sequence_callsScalarFieldEnum | Sequence_callsScalarFieldEnum[]
  }

  /**
   * formation without action
   */
  export type formationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the formation
     */
    select?: formationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the formation
     */
    omit?: formationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: formationInclude<ExtArgs> | null
  }


  /**
   * Model program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramAvgAggregateOutputType = {
    programId: number | null
    order: number | null
  }

  export type ProgramSumAggregateOutputType = {
    programId: number | null
    order: number | null
  }

  export type ProgramMinAggregateOutputType = {
    programId: number | null
    name: string | null
    order: number | null
  }

  export type ProgramMaxAggregateOutputType = {
    programId: number | null
    name: string | null
    order: number | null
  }

  export type ProgramCountAggregateOutputType = {
    programId: number
    name: number
    order: number
    _all: number
  }


  export type ProgramAvgAggregateInputType = {
    programId?: true
    order?: true
  }

  export type ProgramSumAggregateInputType = {
    programId?: true
    order?: true
  }

  export type ProgramMinAggregateInputType = {
    programId?: true
    name?: true
    order?: true
  }

  export type ProgramMaxAggregateInputType = {
    programId?: true
    name?: true
    order?: true
  }

  export type ProgramCountAggregateInputType = {
    programId?: true
    name?: true
    order?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which program to aggregate.
     */
    where?: programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of programs to fetch.
     */
    orderBy?: programOrderByWithRelationInput | programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type programGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: programWhereInput
    orderBy?: programOrderByWithAggregationInput | programOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: programScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _avg?: ProgramAvgAggregateInputType
    _sum?: ProgramSumAggregateInputType
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    programId: number
    name: string
    order: number
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends programGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type programSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    programId?: boolean
    name?: boolean
    order?: boolean
    dancers?: boolean | program$dancersArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type programSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    programId?: boolean
    name?: boolean
    order?: boolean
  }, ExtArgs["result"]["program"]>

  export type programSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    programId?: boolean
    name?: boolean
    order?: boolean
  }, ExtArgs["result"]["program"]>

  export type programSelectScalar = {
    programId?: boolean
    name?: boolean
    order?: boolean
  }

  export type programOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"programId" | "name" | "order", ExtArgs["result"]["program"]>
  export type programInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancers?: boolean | program$dancersArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type programIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type programIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $programPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "program"
    objects: {
      dancers: Prisma.$dance_programPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      programId: number
      name: string
      order: number
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  type programGetPayload<S extends boolean | null | undefined | programDefaultArgs> = $Result.GetResult<Prisma.$programPayload, S>

  type programCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<programFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface programDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['program'], meta: { name: 'program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {programFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends programFindUniqueArgs>(args: SelectSubset<T, programFindUniqueArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {programFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends programFindUniqueOrThrowArgs>(args: SelectSubset<T, programFindUniqueOrThrowArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {programFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends programFindFirstArgs>(args?: SelectSubset<T, programFindFirstArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {programFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends programFindFirstOrThrowArgs>(args?: SelectSubset<T, programFindFirstOrThrowArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {programFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `programId`
     * const programWithProgramIdOnly = await prisma.program.findMany({ select: { programId: true } })
     * 
     */
    findMany<T extends programFindManyArgs>(args?: SelectSubset<T, programFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Program.
     * @param {programCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends programCreateArgs>(args: SelectSubset<T, programCreateArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Programs.
     * @param {programCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends programCreateManyArgs>(args?: SelectSubset<T, programCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {programCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `programId`
     * const programWithProgramIdOnly = await prisma.program.createManyAndReturn({
     *   select: { programId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends programCreateManyAndReturnArgs>(args?: SelectSubset<T, programCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Program.
     * @param {programDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends programDeleteArgs>(args: SelectSubset<T, programDeleteArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Program.
     * @param {programUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends programUpdateArgs>(args: SelectSubset<T, programUpdateArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Programs.
     * @param {programDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends programDeleteManyArgs>(args?: SelectSubset<T, programDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {programUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends programUpdateManyArgs>(args: SelectSubset<T, programUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs and returns the data updated in the database.
     * @param {programUpdateManyAndReturnArgs} args - Arguments to update many Programs.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Programs and only return the `programId`
     * const programWithProgramIdOnly = await prisma.program.updateManyAndReturn({
     *   select: { programId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends programUpdateManyAndReturnArgs>(args: SelectSubset<T, programUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Program.
     * @param {programUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends programUpsertArgs>(args: SelectSubset<T, programUpsertArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {programCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends programCountArgs>(
      args?: Subset<T, programCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {programGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends programGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: programGroupByArgs['orderBy'] }
        : { orderBy?: programGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, programGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the program model
   */
  readonly fields: programFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__programClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dancers<T extends program$dancersArgs<ExtArgs> = {}>(args?: Subset<T, program$dancersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the program model
   */
  interface programFieldRefs {
    readonly programId: FieldRef<"program", 'Int'>
    readonly name: FieldRef<"program", 'String'>
    readonly order: FieldRef<"program", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * program findUnique
   */
  export type programFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * Filter, which program to fetch.
     */
    where: programWhereUniqueInput
  }

  /**
   * program findUniqueOrThrow
   */
  export type programFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * Filter, which program to fetch.
     */
    where: programWhereUniqueInput
  }

  /**
   * program findFirst
   */
  export type programFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * Filter, which program to fetch.
     */
    where?: programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of programs to fetch.
     */
    orderBy?: programOrderByWithRelationInput | programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for programs.
     */
    cursor?: programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * program findFirstOrThrow
   */
  export type programFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * Filter, which program to fetch.
     */
    where?: programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of programs to fetch.
     */
    orderBy?: programOrderByWithRelationInput | programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for programs.
     */
    cursor?: programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * program findMany
   */
  export type programFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * Filter, which programs to fetch.
     */
    where?: programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of programs to fetch.
     */
    orderBy?: programOrderByWithRelationInput | programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing programs.
     */
    cursor?: programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * program create
   */
  export type programCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * The data needed to create a program.
     */
    data: XOR<programCreateInput, programUncheckedCreateInput>
  }

  /**
   * program createMany
   */
  export type programCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many programs.
     */
    data: programCreateManyInput | programCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * program createManyAndReturn
   */
  export type programCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * The data used to create many programs.
     */
    data: programCreateManyInput | programCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * program update
   */
  export type programUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * The data needed to update a program.
     */
    data: XOR<programUpdateInput, programUncheckedUpdateInput>
    /**
     * Choose, which program to update.
     */
    where: programWhereUniqueInput
  }

  /**
   * program updateMany
   */
  export type programUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update programs.
     */
    data: XOR<programUpdateManyMutationInput, programUncheckedUpdateManyInput>
    /**
     * Filter which programs to update
     */
    where?: programWhereInput
    /**
     * Limit how many programs to update.
     */
    limit?: number
  }

  /**
   * program updateManyAndReturn
   */
  export type programUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * The data used to update programs.
     */
    data: XOR<programUpdateManyMutationInput, programUncheckedUpdateManyInput>
    /**
     * Filter which programs to update
     */
    where?: programWhereInput
    /**
     * Limit how many programs to update.
     */
    limit?: number
  }

  /**
   * program upsert
   */
  export type programUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * The filter to search for the program to update in case it exists.
     */
    where: programWhereUniqueInput
    /**
     * In case the program found by the `where` argument doesn't exist, create a new program with this data.
     */
    create: XOR<programCreateInput, programUncheckedCreateInput>
    /**
     * In case the program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<programUpdateInput, programUncheckedUpdateInput>
  }

  /**
   * program delete
   */
  export type programDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
    /**
     * Filter which program to delete.
     */
    where: programWhereUniqueInput
  }

  /**
   * program deleteMany
   */
  export type programDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which programs to delete
     */
    where?: programWhereInput
    /**
     * Limit how many programs to delete.
     */
    limit?: number
  }

  /**
   * program.dancers
   */
  export type program$dancersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    where?: dance_programWhereInput
    orderBy?: dance_programOrderByWithRelationInput | dance_programOrderByWithRelationInput[]
    cursor?: dance_programWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Dance_programScalarFieldEnum | Dance_programScalarFieldEnum[]
  }

  /**
   * program without action
   */
  export type programDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the program
     */
    select?: programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the program
     */
    omit?: programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: programInclude<ExtArgs> | null
  }


  /**
   * Model sequence
   */

  export type AggregateSequence = {
    _count: SequenceCountAggregateOutputType | null
    _avg: SequenceAvgAggregateOutputType | null
    _sum: SequenceSumAggregateOutputType | null
    _min: SequenceMinAggregateOutputType | null
    _max: SequenceMaxAggregateOutputType | null
  }

  export type SequenceAvgAggregateOutputType = {
    seqId: number | null
  }

  export type SequenceSumAggregateOutputType = {
    seqId: number | null
  }

  export type SequenceMinAggregateOutputType = {
    seqId: number | null
    name: string | null
  }

  export type SequenceMaxAggregateOutputType = {
    seqId: number | null
    name: string | null
  }

  export type SequenceCountAggregateOutputType = {
    seqId: number
    name: number
    _all: number
  }


  export type SequenceAvgAggregateInputType = {
    seqId?: true
  }

  export type SequenceSumAggregateInputType = {
    seqId?: true
  }

  export type SequenceMinAggregateInputType = {
    seqId?: true
    name?: true
  }

  export type SequenceMaxAggregateInputType = {
    seqId?: true
    name?: true
  }

  export type SequenceCountAggregateInputType = {
    seqId?: true
    name?: true
    _all?: true
  }

  export type SequenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sequence to aggregate.
     */
    where?: sequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequences to fetch.
     */
    orderBy?: sequenceOrderByWithRelationInput | sequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sequences
    **/
    _count?: true | SequenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SequenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SequenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SequenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SequenceMaxAggregateInputType
  }

  export type GetSequenceAggregateType<T extends SequenceAggregateArgs> = {
        [P in keyof T & keyof AggregateSequence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSequence[P]>
      : GetScalarType<T[P], AggregateSequence[P]>
  }




  export type sequenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sequenceWhereInput
    orderBy?: sequenceOrderByWithAggregationInput | sequenceOrderByWithAggregationInput[]
    by: SequenceScalarFieldEnum[] | SequenceScalarFieldEnum
    having?: sequenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SequenceCountAggregateInputType | true
    _avg?: SequenceAvgAggregateInputType
    _sum?: SequenceSumAggregateInputType
    _min?: SequenceMinAggregateInputType
    _max?: SequenceMaxAggregateInputType
  }

  export type SequenceGroupByOutputType = {
    seqId: number
    name: string
    _count: SequenceCountAggregateOutputType | null
    _avg: SequenceAvgAggregateOutputType | null
    _sum: SequenceSumAggregateOutputType | null
    _min: SequenceMinAggregateOutputType | null
    _max: SequenceMaxAggregateOutputType | null
  }

  type GetSequenceGroupByPayload<T extends sequenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SequenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SequenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SequenceGroupByOutputType[P]>
            : GetScalarType<T[P], SequenceGroupByOutputType[P]>
        }
      >
    >


  export type sequenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seqId?: boolean
    name?: boolean
    calls?: boolean | sequence$callsArgs<ExtArgs>
    _count?: boolean | SequenceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sequence"]>

  export type sequenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seqId?: boolean
    name?: boolean
  }, ExtArgs["result"]["sequence"]>

  export type sequenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seqId?: boolean
    name?: boolean
  }, ExtArgs["result"]["sequence"]>

  export type sequenceSelectScalar = {
    seqId?: boolean
    name?: boolean
  }

  export type sequenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"seqId" | "name", ExtArgs["result"]["sequence"]>
  export type sequenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | sequence$callsArgs<ExtArgs>
    _count?: boolean | SequenceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type sequenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type sequenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $sequencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sequence"
    objects: {
      calls: Prisma.$sequence_callsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      seqId: number
      name: string
    }, ExtArgs["result"]["sequence"]>
    composites: {}
  }

  type sequenceGetPayload<S extends boolean | null | undefined | sequenceDefaultArgs> = $Result.GetResult<Prisma.$sequencePayload, S>

  type sequenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sequenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SequenceCountAggregateInputType | true
    }

  export interface sequenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sequence'], meta: { name: 'sequence' } }
    /**
     * Find zero or one Sequence that matches the filter.
     * @param {sequenceFindUniqueArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sequenceFindUniqueArgs>(args: SelectSubset<T, sequenceFindUniqueArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sequence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sequenceFindUniqueOrThrowArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sequenceFindUniqueOrThrowArgs>(args: SelectSubset<T, sequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sequence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequenceFindFirstArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sequenceFindFirstArgs>(args?: SelectSubset<T, sequenceFindFirstArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sequence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequenceFindFirstOrThrowArgs} args - Arguments to find a Sequence
     * @example
     * // Get one Sequence
     * const sequence = await prisma.sequence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sequenceFindFirstOrThrowArgs>(args?: SelectSubset<T, sequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sequences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sequences
     * const sequences = await prisma.sequence.findMany()
     * 
     * // Get first 10 Sequences
     * const sequences = await prisma.sequence.findMany({ take: 10 })
     * 
     * // Only select the `seqId`
     * const sequenceWithSeqIdOnly = await prisma.sequence.findMany({ select: { seqId: true } })
     * 
     */
    findMany<T extends sequenceFindManyArgs>(args?: SelectSubset<T, sequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sequence.
     * @param {sequenceCreateArgs} args - Arguments to create a Sequence.
     * @example
     * // Create one Sequence
     * const Sequence = await prisma.sequence.create({
     *   data: {
     *     // ... data to create a Sequence
     *   }
     * })
     * 
     */
    create<T extends sequenceCreateArgs>(args: SelectSubset<T, sequenceCreateArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sequences.
     * @param {sequenceCreateManyArgs} args - Arguments to create many Sequences.
     * @example
     * // Create many Sequences
     * const sequence = await prisma.sequence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sequenceCreateManyArgs>(args?: SelectSubset<T, sequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sequences and returns the data saved in the database.
     * @param {sequenceCreateManyAndReturnArgs} args - Arguments to create many Sequences.
     * @example
     * // Create many Sequences
     * const sequence = await prisma.sequence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sequences and only return the `seqId`
     * const sequenceWithSeqIdOnly = await prisma.sequence.createManyAndReturn({
     *   select: { seqId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sequenceCreateManyAndReturnArgs>(args?: SelectSubset<T, sequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sequence.
     * @param {sequenceDeleteArgs} args - Arguments to delete one Sequence.
     * @example
     * // Delete one Sequence
     * const Sequence = await prisma.sequence.delete({
     *   where: {
     *     // ... filter to delete one Sequence
     *   }
     * })
     * 
     */
    delete<T extends sequenceDeleteArgs>(args: SelectSubset<T, sequenceDeleteArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sequence.
     * @param {sequenceUpdateArgs} args - Arguments to update one Sequence.
     * @example
     * // Update one Sequence
     * const sequence = await prisma.sequence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sequenceUpdateArgs>(args: SelectSubset<T, sequenceUpdateArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sequences.
     * @param {sequenceDeleteManyArgs} args - Arguments to filter Sequences to delete.
     * @example
     * // Delete a few Sequences
     * const { count } = await prisma.sequence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sequenceDeleteManyArgs>(args?: SelectSubset<T, sequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sequences
     * const sequence = await prisma.sequence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sequenceUpdateManyArgs>(args: SelectSubset<T, sequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sequences and returns the data updated in the database.
     * @param {sequenceUpdateManyAndReturnArgs} args - Arguments to update many Sequences.
     * @example
     * // Update many Sequences
     * const sequence = await prisma.sequence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sequences and only return the `seqId`
     * const sequenceWithSeqIdOnly = await prisma.sequence.updateManyAndReturn({
     *   select: { seqId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sequenceUpdateManyAndReturnArgs>(args: SelectSubset<T, sequenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sequence.
     * @param {sequenceUpsertArgs} args - Arguments to update or create a Sequence.
     * @example
     * // Update or create a Sequence
     * const sequence = await prisma.sequence.upsert({
     *   create: {
     *     // ... data to create a Sequence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sequence we want to update
     *   }
     * })
     */
    upsert<T extends sequenceUpsertArgs>(args: SelectSubset<T, sequenceUpsertArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequenceCountArgs} args - Arguments to filter Sequences to count.
     * @example
     * // Count the number of Sequences
     * const count = await prisma.sequence.count({
     *   where: {
     *     // ... the filter for the Sequences we want to count
     *   }
     * })
    **/
    count<T extends sequenceCountArgs>(
      args?: Subset<T, sequenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SequenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SequenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SequenceAggregateArgs>(args: Subset<T, SequenceAggregateArgs>): Prisma.PrismaPromise<GetSequenceAggregateType<T>>

    /**
     * Group by Sequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sequenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sequenceGroupByArgs['orderBy'] }
        : { orderBy?: sequenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sequence model
   */
  readonly fields: sequenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sequence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sequenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calls<T extends sequence$callsArgs<ExtArgs> = {}>(args?: Subset<T, sequence$callsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sequence model
   */
  interface sequenceFieldRefs {
    readonly seqId: FieldRef<"sequence", 'Int'>
    readonly name: FieldRef<"sequence", 'String'>
  }
    

  // Custom InputTypes
  /**
   * sequence findUnique
   */
  export type sequenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * Filter, which sequence to fetch.
     */
    where: sequenceWhereUniqueInput
  }

  /**
   * sequence findUniqueOrThrow
   */
  export type sequenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * Filter, which sequence to fetch.
     */
    where: sequenceWhereUniqueInput
  }

  /**
   * sequence findFirst
   */
  export type sequenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * Filter, which sequence to fetch.
     */
    where?: sequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequences to fetch.
     */
    orderBy?: sequenceOrderByWithRelationInput | sequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sequences.
     */
    cursor?: sequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sequences.
     */
    distinct?: SequenceScalarFieldEnum | SequenceScalarFieldEnum[]
  }

  /**
   * sequence findFirstOrThrow
   */
  export type sequenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * Filter, which sequence to fetch.
     */
    where?: sequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequences to fetch.
     */
    orderBy?: sequenceOrderByWithRelationInput | sequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sequences.
     */
    cursor?: sequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sequences.
     */
    distinct?: SequenceScalarFieldEnum | SequenceScalarFieldEnum[]
  }

  /**
   * sequence findMany
   */
  export type sequenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * Filter, which sequences to fetch.
     */
    where?: sequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequences to fetch.
     */
    orderBy?: sequenceOrderByWithRelationInput | sequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sequences.
     */
    cursor?: sequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequences.
     */
    skip?: number
    distinct?: SequenceScalarFieldEnum | SequenceScalarFieldEnum[]
  }

  /**
   * sequence create
   */
  export type sequenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * The data needed to create a sequence.
     */
    data: XOR<sequenceCreateInput, sequenceUncheckedCreateInput>
  }

  /**
   * sequence createMany
   */
  export type sequenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sequences.
     */
    data: sequenceCreateManyInput | sequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sequence createManyAndReturn
   */
  export type sequenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * The data used to create many sequences.
     */
    data: sequenceCreateManyInput | sequenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sequence update
   */
  export type sequenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * The data needed to update a sequence.
     */
    data: XOR<sequenceUpdateInput, sequenceUncheckedUpdateInput>
    /**
     * Choose, which sequence to update.
     */
    where: sequenceWhereUniqueInput
  }

  /**
   * sequence updateMany
   */
  export type sequenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sequences.
     */
    data: XOR<sequenceUpdateManyMutationInput, sequenceUncheckedUpdateManyInput>
    /**
     * Filter which sequences to update
     */
    where?: sequenceWhereInput
    /**
     * Limit how many sequences to update.
     */
    limit?: number
  }

  /**
   * sequence updateManyAndReturn
   */
  export type sequenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * The data used to update sequences.
     */
    data: XOR<sequenceUpdateManyMutationInput, sequenceUncheckedUpdateManyInput>
    /**
     * Filter which sequences to update
     */
    where?: sequenceWhereInput
    /**
     * Limit how many sequences to update.
     */
    limit?: number
  }

  /**
   * sequence upsert
   */
  export type sequenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * The filter to search for the sequence to update in case it exists.
     */
    where: sequenceWhereUniqueInput
    /**
     * In case the sequence found by the `where` argument doesn't exist, create a new sequence with this data.
     */
    create: XOR<sequenceCreateInput, sequenceUncheckedCreateInput>
    /**
     * In case the sequence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sequenceUpdateInput, sequenceUncheckedUpdateInput>
  }

  /**
   * sequence delete
   */
  export type sequenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
    /**
     * Filter which sequence to delete.
     */
    where: sequenceWhereUniqueInput
  }

  /**
   * sequence deleteMany
   */
  export type sequenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sequences to delete
     */
    where?: sequenceWhereInput
    /**
     * Limit how many sequences to delete.
     */
    limit?: number
  }

  /**
   * sequence.calls
   */
  export type sequence$callsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    where?: sequence_callsWhereInput
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    cursor?: sequence_callsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Sequence_callsScalarFieldEnum | Sequence_callsScalarFieldEnum[]
  }

  /**
   * sequence without action
   */
  export type sequenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence
     */
    select?: sequenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence
     */
    omit?: sequenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequenceInclude<ExtArgs> | null
  }


  /**
   * Model sequence_calls
   */

  export type AggregateSequence_calls = {
    _count: Sequence_callsCountAggregateOutputType | null
    _avg: Sequence_callsAvgAggregateOutputType | null
    _sum: Sequence_callsSumAggregateOutputType | null
    _min: Sequence_callsMinAggregateOutputType | null
    _max: Sequence_callsMaxAggregateOutputType | null
  }

  export type Sequence_callsAvgAggregateOutputType = {
    seqId: number | null
    callId: number | null
    startId: number | null
    order: number | null
  }

  export type Sequence_callsSumAggregateOutputType = {
    seqId: number | null
    callId: number | null
    startId: number | null
    order: number | null
  }

  export type Sequence_callsMinAggregateOutputType = {
    seqId: number | null
    callId: number | null
    startId: number | null
    order: number | null
    helperText: string | null
  }

  export type Sequence_callsMaxAggregateOutputType = {
    seqId: number | null
    callId: number | null
    startId: number | null
    order: number | null
    helperText: string | null
  }

  export type Sequence_callsCountAggregateOutputType = {
    seqId: number
    callId: number
    startId: number
    order: number
    helperText: number
    _all: number
  }


  export type Sequence_callsAvgAggregateInputType = {
    seqId?: true
    callId?: true
    startId?: true
    order?: true
  }

  export type Sequence_callsSumAggregateInputType = {
    seqId?: true
    callId?: true
    startId?: true
    order?: true
  }

  export type Sequence_callsMinAggregateInputType = {
    seqId?: true
    callId?: true
    startId?: true
    order?: true
    helperText?: true
  }

  export type Sequence_callsMaxAggregateInputType = {
    seqId?: true
    callId?: true
    startId?: true
    order?: true
    helperText?: true
  }

  export type Sequence_callsCountAggregateInputType = {
    seqId?: true
    callId?: true
    startId?: true
    order?: true
    helperText?: true
    _all?: true
  }

  export type Sequence_callsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sequence_calls to aggregate.
     */
    where?: sequence_callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequence_calls to fetch.
     */
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sequence_callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequence_calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequence_calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sequence_calls
    **/
    _count?: true | Sequence_callsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Sequence_callsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Sequence_callsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Sequence_callsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Sequence_callsMaxAggregateInputType
  }

  export type GetSequence_callsAggregateType<T extends Sequence_callsAggregateArgs> = {
        [P in keyof T & keyof AggregateSequence_calls]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSequence_calls[P]>
      : GetScalarType<T[P], AggregateSequence_calls[P]>
  }




  export type sequence_callsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sequence_callsWhereInput
    orderBy?: sequence_callsOrderByWithAggregationInput | sequence_callsOrderByWithAggregationInput[]
    by: Sequence_callsScalarFieldEnum[] | Sequence_callsScalarFieldEnum
    having?: sequence_callsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Sequence_callsCountAggregateInputType | true
    _avg?: Sequence_callsAvgAggregateInputType
    _sum?: Sequence_callsSumAggregateInputType
    _min?: Sequence_callsMinAggregateInputType
    _max?: Sequence_callsMaxAggregateInputType
  }

  export type Sequence_callsGroupByOutputType = {
    seqId: number
    callId: number
    startId: number
    order: number
    helperText: string | null
    _count: Sequence_callsCountAggregateOutputType | null
    _avg: Sequence_callsAvgAggregateOutputType | null
    _sum: Sequence_callsSumAggregateOutputType | null
    _min: Sequence_callsMinAggregateOutputType | null
    _max: Sequence_callsMaxAggregateOutputType | null
  }

  type GetSequence_callsGroupByPayload<T extends sequence_callsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Sequence_callsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Sequence_callsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Sequence_callsGroupByOutputType[P]>
            : GetScalarType<T[P], Sequence_callsGroupByOutputType[P]>
        }
      >
    >


  export type sequence_callsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seqId?: boolean
    callId?: boolean
    startId?: boolean
    order?: boolean
    helperText?: boolean
    sequence?: boolean | sequenceDefaultArgs<ExtArgs>
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sequence_calls"]>

  export type sequence_callsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seqId?: boolean
    callId?: boolean
    startId?: boolean
    order?: boolean
    helperText?: boolean
    sequence?: boolean | sequenceDefaultArgs<ExtArgs>
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sequence_calls"]>

  export type sequence_callsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seqId?: boolean
    callId?: boolean
    startId?: boolean
    order?: boolean
    helperText?: boolean
    sequence?: boolean | sequenceDefaultArgs<ExtArgs>
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sequence_calls"]>

  export type sequence_callsSelectScalar = {
    seqId?: boolean
    callId?: boolean
    startId?: boolean
    order?: boolean
    helperText?: boolean
  }

  export type sequence_callsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"seqId" | "callId" | "startId" | "order" | "helperText", ExtArgs["result"]["sequence_calls"]>
  export type sequence_callsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequence?: boolean | sequenceDefaultArgs<ExtArgs>
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
  }
  export type sequence_callsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequence?: boolean | sequenceDefaultArgs<ExtArgs>
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
  }
  export type sequence_callsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sequence?: boolean | sequenceDefaultArgs<ExtArgs>
    call?: boolean | callDefaultArgs<ExtArgs>
    startForm?: boolean | formationDefaultArgs<ExtArgs>
  }

  export type $sequence_callsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "sequence_calls"
    objects: {
      sequence: Prisma.$sequencePayload<ExtArgs>
      call: Prisma.$callPayload<ExtArgs>
      startForm: Prisma.$formationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      seqId: number
      callId: number
      startId: number
      order: number
      helperText: string | null
    }, ExtArgs["result"]["sequence_calls"]>
    composites: {}
  }

  type sequence_callsGetPayload<S extends boolean | null | undefined | sequence_callsDefaultArgs> = $Result.GetResult<Prisma.$sequence_callsPayload, S>

  type sequence_callsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sequence_callsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Sequence_callsCountAggregateInputType | true
    }

  export interface sequence_callsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['sequence_calls'], meta: { name: 'sequence_calls' } }
    /**
     * Find zero or one Sequence_calls that matches the filter.
     * @param {sequence_callsFindUniqueArgs} args - Arguments to find a Sequence_calls
     * @example
     * // Get one Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sequence_callsFindUniqueArgs>(args: SelectSubset<T, sequence_callsFindUniqueArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sequence_calls that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sequence_callsFindUniqueOrThrowArgs} args - Arguments to find a Sequence_calls
     * @example
     * // Get one Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sequence_callsFindUniqueOrThrowArgs>(args: SelectSubset<T, sequence_callsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sequence_calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequence_callsFindFirstArgs} args - Arguments to find a Sequence_calls
     * @example
     * // Get one Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sequence_callsFindFirstArgs>(args?: SelectSubset<T, sequence_callsFindFirstArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sequence_calls that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequence_callsFindFirstOrThrowArgs} args - Arguments to find a Sequence_calls
     * @example
     * // Get one Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sequence_callsFindFirstOrThrowArgs>(args?: SelectSubset<T, sequence_callsFindFirstOrThrowArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sequence_calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequence_callsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.findMany()
     * 
     * // Get first 10 Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.findMany({ take: 10 })
     * 
     * // Only select the `seqId`
     * const sequence_callsWithSeqIdOnly = await prisma.sequence_calls.findMany({ select: { seqId: true } })
     * 
     */
    findMany<T extends sequence_callsFindManyArgs>(args?: SelectSubset<T, sequence_callsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sequence_calls.
     * @param {sequence_callsCreateArgs} args - Arguments to create a Sequence_calls.
     * @example
     * // Create one Sequence_calls
     * const Sequence_calls = await prisma.sequence_calls.create({
     *   data: {
     *     // ... data to create a Sequence_calls
     *   }
     * })
     * 
     */
    create<T extends sequence_callsCreateArgs>(args: SelectSubset<T, sequence_callsCreateArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sequence_calls.
     * @param {sequence_callsCreateManyArgs} args - Arguments to create many Sequence_calls.
     * @example
     * // Create many Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sequence_callsCreateManyArgs>(args?: SelectSubset<T, sequence_callsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sequence_calls and returns the data saved in the database.
     * @param {sequence_callsCreateManyAndReturnArgs} args - Arguments to create many Sequence_calls.
     * @example
     * // Create many Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sequence_calls and only return the `seqId`
     * const sequence_callsWithSeqIdOnly = await prisma.sequence_calls.createManyAndReturn({
     *   select: { seqId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sequence_callsCreateManyAndReturnArgs>(args?: SelectSubset<T, sequence_callsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sequence_calls.
     * @param {sequence_callsDeleteArgs} args - Arguments to delete one Sequence_calls.
     * @example
     * // Delete one Sequence_calls
     * const Sequence_calls = await prisma.sequence_calls.delete({
     *   where: {
     *     // ... filter to delete one Sequence_calls
     *   }
     * })
     * 
     */
    delete<T extends sequence_callsDeleteArgs>(args: SelectSubset<T, sequence_callsDeleteArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sequence_calls.
     * @param {sequence_callsUpdateArgs} args - Arguments to update one Sequence_calls.
     * @example
     * // Update one Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sequence_callsUpdateArgs>(args: SelectSubset<T, sequence_callsUpdateArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sequence_calls.
     * @param {sequence_callsDeleteManyArgs} args - Arguments to filter Sequence_calls to delete.
     * @example
     * // Delete a few Sequence_calls
     * const { count } = await prisma.sequence_calls.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sequence_callsDeleteManyArgs>(args?: SelectSubset<T, sequence_callsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sequence_calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequence_callsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sequence_callsUpdateManyArgs>(args: SelectSubset<T, sequence_callsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sequence_calls and returns the data updated in the database.
     * @param {sequence_callsUpdateManyAndReturnArgs} args - Arguments to update many Sequence_calls.
     * @example
     * // Update many Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sequence_calls and only return the `seqId`
     * const sequence_callsWithSeqIdOnly = await prisma.sequence_calls.updateManyAndReturn({
     *   select: { seqId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sequence_callsUpdateManyAndReturnArgs>(args: SelectSubset<T, sequence_callsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sequence_calls.
     * @param {sequence_callsUpsertArgs} args - Arguments to update or create a Sequence_calls.
     * @example
     * // Update or create a Sequence_calls
     * const sequence_calls = await prisma.sequence_calls.upsert({
     *   create: {
     *     // ... data to create a Sequence_calls
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sequence_calls we want to update
     *   }
     * })
     */
    upsert<T extends sequence_callsUpsertArgs>(args: SelectSubset<T, sequence_callsUpsertArgs<ExtArgs>>): Prisma__sequence_callsClient<$Result.GetResult<Prisma.$sequence_callsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sequence_calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequence_callsCountArgs} args - Arguments to filter Sequence_calls to count.
     * @example
     * // Count the number of Sequence_calls
     * const count = await prisma.sequence_calls.count({
     *   where: {
     *     // ... the filter for the Sequence_calls we want to count
     *   }
     * })
    **/
    count<T extends sequence_callsCountArgs>(
      args?: Subset<T, sequence_callsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Sequence_callsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sequence_calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sequence_callsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sequence_callsAggregateArgs>(args: Subset<T, Sequence_callsAggregateArgs>): Prisma.PrismaPromise<GetSequence_callsAggregateType<T>>

    /**
     * Group by Sequence_calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sequence_callsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sequence_callsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sequence_callsGroupByArgs['orderBy'] }
        : { orderBy?: sequence_callsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sequence_callsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSequence_callsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the sequence_calls model
   */
  readonly fields: sequence_callsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for sequence_calls.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sequence_callsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sequence<T extends sequenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, sequenceDefaultArgs<ExtArgs>>): Prisma__sequenceClient<$Result.GetResult<Prisma.$sequencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    call<T extends callDefaultArgs<ExtArgs> = {}>(args?: Subset<T, callDefaultArgs<ExtArgs>>): Prisma__callClient<$Result.GetResult<Prisma.$callPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    startForm<T extends formationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, formationDefaultArgs<ExtArgs>>): Prisma__formationClient<$Result.GetResult<Prisma.$formationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the sequence_calls model
   */
  interface sequence_callsFieldRefs {
    readonly seqId: FieldRef<"sequence_calls", 'Int'>
    readonly callId: FieldRef<"sequence_calls", 'Int'>
    readonly startId: FieldRef<"sequence_calls", 'Int'>
    readonly order: FieldRef<"sequence_calls", 'Int'>
    readonly helperText: FieldRef<"sequence_calls", 'String'>
  }
    

  // Custom InputTypes
  /**
   * sequence_calls findUnique
   */
  export type sequence_callsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * Filter, which sequence_calls to fetch.
     */
    where: sequence_callsWhereUniqueInput
  }

  /**
   * sequence_calls findUniqueOrThrow
   */
  export type sequence_callsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * Filter, which sequence_calls to fetch.
     */
    where: sequence_callsWhereUniqueInput
  }

  /**
   * sequence_calls findFirst
   */
  export type sequence_callsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * Filter, which sequence_calls to fetch.
     */
    where?: sequence_callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequence_calls to fetch.
     */
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sequence_calls.
     */
    cursor?: sequence_callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequence_calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequence_calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sequence_calls.
     */
    distinct?: Sequence_callsScalarFieldEnum | Sequence_callsScalarFieldEnum[]
  }

  /**
   * sequence_calls findFirstOrThrow
   */
  export type sequence_callsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * Filter, which sequence_calls to fetch.
     */
    where?: sequence_callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequence_calls to fetch.
     */
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sequence_calls.
     */
    cursor?: sequence_callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequence_calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequence_calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sequence_calls.
     */
    distinct?: Sequence_callsScalarFieldEnum | Sequence_callsScalarFieldEnum[]
  }

  /**
   * sequence_calls findMany
   */
  export type sequence_callsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * Filter, which sequence_calls to fetch.
     */
    where?: sequence_callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sequence_calls to fetch.
     */
    orderBy?: sequence_callsOrderByWithRelationInput | sequence_callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sequence_calls.
     */
    cursor?: sequence_callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sequence_calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sequence_calls.
     */
    skip?: number
    distinct?: Sequence_callsScalarFieldEnum | Sequence_callsScalarFieldEnum[]
  }

  /**
   * sequence_calls create
   */
  export type sequence_callsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * The data needed to create a sequence_calls.
     */
    data: XOR<sequence_callsCreateInput, sequence_callsUncheckedCreateInput>
  }

  /**
   * sequence_calls createMany
   */
  export type sequence_callsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sequence_calls.
     */
    data: sequence_callsCreateManyInput | sequence_callsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * sequence_calls createManyAndReturn
   */
  export type sequence_callsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * The data used to create many sequence_calls.
     */
    data: sequence_callsCreateManyInput | sequence_callsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * sequence_calls update
   */
  export type sequence_callsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * The data needed to update a sequence_calls.
     */
    data: XOR<sequence_callsUpdateInput, sequence_callsUncheckedUpdateInput>
    /**
     * Choose, which sequence_calls to update.
     */
    where: sequence_callsWhereUniqueInput
  }

  /**
   * sequence_calls updateMany
   */
  export type sequence_callsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sequence_calls.
     */
    data: XOR<sequence_callsUpdateManyMutationInput, sequence_callsUncheckedUpdateManyInput>
    /**
     * Filter which sequence_calls to update
     */
    where?: sequence_callsWhereInput
    /**
     * Limit how many sequence_calls to update.
     */
    limit?: number
  }

  /**
   * sequence_calls updateManyAndReturn
   */
  export type sequence_callsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * The data used to update sequence_calls.
     */
    data: XOR<sequence_callsUpdateManyMutationInput, sequence_callsUncheckedUpdateManyInput>
    /**
     * Filter which sequence_calls to update
     */
    where?: sequence_callsWhereInput
    /**
     * Limit how many sequence_calls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * sequence_calls upsert
   */
  export type sequence_callsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * The filter to search for the sequence_calls to update in case it exists.
     */
    where: sequence_callsWhereUniqueInput
    /**
     * In case the sequence_calls found by the `where` argument doesn't exist, create a new sequence_calls with this data.
     */
    create: XOR<sequence_callsCreateInput, sequence_callsUncheckedCreateInput>
    /**
     * In case the sequence_calls was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sequence_callsUpdateInput, sequence_callsUncheckedUpdateInput>
  }

  /**
   * sequence_calls delete
   */
  export type sequence_callsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
    /**
     * Filter which sequence_calls to delete.
     */
    where: sequence_callsWhereUniqueInput
  }

  /**
   * sequence_calls deleteMany
   */
  export type sequence_callsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sequence_calls to delete
     */
    where?: sequence_callsWhereInput
    /**
     * Limit how many sequence_calls to delete.
     */
    limit?: number
  }

  /**
   * sequence_calls without action
   */
  export type sequence_callsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the sequence_calls
     */
    select?: sequence_callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the sequence_calls
     */
    omit?: sequence_callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sequence_callsInclude<ExtArgs> | null
  }


  /**
   * Model country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryMinAggregateOutputType = {
    code: string | null
    name: string | null
  }

  export type CountryMaxAggregateOutputType = {
    code: string | null
    name: string | null
  }

  export type CountryCountAggregateOutputType = {
    code: number
    name: number
    _all: number
  }


  export type CountryMinAggregateInputType = {
    code?: true
    name?: true
  }

  export type CountryMaxAggregateInputType = {
    code?: true
    name?: true
  }

  export type CountryCountAggregateInputType = {
    code?: true
    name?: true
    _all?: true
  }

  export type CountryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which country to aggregate.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type countryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: countryWhereInput
    orderBy?: countryOrderByWithAggregationInput | countryOrderByWithAggregationInput[]
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum
    having?: countryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }

  export type CountryGroupByOutputType = {
    code: string
    name: string | null
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends countryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type countrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    name?: boolean
    states?: boolean | country$statesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["country"]>

  export type countrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    name?: boolean
  }, ExtArgs["result"]["country"]>

  export type countrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    code?: boolean
    name?: boolean
  }, ExtArgs["result"]["country"]>

  export type countrySelectScalar = {
    code?: boolean
    name?: boolean
  }

  export type countryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"code" | "name", ExtArgs["result"]["country"]>
  export type countryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    states?: boolean | country$statesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type countryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type countryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $countryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "country"
    objects: {
      states: Prisma.$statePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      code: string
      name: string | null
    }, ExtArgs["result"]["country"]>
    composites: {}
  }

  type countryGetPayload<S extends boolean | null | undefined | countryDefaultArgs> = $Result.GetResult<Prisma.$countryPayload, S>

  type countryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<countryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountryCountAggregateInputType | true
    }

  export interface countryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['country'], meta: { name: 'country' } }
    /**
     * Find zero or one Country that matches the filter.
     * @param {countryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends countryFindUniqueArgs>(args: SelectSubset<T, countryFindUniqueArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {countryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends countryFindUniqueOrThrowArgs>(args: SelectSubset<T, countryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends countryFindFirstArgs>(args?: SelectSubset<T, countryFindFirstArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends countryFindFirstOrThrowArgs>(args?: SelectSubset<T, countryFindFirstOrThrowArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `code`
     * const countryWithCodeOnly = await prisma.country.findMany({ select: { code: true } })
     * 
     */
    findMany<T extends countryFindManyArgs>(args?: SelectSubset<T, countryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Country.
     * @param {countryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
     */
    create<T extends countryCreateArgs>(args: SelectSubset<T, countryCreateArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Countries.
     * @param {countryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends countryCreateManyArgs>(args?: SelectSubset<T, countryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countries and returns the data saved in the database.
     * @param {countryCreateManyAndReturnArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countries and only return the `code`
     * const countryWithCodeOnly = await prisma.country.createManyAndReturn({
     *   select: { code: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends countryCreateManyAndReturnArgs>(args?: SelectSubset<T, countryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Country.
     * @param {countryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
     */
    delete<T extends countryDeleteArgs>(args: SelectSubset<T, countryDeleteArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Country.
     * @param {countryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends countryUpdateArgs>(args: SelectSubset<T, countryUpdateArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Countries.
     * @param {countryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends countryDeleteManyArgs>(args?: SelectSubset<T, countryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends countryUpdateManyArgs>(args: SelectSubset<T, countryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries and returns the data updated in the database.
     * @param {countryUpdateManyAndReturnArgs} args - Arguments to update many Countries.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countries and only return the `code`
     * const countryWithCodeOnly = await prisma.country.updateManyAndReturn({
     *   select: { code: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends countryUpdateManyAndReturnArgs>(args: SelectSubset<T, countryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Country.
     * @param {countryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends countryUpsertArgs>(args: SelectSubset<T, countryUpsertArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends countryCountArgs>(
      args?: Subset<T, countryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): Prisma.PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {countryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends countryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: countryGroupByArgs['orderBy'] }
        : { orderBy?: countryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, countryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the country model
   */
  readonly fields: countryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__countryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    states<T extends country$statesArgs<ExtArgs> = {}>(args?: Subset<T, country$statesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the country model
   */
  interface countryFieldRefs {
    readonly code: FieldRef<"country", 'String'>
    readonly name: FieldRef<"country", 'String'>
  }
    

  // Custom InputTypes
  /**
   * country findUnique
   */
  export type countryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country findUniqueOrThrow
   */
  export type countryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country findFirst
   */
  export type countryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for countries.
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * country findFirstOrThrow
   */
  export type countryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which country to fetch.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for countries.
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * country findMany
   */
  export type countryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter, which countries to fetch.
     */
    where?: countryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of countries to fetch.
     */
    orderBy?: countryOrderByWithRelationInput | countryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing countries.
     */
    cursor?: countryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` countries.
     */
    skip?: number
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * country create
   */
  export type countryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * The data needed to create a country.
     */
    data: XOR<countryCreateInput, countryUncheckedCreateInput>
  }

  /**
   * country createMany
   */
  export type countryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many countries.
     */
    data: countryCreateManyInput | countryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * country createManyAndReturn
   */
  export type countryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * The data used to create many countries.
     */
    data: countryCreateManyInput | countryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * country update
   */
  export type countryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * The data needed to update a country.
     */
    data: XOR<countryUpdateInput, countryUncheckedUpdateInput>
    /**
     * Choose, which country to update.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country updateMany
   */
  export type countryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update countries.
     */
    data: XOR<countryUpdateManyMutationInput, countryUncheckedUpdateManyInput>
    /**
     * Filter which countries to update
     */
    where?: countryWhereInput
    /**
     * Limit how many countries to update.
     */
    limit?: number
  }

  /**
   * country updateManyAndReturn
   */
  export type countryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * The data used to update countries.
     */
    data: XOR<countryUpdateManyMutationInput, countryUncheckedUpdateManyInput>
    /**
     * Filter which countries to update
     */
    where?: countryWhereInput
    /**
     * Limit how many countries to update.
     */
    limit?: number
  }

  /**
   * country upsert
   */
  export type countryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * The filter to search for the country to update in case it exists.
     */
    where: countryWhereUniqueInput
    /**
     * In case the country found by the `where` argument doesn't exist, create a new country with this data.
     */
    create: XOR<countryCreateInput, countryUncheckedCreateInput>
    /**
     * In case the country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<countryUpdateInput, countryUncheckedUpdateInput>
  }

  /**
   * country delete
   */
  export type countryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
    /**
     * Filter which country to delete.
     */
    where: countryWhereUniqueInput
  }

  /**
   * country deleteMany
   */
  export type countryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which countries to delete
     */
    where?: countryWhereInput
    /**
     * Limit how many countries to delete.
     */
    limit?: number
  }

  /**
   * country.states
   */
  export type country$statesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    where?: stateWhereInput
    orderBy?: stateOrderByWithRelationInput | stateOrderByWithRelationInput[]
    cursor?: stateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StateScalarFieldEnum | StateScalarFieldEnum[]
  }

  /**
   * country without action
   */
  export type countryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the country
     */
    select?: countrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the country
     */
    omit?: countryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: countryInclude<ExtArgs> | null
  }


  /**
   * Model dancer
   */

  export type AggregateDancer = {
    _count: DancerCountAggregateOutputType | null
    _avg: DancerAvgAggregateOutputType | null
    _sum: DancerSumAggregateOutputType | null
    _min: DancerMinAggregateOutputType | null
    _max: DancerMaxAggregateOutputType | null
  }

  export type DancerAvgAggregateOutputType = {
    dancerId: number | null
  }

  export type DancerSumAggregateOutputType = {
    dancerId: number | null
  }

  export type DancerMinAggregateOutputType = {
    dancerId: number | null
    name: string | null
    email: string | null
  }

  export type DancerMaxAggregateOutputType = {
    dancerId: number | null
    name: string | null
    email: string | null
  }

  export type DancerCountAggregateOutputType = {
    dancerId: number
    name: number
    email: number
    _all: number
  }


  export type DancerAvgAggregateInputType = {
    dancerId?: true
  }

  export type DancerSumAggregateInputType = {
    dancerId?: true
  }

  export type DancerMinAggregateInputType = {
    dancerId?: true
    name?: true
    email?: true
  }

  export type DancerMaxAggregateInputType = {
    dancerId?: true
    name?: true
    email?: true
  }

  export type DancerCountAggregateInputType = {
    dancerId?: true
    name?: true
    email?: true
    _all?: true
  }

  export type DancerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dancer to aggregate.
     */
    where?: dancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dancers to fetch.
     */
    orderBy?: dancerOrderByWithRelationInput | dancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: dancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dancers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dancers
    **/
    _count?: true | DancerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DancerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DancerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DancerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DancerMaxAggregateInputType
  }

  export type GetDancerAggregateType<T extends DancerAggregateArgs> = {
        [P in keyof T & keyof AggregateDancer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDancer[P]>
      : GetScalarType<T[P], AggregateDancer[P]>
  }




  export type dancerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dancerWhereInput
    orderBy?: dancerOrderByWithAggregationInput | dancerOrderByWithAggregationInput[]
    by: DancerScalarFieldEnum[] | DancerScalarFieldEnum
    having?: dancerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DancerCountAggregateInputType | true
    _avg?: DancerAvgAggregateInputType
    _sum?: DancerSumAggregateInputType
    _min?: DancerMinAggregateInputType
    _max?: DancerMaxAggregateInputType
  }

  export type DancerGroupByOutputType = {
    dancerId: number
    name: string | null
    email: string
    _count: DancerCountAggregateOutputType | null
    _avg: DancerAvgAggregateOutputType | null
    _sum: DancerSumAggregateOutputType | null
    _min: DancerMinAggregateOutputType | null
    _max: DancerMaxAggregateOutputType | null
  }

  type GetDancerGroupByPayload<T extends dancerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DancerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DancerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DancerGroupByOutputType[P]>
            : GetScalarType<T[P], DancerGroupByOutputType[P]>
        }
      >
    >


  export type dancerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    name?: boolean
    email?: boolean
    groups?: boolean | dancer$groupsArgs<ExtArgs>
    levels?: boolean | dancer$levelsArgs<ExtArgs>
    _count?: boolean | DancerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dancer"]>

  export type dancerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["dancer"]>

  export type dancerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    name?: boolean
    email?: boolean
  }, ExtArgs["result"]["dancer"]>

  export type dancerSelectScalar = {
    dancerId?: boolean
    name?: boolean
    email?: boolean
  }

  export type dancerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"dancerId" | "name" | "email", ExtArgs["result"]["dancer"]>
  export type dancerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    groups?: boolean | dancer$groupsArgs<ExtArgs>
    levels?: boolean | dancer$levelsArgs<ExtArgs>
    _count?: boolean | DancerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type dancerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type dancerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $dancerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "dancer"
    objects: {
      groups: Prisma.$dance_groupPayload<ExtArgs>[]
      levels: Prisma.$dance_programPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      dancerId: number
      name: string | null
      email: string
    }, ExtArgs["result"]["dancer"]>
    composites: {}
  }

  type dancerGetPayload<S extends boolean | null | undefined | dancerDefaultArgs> = $Result.GetResult<Prisma.$dancerPayload, S>

  type dancerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<dancerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DancerCountAggregateInputType | true
    }

  export interface dancerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['dancer'], meta: { name: 'dancer' } }
    /**
     * Find zero or one Dancer that matches the filter.
     * @param {dancerFindUniqueArgs} args - Arguments to find a Dancer
     * @example
     * // Get one Dancer
     * const dancer = await prisma.dancer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dancerFindUniqueArgs>(args: SelectSubset<T, dancerFindUniqueArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dancer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dancerFindUniqueOrThrowArgs} args - Arguments to find a Dancer
     * @example
     * // Get one Dancer
     * const dancer = await prisma.dancer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dancerFindUniqueOrThrowArgs>(args: SelectSubset<T, dancerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dancer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dancerFindFirstArgs} args - Arguments to find a Dancer
     * @example
     * // Get one Dancer
     * const dancer = await prisma.dancer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dancerFindFirstArgs>(args?: SelectSubset<T, dancerFindFirstArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dancer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dancerFindFirstOrThrowArgs} args - Arguments to find a Dancer
     * @example
     * // Get one Dancer
     * const dancer = await prisma.dancer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dancerFindFirstOrThrowArgs>(args?: SelectSubset<T, dancerFindFirstOrThrowArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dancers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dancerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dancers
     * const dancers = await prisma.dancer.findMany()
     * 
     * // Get first 10 Dancers
     * const dancers = await prisma.dancer.findMany({ take: 10 })
     * 
     * // Only select the `dancerId`
     * const dancerWithDancerIdOnly = await prisma.dancer.findMany({ select: { dancerId: true } })
     * 
     */
    findMany<T extends dancerFindManyArgs>(args?: SelectSubset<T, dancerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dancer.
     * @param {dancerCreateArgs} args - Arguments to create a Dancer.
     * @example
     * // Create one Dancer
     * const Dancer = await prisma.dancer.create({
     *   data: {
     *     // ... data to create a Dancer
     *   }
     * })
     * 
     */
    create<T extends dancerCreateArgs>(args: SelectSubset<T, dancerCreateArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dancers.
     * @param {dancerCreateManyArgs} args - Arguments to create many Dancers.
     * @example
     * // Create many Dancers
     * const dancer = await prisma.dancer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends dancerCreateManyArgs>(args?: SelectSubset<T, dancerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dancers and returns the data saved in the database.
     * @param {dancerCreateManyAndReturnArgs} args - Arguments to create many Dancers.
     * @example
     * // Create many Dancers
     * const dancer = await prisma.dancer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dancers and only return the `dancerId`
     * const dancerWithDancerIdOnly = await prisma.dancer.createManyAndReturn({
     *   select: { dancerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends dancerCreateManyAndReturnArgs>(args?: SelectSubset<T, dancerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dancer.
     * @param {dancerDeleteArgs} args - Arguments to delete one Dancer.
     * @example
     * // Delete one Dancer
     * const Dancer = await prisma.dancer.delete({
     *   where: {
     *     // ... filter to delete one Dancer
     *   }
     * })
     * 
     */
    delete<T extends dancerDeleteArgs>(args: SelectSubset<T, dancerDeleteArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dancer.
     * @param {dancerUpdateArgs} args - Arguments to update one Dancer.
     * @example
     * // Update one Dancer
     * const dancer = await prisma.dancer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends dancerUpdateArgs>(args: SelectSubset<T, dancerUpdateArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dancers.
     * @param {dancerDeleteManyArgs} args - Arguments to filter Dancers to delete.
     * @example
     * // Delete a few Dancers
     * const { count } = await prisma.dancer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends dancerDeleteManyArgs>(args?: SelectSubset<T, dancerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dancers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dancerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dancers
     * const dancer = await prisma.dancer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends dancerUpdateManyArgs>(args: SelectSubset<T, dancerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dancers and returns the data updated in the database.
     * @param {dancerUpdateManyAndReturnArgs} args - Arguments to update many Dancers.
     * @example
     * // Update many Dancers
     * const dancer = await prisma.dancer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dancers and only return the `dancerId`
     * const dancerWithDancerIdOnly = await prisma.dancer.updateManyAndReturn({
     *   select: { dancerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends dancerUpdateManyAndReturnArgs>(args: SelectSubset<T, dancerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dancer.
     * @param {dancerUpsertArgs} args - Arguments to update or create a Dancer.
     * @example
     * // Update or create a Dancer
     * const dancer = await prisma.dancer.upsert({
     *   create: {
     *     // ... data to create a Dancer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dancer we want to update
     *   }
     * })
     */
    upsert<T extends dancerUpsertArgs>(args: SelectSubset<T, dancerUpsertArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dancers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dancerCountArgs} args - Arguments to filter Dancers to count.
     * @example
     * // Count the number of Dancers
     * const count = await prisma.dancer.count({
     *   where: {
     *     // ... the filter for the Dancers we want to count
     *   }
     * })
    **/
    count<T extends dancerCountArgs>(
      args?: Subset<T, dancerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DancerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dancer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DancerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DancerAggregateArgs>(args: Subset<T, DancerAggregateArgs>): Prisma.PrismaPromise<GetDancerAggregateType<T>>

    /**
     * Group by Dancer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dancerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends dancerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: dancerGroupByArgs['orderBy'] }
        : { orderBy?: dancerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, dancerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDancerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the dancer model
   */
  readonly fields: dancerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for dancer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__dancerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    groups<T extends dancer$groupsArgs<ExtArgs> = {}>(args?: Subset<T, dancer$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    levels<T extends dancer$levelsArgs<ExtArgs> = {}>(args?: Subset<T, dancer$levelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the dancer model
   */
  interface dancerFieldRefs {
    readonly dancerId: FieldRef<"dancer", 'Int'>
    readonly name: FieldRef<"dancer", 'String'>
    readonly email: FieldRef<"dancer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * dancer findUnique
   */
  export type dancerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * Filter, which dancer to fetch.
     */
    where: dancerWhereUniqueInput
  }

  /**
   * dancer findUniqueOrThrow
   */
  export type dancerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * Filter, which dancer to fetch.
     */
    where: dancerWhereUniqueInput
  }

  /**
   * dancer findFirst
   */
  export type dancerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * Filter, which dancer to fetch.
     */
    where?: dancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dancers to fetch.
     */
    orderBy?: dancerOrderByWithRelationInput | dancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dancers.
     */
    cursor?: dancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dancers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dancers.
     */
    distinct?: DancerScalarFieldEnum | DancerScalarFieldEnum[]
  }

  /**
   * dancer findFirstOrThrow
   */
  export type dancerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * Filter, which dancer to fetch.
     */
    where?: dancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dancers to fetch.
     */
    orderBy?: dancerOrderByWithRelationInput | dancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dancers.
     */
    cursor?: dancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dancers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dancers.
     */
    distinct?: DancerScalarFieldEnum | DancerScalarFieldEnum[]
  }

  /**
   * dancer findMany
   */
  export type dancerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * Filter, which dancers to fetch.
     */
    where?: dancerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dancers to fetch.
     */
    orderBy?: dancerOrderByWithRelationInput | dancerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dancers.
     */
    cursor?: dancerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dancers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dancers.
     */
    skip?: number
    distinct?: DancerScalarFieldEnum | DancerScalarFieldEnum[]
  }

  /**
   * dancer create
   */
  export type dancerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * The data needed to create a dancer.
     */
    data: XOR<dancerCreateInput, dancerUncheckedCreateInput>
  }

  /**
   * dancer createMany
   */
  export type dancerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many dancers.
     */
    data: dancerCreateManyInput | dancerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * dancer createManyAndReturn
   */
  export type dancerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * The data used to create many dancers.
     */
    data: dancerCreateManyInput | dancerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * dancer update
   */
  export type dancerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * The data needed to update a dancer.
     */
    data: XOR<dancerUpdateInput, dancerUncheckedUpdateInput>
    /**
     * Choose, which dancer to update.
     */
    where: dancerWhereUniqueInput
  }

  /**
   * dancer updateMany
   */
  export type dancerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update dancers.
     */
    data: XOR<dancerUpdateManyMutationInput, dancerUncheckedUpdateManyInput>
    /**
     * Filter which dancers to update
     */
    where?: dancerWhereInput
    /**
     * Limit how many dancers to update.
     */
    limit?: number
  }

  /**
   * dancer updateManyAndReturn
   */
  export type dancerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * The data used to update dancers.
     */
    data: XOR<dancerUpdateManyMutationInput, dancerUncheckedUpdateManyInput>
    /**
     * Filter which dancers to update
     */
    where?: dancerWhereInput
    /**
     * Limit how many dancers to update.
     */
    limit?: number
  }

  /**
   * dancer upsert
   */
  export type dancerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * The filter to search for the dancer to update in case it exists.
     */
    where: dancerWhereUniqueInput
    /**
     * In case the dancer found by the `where` argument doesn't exist, create a new dancer with this data.
     */
    create: XOR<dancerCreateInput, dancerUncheckedCreateInput>
    /**
     * In case the dancer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<dancerUpdateInput, dancerUncheckedUpdateInput>
  }

  /**
   * dancer delete
   */
  export type dancerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
    /**
     * Filter which dancer to delete.
     */
    where: dancerWhereUniqueInput
  }

  /**
   * dancer deleteMany
   */
  export type dancerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dancers to delete
     */
    where?: dancerWhereInput
    /**
     * Limit how many dancers to delete.
     */
    limit?: number
  }

  /**
   * dancer.groups
   */
  export type dancer$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    where?: dance_groupWhereInput
    orderBy?: dance_groupOrderByWithRelationInput | dance_groupOrderByWithRelationInput[]
    cursor?: dance_groupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Dance_groupScalarFieldEnum | Dance_groupScalarFieldEnum[]
  }

  /**
   * dancer.levels
   */
  export type dancer$levelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    where?: dance_programWhereInput
    orderBy?: dance_programOrderByWithRelationInput | dance_programOrderByWithRelationInput[]
    cursor?: dance_programWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Dance_programScalarFieldEnum | Dance_programScalarFieldEnum[]
  }

  /**
   * dancer without action
   */
  export type dancerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dancer
     */
    select?: dancerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dancer
     */
    omit?: dancerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dancerInclude<ExtArgs> | null
  }


  /**
   * Model dance_group
   */

  export type AggregateDance_group = {
    _count: Dance_groupCountAggregateOutputType | null
    _avg: Dance_groupAvgAggregateOutputType | null
    _sum: Dance_groupSumAggregateOutputType | null
    _min: Dance_groupMinAggregateOutputType | null
    _max: Dance_groupMaxAggregateOutputType | null
  }

  export type Dance_groupAvgAggregateOutputType = {
    dancerId: number | null
  }

  export type Dance_groupSumAggregateOutputType = {
    dancerId: number | null
  }

  export type Dance_groupMinAggregateOutputType = {
    dancerId: number | null
    groupId: string | null
    side: string | null
    proficency: string | null
  }

  export type Dance_groupMaxAggregateOutputType = {
    dancerId: number | null
    groupId: string | null
    side: string | null
    proficency: string | null
  }

  export type Dance_groupCountAggregateOutputType = {
    dancerId: number
    groupId: number
    side: number
    proficency: number
    _all: number
  }


  export type Dance_groupAvgAggregateInputType = {
    dancerId?: true
  }

  export type Dance_groupSumAggregateInputType = {
    dancerId?: true
  }

  export type Dance_groupMinAggregateInputType = {
    dancerId?: true
    groupId?: true
    side?: true
    proficency?: true
  }

  export type Dance_groupMaxAggregateInputType = {
    dancerId?: true
    groupId?: true
    side?: true
    proficency?: true
  }

  export type Dance_groupCountAggregateInputType = {
    dancerId?: true
    groupId?: true
    side?: true
    proficency?: true
    _all?: true
  }

  export type Dance_groupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dance_group to aggregate.
     */
    where?: dance_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_groups to fetch.
     */
    orderBy?: dance_groupOrderByWithRelationInput | dance_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: dance_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dance_groups
    **/
    _count?: true | Dance_groupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Dance_groupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Dance_groupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Dance_groupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Dance_groupMaxAggregateInputType
  }

  export type GetDance_groupAggregateType<T extends Dance_groupAggregateArgs> = {
        [P in keyof T & keyof AggregateDance_group]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDance_group[P]>
      : GetScalarType<T[P], AggregateDance_group[P]>
  }




  export type dance_groupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dance_groupWhereInput
    orderBy?: dance_groupOrderByWithAggregationInput | dance_groupOrderByWithAggregationInput[]
    by: Dance_groupScalarFieldEnum[] | Dance_groupScalarFieldEnum
    having?: dance_groupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Dance_groupCountAggregateInputType | true
    _avg?: Dance_groupAvgAggregateInputType
    _sum?: Dance_groupSumAggregateInputType
    _min?: Dance_groupMinAggregateInputType
    _max?: Dance_groupMaxAggregateInputType
  }

  export type Dance_groupGroupByOutputType = {
    dancerId: number
    groupId: string
    side: string
    proficency: string
    _count: Dance_groupCountAggregateOutputType | null
    _avg: Dance_groupAvgAggregateOutputType | null
    _sum: Dance_groupSumAggregateOutputType | null
    _min: Dance_groupMinAggregateOutputType | null
    _max: Dance_groupMaxAggregateOutputType | null
  }

  type GetDance_groupGroupByPayload<T extends dance_groupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Dance_groupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Dance_groupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Dance_groupGroupByOutputType[P]>
            : GetScalarType<T[P], Dance_groupGroupByOutputType[P]>
        }
      >
    >


  export type dance_groupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    groupId?: boolean
    side?: boolean
    proficency?: boolean
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    group?: boolean | groupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dance_group"]>

  export type dance_groupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    groupId?: boolean
    side?: boolean
    proficency?: boolean
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    group?: boolean | groupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dance_group"]>

  export type dance_groupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    groupId?: boolean
    side?: boolean
    proficency?: boolean
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    group?: boolean | groupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dance_group"]>

  export type dance_groupSelectScalar = {
    dancerId?: boolean
    groupId?: boolean
    side?: boolean
    proficency?: boolean
  }

  export type dance_groupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"dancerId" | "groupId" | "side" | "proficency", ExtArgs["result"]["dance_group"]>
  export type dance_groupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    group?: boolean | groupDefaultArgs<ExtArgs>
  }
  export type dance_groupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    group?: boolean | groupDefaultArgs<ExtArgs>
  }
  export type dance_groupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    group?: boolean | groupDefaultArgs<ExtArgs>
  }

  export type $dance_groupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "dance_group"
    objects: {
      dancer: Prisma.$dancerPayload<ExtArgs>
      group: Prisma.$groupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      dancerId: number
      groupId: string
      side: string
      proficency: string
    }, ExtArgs["result"]["dance_group"]>
    composites: {}
  }

  type dance_groupGetPayload<S extends boolean | null | undefined | dance_groupDefaultArgs> = $Result.GetResult<Prisma.$dance_groupPayload, S>

  type dance_groupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<dance_groupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Dance_groupCountAggregateInputType | true
    }

  export interface dance_groupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['dance_group'], meta: { name: 'dance_group' } }
    /**
     * Find zero or one Dance_group that matches the filter.
     * @param {dance_groupFindUniqueArgs} args - Arguments to find a Dance_group
     * @example
     * // Get one Dance_group
     * const dance_group = await prisma.dance_group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dance_groupFindUniqueArgs>(args: SelectSubset<T, dance_groupFindUniqueArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dance_group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dance_groupFindUniqueOrThrowArgs} args - Arguments to find a Dance_group
     * @example
     * // Get one Dance_group
     * const dance_group = await prisma.dance_group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dance_groupFindUniqueOrThrowArgs>(args: SelectSubset<T, dance_groupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dance_group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_groupFindFirstArgs} args - Arguments to find a Dance_group
     * @example
     * // Get one Dance_group
     * const dance_group = await prisma.dance_group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dance_groupFindFirstArgs>(args?: SelectSubset<T, dance_groupFindFirstArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dance_group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_groupFindFirstOrThrowArgs} args - Arguments to find a Dance_group
     * @example
     * // Get one Dance_group
     * const dance_group = await prisma.dance_group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dance_groupFindFirstOrThrowArgs>(args?: SelectSubset<T, dance_groupFindFirstOrThrowArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dance_groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_groupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dance_groups
     * const dance_groups = await prisma.dance_group.findMany()
     * 
     * // Get first 10 Dance_groups
     * const dance_groups = await prisma.dance_group.findMany({ take: 10 })
     * 
     * // Only select the `dancerId`
     * const dance_groupWithDancerIdOnly = await prisma.dance_group.findMany({ select: { dancerId: true } })
     * 
     */
    findMany<T extends dance_groupFindManyArgs>(args?: SelectSubset<T, dance_groupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dance_group.
     * @param {dance_groupCreateArgs} args - Arguments to create a Dance_group.
     * @example
     * // Create one Dance_group
     * const Dance_group = await prisma.dance_group.create({
     *   data: {
     *     // ... data to create a Dance_group
     *   }
     * })
     * 
     */
    create<T extends dance_groupCreateArgs>(args: SelectSubset<T, dance_groupCreateArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dance_groups.
     * @param {dance_groupCreateManyArgs} args - Arguments to create many Dance_groups.
     * @example
     * // Create many Dance_groups
     * const dance_group = await prisma.dance_group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends dance_groupCreateManyArgs>(args?: SelectSubset<T, dance_groupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dance_groups and returns the data saved in the database.
     * @param {dance_groupCreateManyAndReturnArgs} args - Arguments to create many Dance_groups.
     * @example
     * // Create many Dance_groups
     * const dance_group = await prisma.dance_group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dance_groups and only return the `dancerId`
     * const dance_groupWithDancerIdOnly = await prisma.dance_group.createManyAndReturn({
     *   select: { dancerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends dance_groupCreateManyAndReturnArgs>(args?: SelectSubset<T, dance_groupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dance_group.
     * @param {dance_groupDeleteArgs} args - Arguments to delete one Dance_group.
     * @example
     * // Delete one Dance_group
     * const Dance_group = await prisma.dance_group.delete({
     *   where: {
     *     // ... filter to delete one Dance_group
     *   }
     * })
     * 
     */
    delete<T extends dance_groupDeleteArgs>(args: SelectSubset<T, dance_groupDeleteArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dance_group.
     * @param {dance_groupUpdateArgs} args - Arguments to update one Dance_group.
     * @example
     * // Update one Dance_group
     * const dance_group = await prisma.dance_group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends dance_groupUpdateArgs>(args: SelectSubset<T, dance_groupUpdateArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dance_groups.
     * @param {dance_groupDeleteManyArgs} args - Arguments to filter Dance_groups to delete.
     * @example
     * // Delete a few Dance_groups
     * const { count } = await prisma.dance_group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends dance_groupDeleteManyArgs>(args?: SelectSubset<T, dance_groupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dance_groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_groupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dance_groups
     * const dance_group = await prisma.dance_group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends dance_groupUpdateManyArgs>(args: SelectSubset<T, dance_groupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dance_groups and returns the data updated in the database.
     * @param {dance_groupUpdateManyAndReturnArgs} args - Arguments to update many Dance_groups.
     * @example
     * // Update many Dance_groups
     * const dance_group = await prisma.dance_group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dance_groups and only return the `dancerId`
     * const dance_groupWithDancerIdOnly = await prisma.dance_group.updateManyAndReturn({
     *   select: { dancerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends dance_groupUpdateManyAndReturnArgs>(args: SelectSubset<T, dance_groupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dance_group.
     * @param {dance_groupUpsertArgs} args - Arguments to update or create a Dance_group.
     * @example
     * // Update or create a Dance_group
     * const dance_group = await prisma.dance_group.upsert({
     *   create: {
     *     // ... data to create a Dance_group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dance_group we want to update
     *   }
     * })
     */
    upsert<T extends dance_groupUpsertArgs>(args: SelectSubset<T, dance_groupUpsertArgs<ExtArgs>>): Prisma__dance_groupClient<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dance_groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_groupCountArgs} args - Arguments to filter Dance_groups to count.
     * @example
     * // Count the number of Dance_groups
     * const count = await prisma.dance_group.count({
     *   where: {
     *     // ... the filter for the Dance_groups we want to count
     *   }
     * })
    **/
    count<T extends dance_groupCountArgs>(
      args?: Subset<T, dance_groupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Dance_groupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dance_group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dance_groupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Dance_groupAggregateArgs>(args: Subset<T, Dance_groupAggregateArgs>): Prisma.PrismaPromise<GetDance_groupAggregateType<T>>

    /**
     * Group by Dance_group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_groupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends dance_groupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: dance_groupGroupByArgs['orderBy'] }
        : { orderBy?: dance_groupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, dance_groupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDance_groupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the dance_group model
   */
  readonly fields: dance_groupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for dance_group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__dance_groupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dancer<T extends dancerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, dancerDefaultArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    group<T extends groupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, groupDefaultArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the dance_group model
   */
  interface dance_groupFieldRefs {
    readonly dancerId: FieldRef<"dance_group", 'Int'>
    readonly groupId: FieldRef<"dance_group", 'String'>
    readonly side: FieldRef<"dance_group", 'String'>
    readonly proficency: FieldRef<"dance_group", 'String'>
  }
    

  // Custom InputTypes
  /**
   * dance_group findUnique
   */
  export type dance_groupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * Filter, which dance_group to fetch.
     */
    where: dance_groupWhereUniqueInput
  }

  /**
   * dance_group findUniqueOrThrow
   */
  export type dance_groupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * Filter, which dance_group to fetch.
     */
    where: dance_groupWhereUniqueInput
  }

  /**
   * dance_group findFirst
   */
  export type dance_groupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * Filter, which dance_group to fetch.
     */
    where?: dance_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_groups to fetch.
     */
    orderBy?: dance_groupOrderByWithRelationInput | dance_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dance_groups.
     */
    cursor?: dance_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dance_groups.
     */
    distinct?: Dance_groupScalarFieldEnum | Dance_groupScalarFieldEnum[]
  }

  /**
   * dance_group findFirstOrThrow
   */
  export type dance_groupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * Filter, which dance_group to fetch.
     */
    where?: dance_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_groups to fetch.
     */
    orderBy?: dance_groupOrderByWithRelationInput | dance_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dance_groups.
     */
    cursor?: dance_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dance_groups.
     */
    distinct?: Dance_groupScalarFieldEnum | Dance_groupScalarFieldEnum[]
  }

  /**
   * dance_group findMany
   */
  export type dance_groupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * Filter, which dance_groups to fetch.
     */
    where?: dance_groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_groups to fetch.
     */
    orderBy?: dance_groupOrderByWithRelationInput | dance_groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dance_groups.
     */
    cursor?: dance_groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_groups.
     */
    skip?: number
    distinct?: Dance_groupScalarFieldEnum | Dance_groupScalarFieldEnum[]
  }

  /**
   * dance_group create
   */
  export type dance_groupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * The data needed to create a dance_group.
     */
    data: XOR<dance_groupCreateInput, dance_groupUncheckedCreateInput>
  }

  /**
   * dance_group createMany
   */
  export type dance_groupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many dance_groups.
     */
    data: dance_groupCreateManyInput | dance_groupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * dance_group createManyAndReturn
   */
  export type dance_groupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * The data used to create many dance_groups.
     */
    data: dance_groupCreateManyInput | dance_groupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * dance_group update
   */
  export type dance_groupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * The data needed to update a dance_group.
     */
    data: XOR<dance_groupUpdateInput, dance_groupUncheckedUpdateInput>
    /**
     * Choose, which dance_group to update.
     */
    where: dance_groupWhereUniqueInput
  }

  /**
   * dance_group updateMany
   */
  export type dance_groupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update dance_groups.
     */
    data: XOR<dance_groupUpdateManyMutationInput, dance_groupUncheckedUpdateManyInput>
    /**
     * Filter which dance_groups to update
     */
    where?: dance_groupWhereInput
    /**
     * Limit how many dance_groups to update.
     */
    limit?: number
  }

  /**
   * dance_group updateManyAndReturn
   */
  export type dance_groupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * The data used to update dance_groups.
     */
    data: XOR<dance_groupUpdateManyMutationInput, dance_groupUncheckedUpdateManyInput>
    /**
     * Filter which dance_groups to update
     */
    where?: dance_groupWhereInput
    /**
     * Limit how many dance_groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * dance_group upsert
   */
  export type dance_groupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * The filter to search for the dance_group to update in case it exists.
     */
    where: dance_groupWhereUniqueInput
    /**
     * In case the dance_group found by the `where` argument doesn't exist, create a new dance_group with this data.
     */
    create: XOR<dance_groupCreateInput, dance_groupUncheckedCreateInput>
    /**
     * In case the dance_group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<dance_groupUpdateInput, dance_groupUncheckedUpdateInput>
  }

  /**
   * dance_group delete
   */
  export type dance_groupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    /**
     * Filter which dance_group to delete.
     */
    where: dance_groupWhereUniqueInput
  }

  /**
   * dance_group deleteMany
   */
  export type dance_groupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dance_groups to delete
     */
    where?: dance_groupWhereInput
    /**
     * Limit how many dance_groups to delete.
     */
    limit?: number
  }

  /**
   * dance_group without action
   */
  export type dance_groupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
  }


  /**
   * Model dance_program
   */

  export type AggregateDance_program = {
    _count: Dance_programCountAggregateOutputType | null
    _avg: Dance_programAvgAggregateOutputType | null
    _sum: Dance_programSumAggregateOutputType | null
    _min: Dance_programMinAggregateOutputType | null
    _max: Dance_programMaxAggregateOutputType | null
  }

  export type Dance_programAvgAggregateOutputType = {
    dancerId: number | null
    programId: number | null
  }

  export type Dance_programSumAggregateOutputType = {
    dancerId: number | null
    programId: number | null
  }

  export type Dance_programMinAggregateOutputType = {
    dancerId: number | null
    programId: number | null
    type: string | null
    proficency: string | null
  }

  export type Dance_programMaxAggregateOutputType = {
    dancerId: number | null
    programId: number | null
    type: string | null
    proficency: string | null
  }

  export type Dance_programCountAggregateOutputType = {
    dancerId: number
    programId: number
    type: number
    proficency: number
    _all: number
  }


  export type Dance_programAvgAggregateInputType = {
    dancerId?: true
    programId?: true
  }

  export type Dance_programSumAggregateInputType = {
    dancerId?: true
    programId?: true
  }

  export type Dance_programMinAggregateInputType = {
    dancerId?: true
    programId?: true
    type?: true
    proficency?: true
  }

  export type Dance_programMaxAggregateInputType = {
    dancerId?: true
    programId?: true
    type?: true
    proficency?: true
  }

  export type Dance_programCountAggregateInputType = {
    dancerId?: true
    programId?: true
    type?: true
    proficency?: true
    _all?: true
  }

  export type Dance_programAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dance_program to aggregate.
     */
    where?: dance_programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_programs to fetch.
     */
    orderBy?: dance_programOrderByWithRelationInput | dance_programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: dance_programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dance_programs
    **/
    _count?: true | Dance_programCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Dance_programAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Dance_programSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Dance_programMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Dance_programMaxAggregateInputType
  }

  export type GetDance_programAggregateType<T extends Dance_programAggregateArgs> = {
        [P in keyof T & keyof AggregateDance_program]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDance_program[P]>
      : GetScalarType<T[P], AggregateDance_program[P]>
  }




  export type dance_programGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: dance_programWhereInput
    orderBy?: dance_programOrderByWithAggregationInput | dance_programOrderByWithAggregationInput[]
    by: Dance_programScalarFieldEnum[] | Dance_programScalarFieldEnum
    having?: dance_programScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Dance_programCountAggregateInputType | true
    _avg?: Dance_programAvgAggregateInputType
    _sum?: Dance_programSumAggregateInputType
    _min?: Dance_programMinAggregateInputType
    _max?: Dance_programMaxAggregateInputType
  }

  export type Dance_programGroupByOutputType = {
    dancerId: number
    programId: number
    type: string
    proficency: string
    _count: Dance_programCountAggregateOutputType | null
    _avg: Dance_programAvgAggregateOutputType | null
    _sum: Dance_programSumAggregateOutputType | null
    _min: Dance_programMinAggregateOutputType | null
    _max: Dance_programMaxAggregateOutputType | null
  }

  type GetDance_programGroupByPayload<T extends dance_programGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Dance_programGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Dance_programGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Dance_programGroupByOutputType[P]>
            : GetScalarType<T[P], Dance_programGroupByOutputType[P]>
        }
      >
    >


  export type dance_programSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    programId?: boolean
    type?: boolean
    proficency?: boolean
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    program?: boolean | programDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dance_program"]>

  export type dance_programSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    programId?: boolean
    type?: boolean
    proficency?: boolean
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    program?: boolean | programDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dance_program"]>

  export type dance_programSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dancerId?: boolean
    programId?: boolean
    type?: boolean
    proficency?: boolean
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    program?: boolean | programDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dance_program"]>

  export type dance_programSelectScalar = {
    dancerId?: boolean
    programId?: boolean
    type?: boolean
    proficency?: boolean
  }

  export type dance_programOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"dancerId" | "programId" | "type" | "proficency", ExtArgs["result"]["dance_program"]>
  export type dance_programInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    program?: boolean | programDefaultArgs<ExtArgs>
  }
  export type dance_programIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    program?: boolean | programDefaultArgs<ExtArgs>
  }
  export type dance_programIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dancer?: boolean | dancerDefaultArgs<ExtArgs>
    program?: boolean | programDefaultArgs<ExtArgs>
  }

  export type $dance_programPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "dance_program"
    objects: {
      dancer: Prisma.$dancerPayload<ExtArgs>
      program: Prisma.$programPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      dancerId: number
      programId: number
      type: string
      proficency: string
    }, ExtArgs["result"]["dance_program"]>
    composites: {}
  }

  type dance_programGetPayload<S extends boolean | null | undefined | dance_programDefaultArgs> = $Result.GetResult<Prisma.$dance_programPayload, S>

  type dance_programCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<dance_programFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Dance_programCountAggregateInputType | true
    }

  export interface dance_programDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['dance_program'], meta: { name: 'dance_program' } }
    /**
     * Find zero or one Dance_program that matches the filter.
     * @param {dance_programFindUniqueArgs} args - Arguments to find a Dance_program
     * @example
     * // Get one Dance_program
     * const dance_program = await prisma.dance_program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends dance_programFindUniqueArgs>(args: SelectSubset<T, dance_programFindUniqueArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dance_program that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {dance_programFindUniqueOrThrowArgs} args - Arguments to find a Dance_program
     * @example
     * // Get one Dance_program
     * const dance_program = await prisma.dance_program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends dance_programFindUniqueOrThrowArgs>(args: SelectSubset<T, dance_programFindUniqueOrThrowArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dance_program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_programFindFirstArgs} args - Arguments to find a Dance_program
     * @example
     * // Get one Dance_program
     * const dance_program = await prisma.dance_program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends dance_programFindFirstArgs>(args?: SelectSubset<T, dance_programFindFirstArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dance_program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_programFindFirstOrThrowArgs} args - Arguments to find a Dance_program
     * @example
     * // Get one Dance_program
     * const dance_program = await prisma.dance_program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends dance_programFindFirstOrThrowArgs>(args?: SelectSubset<T, dance_programFindFirstOrThrowArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dance_programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_programFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dance_programs
     * const dance_programs = await prisma.dance_program.findMany()
     * 
     * // Get first 10 Dance_programs
     * const dance_programs = await prisma.dance_program.findMany({ take: 10 })
     * 
     * // Only select the `dancerId`
     * const dance_programWithDancerIdOnly = await prisma.dance_program.findMany({ select: { dancerId: true } })
     * 
     */
    findMany<T extends dance_programFindManyArgs>(args?: SelectSubset<T, dance_programFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dance_program.
     * @param {dance_programCreateArgs} args - Arguments to create a Dance_program.
     * @example
     * // Create one Dance_program
     * const Dance_program = await prisma.dance_program.create({
     *   data: {
     *     // ... data to create a Dance_program
     *   }
     * })
     * 
     */
    create<T extends dance_programCreateArgs>(args: SelectSubset<T, dance_programCreateArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dance_programs.
     * @param {dance_programCreateManyArgs} args - Arguments to create many Dance_programs.
     * @example
     * // Create many Dance_programs
     * const dance_program = await prisma.dance_program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends dance_programCreateManyArgs>(args?: SelectSubset<T, dance_programCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dance_programs and returns the data saved in the database.
     * @param {dance_programCreateManyAndReturnArgs} args - Arguments to create many Dance_programs.
     * @example
     * // Create many Dance_programs
     * const dance_program = await prisma.dance_program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dance_programs and only return the `dancerId`
     * const dance_programWithDancerIdOnly = await prisma.dance_program.createManyAndReturn({
     *   select: { dancerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends dance_programCreateManyAndReturnArgs>(args?: SelectSubset<T, dance_programCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dance_program.
     * @param {dance_programDeleteArgs} args - Arguments to delete one Dance_program.
     * @example
     * // Delete one Dance_program
     * const Dance_program = await prisma.dance_program.delete({
     *   where: {
     *     // ... filter to delete one Dance_program
     *   }
     * })
     * 
     */
    delete<T extends dance_programDeleteArgs>(args: SelectSubset<T, dance_programDeleteArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dance_program.
     * @param {dance_programUpdateArgs} args - Arguments to update one Dance_program.
     * @example
     * // Update one Dance_program
     * const dance_program = await prisma.dance_program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends dance_programUpdateArgs>(args: SelectSubset<T, dance_programUpdateArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dance_programs.
     * @param {dance_programDeleteManyArgs} args - Arguments to filter Dance_programs to delete.
     * @example
     * // Delete a few Dance_programs
     * const { count } = await prisma.dance_program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends dance_programDeleteManyArgs>(args?: SelectSubset<T, dance_programDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dance_programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_programUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dance_programs
     * const dance_program = await prisma.dance_program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends dance_programUpdateManyArgs>(args: SelectSubset<T, dance_programUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dance_programs and returns the data updated in the database.
     * @param {dance_programUpdateManyAndReturnArgs} args - Arguments to update many Dance_programs.
     * @example
     * // Update many Dance_programs
     * const dance_program = await prisma.dance_program.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dance_programs and only return the `dancerId`
     * const dance_programWithDancerIdOnly = await prisma.dance_program.updateManyAndReturn({
     *   select: { dancerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends dance_programUpdateManyAndReturnArgs>(args: SelectSubset<T, dance_programUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dance_program.
     * @param {dance_programUpsertArgs} args - Arguments to update or create a Dance_program.
     * @example
     * // Update or create a Dance_program
     * const dance_program = await prisma.dance_program.upsert({
     *   create: {
     *     // ... data to create a Dance_program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dance_program we want to update
     *   }
     * })
     */
    upsert<T extends dance_programUpsertArgs>(args: SelectSubset<T, dance_programUpsertArgs<ExtArgs>>): Prisma__dance_programClient<$Result.GetResult<Prisma.$dance_programPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dance_programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_programCountArgs} args - Arguments to filter Dance_programs to count.
     * @example
     * // Count the number of Dance_programs
     * const count = await prisma.dance_program.count({
     *   where: {
     *     // ... the filter for the Dance_programs we want to count
     *   }
     * })
    **/
    count<T extends dance_programCountArgs>(
      args?: Subset<T, dance_programCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Dance_programCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dance_program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dance_programAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Dance_programAggregateArgs>(args: Subset<T, Dance_programAggregateArgs>): Prisma.PrismaPromise<GetDance_programAggregateType<T>>

    /**
     * Group by Dance_program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dance_programGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends dance_programGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: dance_programGroupByArgs['orderBy'] }
        : { orderBy?: dance_programGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, dance_programGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDance_programGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the dance_program model
   */
  readonly fields: dance_programFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for dance_program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__dance_programClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dancer<T extends dancerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, dancerDefaultArgs<ExtArgs>>): Prisma__dancerClient<$Result.GetResult<Prisma.$dancerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    program<T extends programDefaultArgs<ExtArgs> = {}>(args?: Subset<T, programDefaultArgs<ExtArgs>>): Prisma__programClient<$Result.GetResult<Prisma.$programPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the dance_program model
   */
  interface dance_programFieldRefs {
    readonly dancerId: FieldRef<"dance_program", 'Int'>
    readonly programId: FieldRef<"dance_program", 'Int'>
    readonly type: FieldRef<"dance_program", 'String'>
    readonly proficency: FieldRef<"dance_program", 'String'>
  }
    

  // Custom InputTypes
  /**
   * dance_program findUnique
   */
  export type dance_programFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * Filter, which dance_program to fetch.
     */
    where: dance_programWhereUniqueInput
  }

  /**
   * dance_program findUniqueOrThrow
   */
  export type dance_programFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * Filter, which dance_program to fetch.
     */
    where: dance_programWhereUniqueInput
  }

  /**
   * dance_program findFirst
   */
  export type dance_programFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * Filter, which dance_program to fetch.
     */
    where?: dance_programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_programs to fetch.
     */
    orderBy?: dance_programOrderByWithRelationInput | dance_programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dance_programs.
     */
    cursor?: dance_programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dance_programs.
     */
    distinct?: Dance_programScalarFieldEnum | Dance_programScalarFieldEnum[]
  }

  /**
   * dance_program findFirstOrThrow
   */
  export type dance_programFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * Filter, which dance_program to fetch.
     */
    where?: dance_programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_programs to fetch.
     */
    orderBy?: dance_programOrderByWithRelationInput | dance_programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dance_programs.
     */
    cursor?: dance_programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dance_programs.
     */
    distinct?: Dance_programScalarFieldEnum | Dance_programScalarFieldEnum[]
  }

  /**
   * dance_program findMany
   */
  export type dance_programFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * Filter, which dance_programs to fetch.
     */
    where?: dance_programWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dance_programs to fetch.
     */
    orderBy?: dance_programOrderByWithRelationInput | dance_programOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dance_programs.
     */
    cursor?: dance_programWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dance_programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dance_programs.
     */
    skip?: number
    distinct?: Dance_programScalarFieldEnum | Dance_programScalarFieldEnum[]
  }

  /**
   * dance_program create
   */
  export type dance_programCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * The data needed to create a dance_program.
     */
    data: XOR<dance_programCreateInput, dance_programUncheckedCreateInput>
  }

  /**
   * dance_program createMany
   */
  export type dance_programCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many dance_programs.
     */
    data: dance_programCreateManyInput | dance_programCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * dance_program createManyAndReturn
   */
  export type dance_programCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * The data used to create many dance_programs.
     */
    data: dance_programCreateManyInput | dance_programCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * dance_program update
   */
  export type dance_programUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * The data needed to update a dance_program.
     */
    data: XOR<dance_programUpdateInput, dance_programUncheckedUpdateInput>
    /**
     * Choose, which dance_program to update.
     */
    where: dance_programWhereUniqueInput
  }

  /**
   * dance_program updateMany
   */
  export type dance_programUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update dance_programs.
     */
    data: XOR<dance_programUpdateManyMutationInput, dance_programUncheckedUpdateManyInput>
    /**
     * Filter which dance_programs to update
     */
    where?: dance_programWhereInput
    /**
     * Limit how many dance_programs to update.
     */
    limit?: number
  }

  /**
   * dance_program updateManyAndReturn
   */
  export type dance_programUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * The data used to update dance_programs.
     */
    data: XOR<dance_programUpdateManyMutationInput, dance_programUncheckedUpdateManyInput>
    /**
     * Filter which dance_programs to update
     */
    where?: dance_programWhereInput
    /**
     * Limit how many dance_programs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * dance_program upsert
   */
  export type dance_programUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * The filter to search for the dance_program to update in case it exists.
     */
    where: dance_programWhereUniqueInput
    /**
     * In case the dance_program found by the `where` argument doesn't exist, create a new dance_program with this data.
     */
    create: XOR<dance_programCreateInput, dance_programUncheckedCreateInput>
    /**
     * In case the dance_program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<dance_programUpdateInput, dance_programUncheckedUpdateInput>
  }

  /**
   * dance_program delete
   */
  export type dance_programDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
    /**
     * Filter which dance_program to delete.
     */
    where: dance_programWhereUniqueInput
  }

  /**
   * dance_program deleteMany
   */
  export type dance_programDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which dance_programs to delete
     */
    where?: dance_programWhereInput
    /**
     * Limit how many dance_programs to delete.
     */
    limit?: number
  }

  /**
   * dance_program without action
   */
  export type dance_programDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_program
     */
    select?: dance_programSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_program
     */
    omit?: dance_programOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_programInclude<ExtArgs> | null
  }


  /**
   * Model group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    countryCode: string | null
    state: string | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    countryCode: string | null
    state: string | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    type: number
    countryCode: number
    state: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    countryCode?: true
    state?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    countryCode?: true
    state?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    countryCode?: true
    state?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which group to aggregate.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type groupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: groupWhereInput
    orderBy?: groupOrderByWithAggregationInput | groupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: groupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    name: string
    type: string
    countryCode: string
    state: string
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends groupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type groupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    countryCode?: boolean
    state?: boolean
    countryState?: boolean | stateDefaultArgs<ExtArgs>
    dancers?: boolean | group$dancersArgs<ExtArgs>
    parent?: boolean | group$parentArgs<ExtArgs>
    child?: boolean | group$childArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type groupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    countryCode?: boolean
    state?: boolean
    countryState?: boolean | stateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type groupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    countryCode?: boolean
    state?: boolean
    countryState?: boolean | stateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type groupSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    countryCode?: boolean
    state?: boolean
  }

  export type groupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "countryCode" | "state", ExtArgs["result"]["group"]>
  export type groupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    countryState?: boolean | stateDefaultArgs<ExtArgs>
    dancers?: boolean | group$dancersArgs<ExtArgs>
    parent?: boolean | group$parentArgs<ExtArgs>
    child?: boolean | group$childArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type groupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    countryState?: boolean | stateDefaultArgs<ExtArgs>
  }
  export type groupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    countryState?: boolean | stateDefaultArgs<ExtArgs>
  }

  export type $groupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "group"
    objects: {
      countryState: Prisma.$statePayload<ExtArgs>
      dancers: Prisma.$dance_groupPayload<ExtArgs>[]
      parent: Prisma.$group_assocationsPayload<ExtArgs>[]
      child: Prisma.$group_assocationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      countryCode: string
      state: string
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type groupGetPayload<S extends boolean | null | undefined | groupDefaultArgs> = $Result.GetResult<Prisma.$groupPayload, S>

  type groupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<groupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface groupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['group'], meta: { name: 'group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {groupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends groupFindUniqueArgs>(args: SelectSubset<T, groupFindUniqueArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {groupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends groupFindUniqueOrThrowArgs>(args: SelectSubset<T, groupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends groupFindFirstArgs>(args?: SelectSubset<T, groupFindFirstArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends groupFindFirstOrThrowArgs>(args?: SelectSubset<T, groupFindFirstOrThrowArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends groupFindManyArgs>(args?: SelectSubset<T, groupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {groupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends groupCreateArgs>(args: SelectSubset<T, groupCreateArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {groupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends groupCreateManyArgs>(args?: SelectSubset<T, groupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {groupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends groupCreateManyAndReturnArgs>(args?: SelectSubset<T, groupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {groupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends groupDeleteArgs>(args: SelectSubset<T, groupDeleteArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {groupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends groupUpdateArgs>(args: SelectSubset<T, groupUpdateArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {groupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends groupDeleteManyArgs>(args?: SelectSubset<T, groupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends groupUpdateManyArgs>(args: SelectSubset<T, groupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {groupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupWithIdOnly = await prisma.group.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends groupUpdateManyAndReturnArgs>(args: SelectSubset<T, groupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {groupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends groupUpsertArgs>(args: SelectSubset<T, groupUpsertArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends groupCountArgs>(
      args?: Subset<T, groupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {groupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends groupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: groupGroupByArgs['orderBy'] }
        : { orderBy?: groupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, groupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the group model
   */
  readonly fields: groupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__groupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    countryState<T extends stateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, stateDefaultArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dancers<T extends group$dancersArgs<ExtArgs> = {}>(args?: Subset<T, group$dancersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$dance_groupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parent<T extends group$parentArgs<ExtArgs> = {}>(args?: Subset<T, group$parentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    child<T extends group$childArgs<ExtArgs> = {}>(args?: Subset<T, group$childArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the group model
   */
  interface groupFieldRefs {
    readonly id: FieldRef<"group", 'String'>
    readonly name: FieldRef<"group", 'String'>
    readonly type: FieldRef<"group", 'String'>
    readonly countryCode: FieldRef<"group", 'String'>
    readonly state: FieldRef<"group", 'String'>
  }
    

  // Custom InputTypes
  /**
   * group findUnique
   */
  export type groupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where: groupWhereUniqueInput
  }

  /**
   * group findUniqueOrThrow
   */
  export type groupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where: groupWhereUniqueInput
  }

  /**
   * group findFirst
   */
  export type groupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for groups.
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * group findFirstOrThrow
   */
  export type groupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * Filter, which group to fetch.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for groups.
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * group findMany
   */
  export type groupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * Filter, which groups to fetch.
     */
    where?: groupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of groups to fetch.
     */
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing groups.
     */
    cursor?: groupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * group create
   */
  export type groupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * The data needed to create a group.
     */
    data: XOR<groupCreateInput, groupUncheckedCreateInput>
  }

  /**
   * group createMany
   */
  export type groupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many groups.
     */
    data: groupCreateManyInput | groupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * group createManyAndReturn
   */
  export type groupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * The data used to create many groups.
     */
    data: groupCreateManyInput | groupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * group update
   */
  export type groupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * The data needed to update a group.
     */
    data: XOR<groupUpdateInput, groupUncheckedUpdateInput>
    /**
     * Choose, which group to update.
     */
    where: groupWhereUniqueInput
  }

  /**
   * group updateMany
   */
  export type groupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update groups.
     */
    data: XOR<groupUpdateManyMutationInput, groupUncheckedUpdateManyInput>
    /**
     * Filter which groups to update
     */
    where?: groupWhereInput
    /**
     * Limit how many groups to update.
     */
    limit?: number
  }

  /**
   * group updateManyAndReturn
   */
  export type groupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * The data used to update groups.
     */
    data: XOR<groupUpdateManyMutationInput, groupUncheckedUpdateManyInput>
    /**
     * Filter which groups to update
     */
    where?: groupWhereInput
    /**
     * Limit how many groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * group upsert
   */
  export type groupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * The filter to search for the group to update in case it exists.
     */
    where: groupWhereUniqueInput
    /**
     * In case the group found by the `where` argument doesn't exist, create a new group with this data.
     */
    create: XOR<groupCreateInput, groupUncheckedCreateInput>
    /**
     * In case the group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<groupUpdateInput, groupUncheckedUpdateInput>
  }

  /**
   * group delete
   */
  export type groupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    /**
     * Filter which group to delete.
     */
    where: groupWhereUniqueInput
  }

  /**
   * group deleteMany
   */
  export type groupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which groups to delete
     */
    where?: groupWhereInput
    /**
     * Limit how many groups to delete.
     */
    limit?: number
  }

  /**
   * group.dancers
   */
  export type group$dancersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the dance_group
     */
    select?: dance_groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the dance_group
     */
    omit?: dance_groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: dance_groupInclude<ExtArgs> | null
    where?: dance_groupWhereInput
    orderBy?: dance_groupOrderByWithRelationInput | dance_groupOrderByWithRelationInput[]
    cursor?: dance_groupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Dance_groupScalarFieldEnum | Dance_groupScalarFieldEnum[]
  }

  /**
   * group.parent
   */
  export type group$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    where?: group_assocationsWhereInput
    orderBy?: group_assocationsOrderByWithRelationInput | group_assocationsOrderByWithRelationInput[]
    cursor?: group_assocationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Group_assocationsScalarFieldEnum | Group_assocationsScalarFieldEnum[]
  }

  /**
   * group.child
   */
  export type group$childArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    where?: group_assocationsWhereInput
    orderBy?: group_assocationsOrderByWithRelationInput | group_assocationsOrderByWithRelationInput[]
    cursor?: group_assocationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Group_assocationsScalarFieldEnum | Group_assocationsScalarFieldEnum[]
  }

  /**
   * group without action
   */
  export type groupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
  }


  /**
   * Model group_assocations
   */

  export type AggregateGroup_assocations = {
    _count: Group_assocationsCountAggregateOutputType | null
    _min: Group_assocationsMinAggregateOutputType | null
    _max: Group_assocationsMaxAggregateOutputType | null
  }

  export type Group_assocationsMinAggregateOutputType = {
    groupId: string | null
    parentId: string | null
  }

  export type Group_assocationsMaxAggregateOutputType = {
    groupId: string | null
    parentId: string | null
  }

  export type Group_assocationsCountAggregateOutputType = {
    groupId: number
    parentId: number
    _all: number
  }


  export type Group_assocationsMinAggregateInputType = {
    groupId?: true
    parentId?: true
  }

  export type Group_assocationsMaxAggregateInputType = {
    groupId?: true
    parentId?: true
  }

  export type Group_assocationsCountAggregateInputType = {
    groupId?: true
    parentId?: true
    _all?: true
  }

  export type Group_assocationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which group_assocations to aggregate.
     */
    where?: group_assocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of group_assocations to fetch.
     */
    orderBy?: group_assocationsOrderByWithRelationInput | group_assocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: group_assocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` group_assocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` group_assocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned group_assocations
    **/
    _count?: true | Group_assocationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Group_assocationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Group_assocationsMaxAggregateInputType
  }

  export type GetGroup_assocationsAggregateType<T extends Group_assocationsAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup_assocations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup_assocations[P]>
      : GetScalarType<T[P], AggregateGroup_assocations[P]>
  }




  export type group_assocationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: group_assocationsWhereInput
    orderBy?: group_assocationsOrderByWithAggregationInput | group_assocationsOrderByWithAggregationInput[]
    by: Group_assocationsScalarFieldEnum[] | Group_assocationsScalarFieldEnum
    having?: group_assocationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Group_assocationsCountAggregateInputType | true
    _min?: Group_assocationsMinAggregateInputType
    _max?: Group_assocationsMaxAggregateInputType
  }

  export type Group_assocationsGroupByOutputType = {
    groupId: string
    parentId: string
    _count: Group_assocationsCountAggregateOutputType | null
    _min: Group_assocationsMinAggregateOutputType | null
    _max: Group_assocationsMaxAggregateOutputType | null
  }

  type GetGroup_assocationsGroupByPayload<T extends group_assocationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Group_assocationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Group_assocationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Group_assocationsGroupByOutputType[P]>
            : GetScalarType<T[P], Group_assocationsGroupByOutputType[P]>
        }
      >
    >


  export type group_assocationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    parentId?: boolean
    group?: boolean | groupDefaultArgs<ExtArgs>
    parent?: boolean | groupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group_assocations"]>

  export type group_assocationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    parentId?: boolean
    group?: boolean | groupDefaultArgs<ExtArgs>
    parent?: boolean | groupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group_assocations"]>

  export type group_assocationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    parentId?: boolean
    group?: boolean | groupDefaultArgs<ExtArgs>
    parent?: boolean | groupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group_assocations"]>

  export type group_assocationsSelectScalar = {
    groupId?: boolean
    parentId?: boolean
  }

  export type group_assocationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"groupId" | "parentId", ExtArgs["result"]["group_assocations"]>
  export type group_assocationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | groupDefaultArgs<ExtArgs>
    parent?: boolean | groupDefaultArgs<ExtArgs>
  }
  export type group_assocationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | groupDefaultArgs<ExtArgs>
    parent?: boolean | groupDefaultArgs<ExtArgs>
  }
  export type group_assocationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | groupDefaultArgs<ExtArgs>
    parent?: boolean | groupDefaultArgs<ExtArgs>
  }

  export type $group_assocationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "group_assocations"
    objects: {
      group: Prisma.$groupPayload<ExtArgs>
      parent: Prisma.$groupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      groupId: string
      parentId: string
    }, ExtArgs["result"]["group_assocations"]>
    composites: {}
  }

  type group_assocationsGetPayload<S extends boolean | null | undefined | group_assocationsDefaultArgs> = $Result.GetResult<Prisma.$group_assocationsPayload, S>

  type group_assocationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<group_assocationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Group_assocationsCountAggregateInputType | true
    }

  export interface group_assocationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['group_assocations'], meta: { name: 'group_assocations' } }
    /**
     * Find zero or one Group_assocations that matches the filter.
     * @param {group_assocationsFindUniqueArgs} args - Arguments to find a Group_assocations
     * @example
     * // Get one Group_assocations
     * const group_assocations = await prisma.group_assocations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends group_assocationsFindUniqueArgs>(args: SelectSubset<T, group_assocationsFindUniqueArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group_assocations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {group_assocationsFindUniqueOrThrowArgs} args - Arguments to find a Group_assocations
     * @example
     * // Get one Group_assocations
     * const group_assocations = await prisma.group_assocations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends group_assocationsFindUniqueOrThrowArgs>(args: SelectSubset<T, group_assocationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group_assocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {group_assocationsFindFirstArgs} args - Arguments to find a Group_assocations
     * @example
     * // Get one Group_assocations
     * const group_assocations = await prisma.group_assocations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends group_assocationsFindFirstArgs>(args?: SelectSubset<T, group_assocationsFindFirstArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group_assocations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {group_assocationsFindFirstOrThrowArgs} args - Arguments to find a Group_assocations
     * @example
     * // Get one Group_assocations
     * const group_assocations = await prisma.group_assocations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends group_assocationsFindFirstOrThrowArgs>(args?: SelectSubset<T, group_assocationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Group_assocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {group_assocationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Group_assocations
     * const group_assocations = await prisma.group_assocations.findMany()
     * 
     * // Get first 10 Group_assocations
     * const group_assocations = await prisma.group_assocations.findMany({ take: 10 })
     * 
     * // Only select the `groupId`
     * const group_assocationsWithGroupIdOnly = await prisma.group_assocations.findMany({ select: { groupId: true } })
     * 
     */
    findMany<T extends group_assocationsFindManyArgs>(args?: SelectSubset<T, group_assocationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group_assocations.
     * @param {group_assocationsCreateArgs} args - Arguments to create a Group_assocations.
     * @example
     * // Create one Group_assocations
     * const Group_assocations = await prisma.group_assocations.create({
     *   data: {
     *     // ... data to create a Group_assocations
     *   }
     * })
     * 
     */
    create<T extends group_assocationsCreateArgs>(args: SelectSubset<T, group_assocationsCreateArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Group_assocations.
     * @param {group_assocationsCreateManyArgs} args - Arguments to create many Group_assocations.
     * @example
     * // Create many Group_assocations
     * const group_assocations = await prisma.group_assocations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends group_assocationsCreateManyArgs>(args?: SelectSubset<T, group_assocationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Group_assocations and returns the data saved in the database.
     * @param {group_assocationsCreateManyAndReturnArgs} args - Arguments to create many Group_assocations.
     * @example
     * // Create many Group_assocations
     * const group_assocations = await prisma.group_assocations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Group_assocations and only return the `groupId`
     * const group_assocationsWithGroupIdOnly = await prisma.group_assocations.createManyAndReturn({
     *   select: { groupId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends group_assocationsCreateManyAndReturnArgs>(args?: SelectSubset<T, group_assocationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group_assocations.
     * @param {group_assocationsDeleteArgs} args - Arguments to delete one Group_assocations.
     * @example
     * // Delete one Group_assocations
     * const Group_assocations = await prisma.group_assocations.delete({
     *   where: {
     *     // ... filter to delete one Group_assocations
     *   }
     * })
     * 
     */
    delete<T extends group_assocationsDeleteArgs>(args: SelectSubset<T, group_assocationsDeleteArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group_assocations.
     * @param {group_assocationsUpdateArgs} args - Arguments to update one Group_assocations.
     * @example
     * // Update one Group_assocations
     * const group_assocations = await prisma.group_assocations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends group_assocationsUpdateArgs>(args: SelectSubset<T, group_assocationsUpdateArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Group_assocations.
     * @param {group_assocationsDeleteManyArgs} args - Arguments to filter Group_assocations to delete.
     * @example
     * // Delete a few Group_assocations
     * const { count } = await prisma.group_assocations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends group_assocationsDeleteManyArgs>(args?: SelectSubset<T, group_assocationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Group_assocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {group_assocationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Group_assocations
     * const group_assocations = await prisma.group_assocations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends group_assocationsUpdateManyArgs>(args: SelectSubset<T, group_assocationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Group_assocations and returns the data updated in the database.
     * @param {group_assocationsUpdateManyAndReturnArgs} args - Arguments to update many Group_assocations.
     * @example
     * // Update many Group_assocations
     * const group_assocations = await prisma.group_assocations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Group_assocations and only return the `groupId`
     * const group_assocationsWithGroupIdOnly = await prisma.group_assocations.updateManyAndReturn({
     *   select: { groupId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends group_assocationsUpdateManyAndReturnArgs>(args: SelectSubset<T, group_assocationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group_assocations.
     * @param {group_assocationsUpsertArgs} args - Arguments to update or create a Group_assocations.
     * @example
     * // Update or create a Group_assocations
     * const group_assocations = await prisma.group_assocations.upsert({
     *   create: {
     *     // ... data to create a Group_assocations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group_assocations we want to update
     *   }
     * })
     */
    upsert<T extends group_assocationsUpsertArgs>(args: SelectSubset<T, group_assocationsUpsertArgs<ExtArgs>>): Prisma__group_assocationsClient<$Result.GetResult<Prisma.$group_assocationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Group_assocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {group_assocationsCountArgs} args - Arguments to filter Group_assocations to count.
     * @example
     * // Count the number of Group_assocations
     * const count = await prisma.group_assocations.count({
     *   where: {
     *     // ... the filter for the Group_assocations we want to count
     *   }
     * })
    **/
    count<T extends group_assocationsCountArgs>(
      args?: Subset<T, group_assocationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Group_assocationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group_assocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Group_assocationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Group_assocationsAggregateArgs>(args: Subset<T, Group_assocationsAggregateArgs>): Prisma.PrismaPromise<GetGroup_assocationsAggregateType<T>>

    /**
     * Group by Group_assocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {group_assocationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends group_assocationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: group_assocationsGroupByArgs['orderBy'] }
        : { orderBy?: group_assocationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, group_assocationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroup_assocationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the group_assocations model
   */
  readonly fields: group_assocationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for group_assocations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__group_assocationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends groupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, groupDefaultArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends groupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, groupDefaultArgs<ExtArgs>>): Prisma__groupClient<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the group_assocations model
   */
  interface group_assocationsFieldRefs {
    readonly groupId: FieldRef<"group_assocations", 'String'>
    readonly parentId: FieldRef<"group_assocations", 'String'>
  }
    

  // Custom InputTypes
  /**
   * group_assocations findUnique
   */
  export type group_assocationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * Filter, which group_assocations to fetch.
     */
    where: group_assocationsWhereUniqueInput
  }

  /**
   * group_assocations findUniqueOrThrow
   */
  export type group_assocationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * Filter, which group_assocations to fetch.
     */
    where: group_assocationsWhereUniqueInput
  }

  /**
   * group_assocations findFirst
   */
  export type group_assocationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * Filter, which group_assocations to fetch.
     */
    where?: group_assocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of group_assocations to fetch.
     */
    orderBy?: group_assocationsOrderByWithRelationInput | group_assocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for group_assocations.
     */
    cursor?: group_assocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` group_assocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` group_assocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of group_assocations.
     */
    distinct?: Group_assocationsScalarFieldEnum | Group_assocationsScalarFieldEnum[]
  }

  /**
   * group_assocations findFirstOrThrow
   */
  export type group_assocationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * Filter, which group_assocations to fetch.
     */
    where?: group_assocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of group_assocations to fetch.
     */
    orderBy?: group_assocationsOrderByWithRelationInput | group_assocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for group_assocations.
     */
    cursor?: group_assocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` group_assocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` group_assocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of group_assocations.
     */
    distinct?: Group_assocationsScalarFieldEnum | Group_assocationsScalarFieldEnum[]
  }

  /**
   * group_assocations findMany
   */
  export type group_assocationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * Filter, which group_assocations to fetch.
     */
    where?: group_assocationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of group_assocations to fetch.
     */
    orderBy?: group_assocationsOrderByWithRelationInput | group_assocationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing group_assocations.
     */
    cursor?: group_assocationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` group_assocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` group_assocations.
     */
    skip?: number
    distinct?: Group_assocationsScalarFieldEnum | Group_assocationsScalarFieldEnum[]
  }

  /**
   * group_assocations create
   */
  export type group_assocationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * The data needed to create a group_assocations.
     */
    data: XOR<group_assocationsCreateInput, group_assocationsUncheckedCreateInput>
  }

  /**
   * group_assocations createMany
   */
  export type group_assocationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many group_assocations.
     */
    data: group_assocationsCreateManyInput | group_assocationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * group_assocations createManyAndReturn
   */
  export type group_assocationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * The data used to create many group_assocations.
     */
    data: group_assocationsCreateManyInput | group_assocationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * group_assocations update
   */
  export type group_assocationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * The data needed to update a group_assocations.
     */
    data: XOR<group_assocationsUpdateInput, group_assocationsUncheckedUpdateInput>
    /**
     * Choose, which group_assocations to update.
     */
    where: group_assocationsWhereUniqueInput
  }

  /**
   * group_assocations updateMany
   */
  export type group_assocationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update group_assocations.
     */
    data: XOR<group_assocationsUpdateManyMutationInput, group_assocationsUncheckedUpdateManyInput>
    /**
     * Filter which group_assocations to update
     */
    where?: group_assocationsWhereInput
    /**
     * Limit how many group_assocations to update.
     */
    limit?: number
  }

  /**
   * group_assocations updateManyAndReturn
   */
  export type group_assocationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * The data used to update group_assocations.
     */
    data: XOR<group_assocationsUpdateManyMutationInput, group_assocationsUncheckedUpdateManyInput>
    /**
     * Filter which group_assocations to update
     */
    where?: group_assocationsWhereInput
    /**
     * Limit how many group_assocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * group_assocations upsert
   */
  export type group_assocationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * The filter to search for the group_assocations to update in case it exists.
     */
    where: group_assocationsWhereUniqueInput
    /**
     * In case the group_assocations found by the `where` argument doesn't exist, create a new group_assocations with this data.
     */
    create: XOR<group_assocationsCreateInput, group_assocationsUncheckedCreateInput>
    /**
     * In case the group_assocations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<group_assocationsUpdateInput, group_assocationsUncheckedUpdateInput>
  }

  /**
   * group_assocations delete
   */
  export type group_assocationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
    /**
     * Filter which group_assocations to delete.
     */
    where: group_assocationsWhereUniqueInput
  }

  /**
   * group_assocations deleteMany
   */
  export type group_assocationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which group_assocations to delete
     */
    where?: group_assocationsWhereInput
    /**
     * Limit how many group_assocations to delete.
     */
    limit?: number
  }

  /**
   * group_assocations without action
   */
  export type group_assocationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group_assocations
     */
    select?: group_assocationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group_assocations
     */
    omit?: group_assocationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: group_assocationsInclude<ExtArgs> | null
  }


  /**
   * Model state
   */

  export type AggregateState = {
    _count: StateCountAggregateOutputType | null
    _min: StateMinAggregateOutputType | null
    _max: StateMaxAggregateOutputType | null
  }

  export type StateMinAggregateOutputType = {
    countryCode: string | null
    state: string | null
    name: string | null
  }

  export type StateMaxAggregateOutputType = {
    countryCode: string | null
    state: string | null
    name: string | null
  }

  export type StateCountAggregateOutputType = {
    countryCode: number
    state: number
    name: number
    _all: number
  }


  export type StateMinAggregateInputType = {
    countryCode?: true
    state?: true
    name?: true
  }

  export type StateMaxAggregateInputType = {
    countryCode?: true
    state?: true
    name?: true
  }

  export type StateCountAggregateInputType = {
    countryCode?: true
    state?: true
    name?: true
    _all?: true
  }

  export type StateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which state to aggregate.
     */
    where?: stateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of states to fetch.
     */
    orderBy?: stateOrderByWithRelationInput | stateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: stateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` states from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` states.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned states
    **/
    _count?: true | StateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StateMaxAggregateInputType
  }

  export type GetStateAggregateType<T extends StateAggregateArgs> = {
        [P in keyof T & keyof AggregateState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateState[P]>
      : GetScalarType<T[P], AggregateState[P]>
  }




  export type stateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: stateWhereInput
    orderBy?: stateOrderByWithAggregationInput | stateOrderByWithAggregationInput[]
    by: StateScalarFieldEnum[] | StateScalarFieldEnum
    having?: stateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StateCountAggregateInputType | true
    _min?: StateMinAggregateInputType
    _max?: StateMaxAggregateInputType
  }

  export type StateGroupByOutputType = {
    countryCode: string
    state: string
    name: string | null
    _count: StateCountAggregateOutputType | null
    _min: StateMinAggregateOutputType | null
    _max: StateMaxAggregateOutputType | null
  }

  type GetStateGroupByPayload<T extends stateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StateGroupByOutputType[P]>
            : GetScalarType<T[P], StateGroupByOutputType[P]>
        }
      >
    >


  export type stateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    countryCode?: boolean
    state?: boolean
    name?: boolean
    country?: boolean | countryDefaultArgs<ExtArgs>
    groups?: boolean | state$groupsArgs<ExtArgs>
    _count?: boolean | StateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["state"]>

  export type stateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    countryCode?: boolean
    state?: boolean
    name?: boolean
    country?: boolean | countryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["state"]>

  export type stateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    countryCode?: boolean
    state?: boolean
    name?: boolean
    country?: boolean | countryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["state"]>

  export type stateSelectScalar = {
    countryCode?: boolean
    state?: boolean
    name?: boolean
  }

  export type stateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"countryCode" | "state" | "name", ExtArgs["result"]["state"]>
  export type stateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | countryDefaultArgs<ExtArgs>
    groups?: boolean | state$groupsArgs<ExtArgs>
    _count?: boolean | StateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type stateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | countryDefaultArgs<ExtArgs>
  }
  export type stateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | countryDefaultArgs<ExtArgs>
  }

  export type $statePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "state"
    objects: {
      country: Prisma.$countryPayload<ExtArgs>
      groups: Prisma.$groupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      countryCode: string
      state: string
      name: string | null
    }, ExtArgs["result"]["state"]>
    composites: {}
  }

  type stateGetPayload<S extends boolean | null | undefined | stateDefaultArgs> = $Result.GetResult<Prisma.$statePayload, S>

  type stateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<stateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StateCountAggregateInputType | true
    }

  export interface stateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['state'], meta: { name: 'state' } }
    /**
     * Find zero or one State that matches the filter.
     * @param {stateFindUniqueArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends stateFindUniqueArgs>(args: SelectSubset<T, stateFindUniqueArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one State that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {stateFindUniqueOrThrowArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends stateFindUniqueOrThrowArgs>(args: SelectSubset<T, stateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first State that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateFindFirstArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends stateFindFirstArgs>(args?: SelectSubset<T, stateFindFirstArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first State that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateFindFirstOrThrowArgs} args - Arguments to find a State
     * @example
     * // Get one State
     * const state = await prisma.state.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends stateFindFirstOrThrowArgs>(args?: SelectSubset<T, stateFindFirstOrThrowArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more States that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all States
     * const states = await prisma.state.findMany()
     * 
     * // Get first 10 States
     * const states = await prisma.state.findMany({ take: 10 })
     * 
     * // Only select the `countryCode`
     * const stateWithCountryCodeOnly = await prisma.state.findMany({ select: { countryCode: true } })
     * 
     */
    findMany<T extends stateFindManyArgs>(args?: SelectSubset<T, stateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a State.
     * @param {stateCreateArgs} args - Arguments to create a State.
     * @example
     * // Create one State
     * const State = await prisma.state.create({
     *   data: {
     *     // ... data to create a State
     *   }
     * })
     * 
     */
    create<T extends stateCreateArgs>(args: SelectSubset<T, stateCreateArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many States.
     * @param {stateCreateManyArgs} args - Arguments to create many States.
     * @example
     * // Create many States
     * const state = await prisma.state.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends stateCreateManyArgs>(args?: SelectSubset<T, stateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many States and returns the data saved in the database.
     * @param {stateCreateManyAndReturnArgs} args - Arguments to create many States.
     * @example
     * // Create many States
     * const state = await prisma.state.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many States and only return the `countryCode`
     * const stateWithCountryCodeOnly = await prisma.state.createManyAndReturn({
     *   select: { countryCode: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends stateCreateManyAndReturnArgs>(args?: SelectSubset<T, stateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a State.
     * @param {stateDeleteArgs} args - Arguments to delete one State.
     * @example
     * // Delete one State
     * const State = await prisma.state.delete({
     *   where: {
     *     // ... filter to delete one State
     *   }
     * })
     * 
     */
    delete<T extends stateDeleteArgs>(args: SelectSubset<T, stateDeleteArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one State.
     * @param {stateUpdateArgs} args - Arguments to update one State.
     * @example
     * // Update one State
     * const state = await prisma.state.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends stateUpdateArgs>(args: SelectSubset<T, stateUpdateArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more States.
     * @param {stateDeleteManyArgs} args - Arguments to filter States to delete.
     * @example
     * // Delete a few States
     * const { count } = await prisma.state.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends stateDeleteManyArgs>(args?: SelectSubset<T, stateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many States
     * const state = await prisma.state.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends stateUpdateManyArgs>(args: SelectSubset<T, stateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more States and returns the data updated in the database.
     * @param {stateUpdateManyAndReturnArgs} args - Arguments to update many States.
     * @example
     * // Update many States
     * const state = await prisma.state.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more States and only return the `countryCode`
     * const stateWithCountryCodeOnly = await prisma.state.updateManyAndReturn({
     *   select: { countryCode: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends stateUpdateManyAndReturnArgs>(args: SelectSubset<T, stateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one State.
     * @param {stateUpsertArgs} args - Arguments to update or create a State.
     * @example
     * // Update or create a State
     * const state = await prisma.state.upsert({
     *   create: {
     *     // ... data to create a State
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the State we want to update
     *   }
     * })
     */
    upsert<T extends stateUpsertArgs>(args: SelectSubset<T, stateUpsertArgs<ExtArgs>>): Prisma__stateClient<$Result.GetResult<Prisma.$statePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateCountArgs} args - Arguments to filter States to count.
     * @example
     * // Count the number of States
     * const count = await prisma.state.count({
     *   where: {
     *     // ... the filter for the States we want to count
     *   }
     * })
    **/
    count<T extends stateCountArgs>(
      args?: Subset<T, stateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StateAggregateArgs>(args: Subset<T, StateAggregateArgs>): Prisma.PrismaPromise<GetStateAggregateType<T>>

    /**
     * Group by State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {stateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends stateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: stateGroupByArgs['orderBy'] }
        : { orderBy?: stateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, stateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the state model
   */
  readonly fields: stateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for state.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__stateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    country<T extends countryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, countryDefaultArgs<ExtArgs>>): Prisma__countryClient<$Result.GetResult<Prisma.$countryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groups<T extends state$groupsArgs<ExtArgs> = {}>(args?: Subset<T, state$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$groupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the state model
   */
  interface stateFieldRefs {
    readonly countryCode: FieldRef<"state", 'String'>
    readonly state: FieldRef<"state", 'String'>
    readonly name: FieldRef<"state", 'String'>
  }
    

  // Custom InputTypes
  /**
   * state findUnique
   */
  export type stateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * Filter, which state to fetch.
     */
    where: stateWhereUniqueInput
  }

  /**
   * state findUniqueOrThrow
   */
  export type stateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * Filter, which state to fetch.
     */
    where: stateWhereUniqueInput
  }

  /**
   * state findFirst
   */
  export type stateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * Filter, which state to fetch.
     */
    where?: stateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of states to fetch.
     */
    orderBy?: stateOrderByWithRelationInput | stateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for states.
     */
    cursor?: stateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` states from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` states.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of states.
     */
    distinct?: StateScalarFieldEnum | StateScalarFieldEnum[]
  }

  /**
   * state findFirstOrThrow
   */
  export type stateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * Filter, which state to fetch.
     */
    where?: stateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of states to fetch.
     */
    orderBy?: stateOrderByWithRelationInput | stateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for states.
     */
    cursor?: stateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` states from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` states.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of states.
     */
    distinct?: StateScalarFieldEnum | StateScalarFieldEnum[]
  }

  /**
   * state findMany
   */
  export type stateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * Filter, which states to fetch.
     */
    where?: stateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of states to fetch.
     */
    orderBy?: stateOrderByWithRelationInput | stateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing states.
     */
    cursor?: stateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` states from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` states.
     */
    skip?: number
    distinct?: StateScalarFieldEnum | StateScalarFieldEnum[]
  }

  /**
   * state create
   */
  export type stateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * The data needed to create a state.
     */
    data: XOR<stateCreateInput, stateUncheckedCreateInput>
  }

  /**
   * state createMany
   */
  export type stateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many states.
     */
    data: stateCreateManyInput | stateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * state createManyAndReturn
   */
  export type stateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * The data used to create many states.
     */
    data: stateCreateManyInput | stateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * state update
   */
  export type stateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * The data needed to update a state.
     */
    data: XOR<stateUpdateInput, stateUncheckedUpdateInput>
    /**
     * Choose, which state to update.
     */
    where: stateWhereUniqueInput
  }

  /**
   * state updateMany
   */
  export type stateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update states.
     */
    data: XOR<stateUpdateManyMutationInput, stateUncheckedUpdateManyInput>
    /**
     * Filter which states to update
     */
    where?: stateWhereInput
    /**
     * Limit how many states to update.
     */
    limit?: number
  }

  /**
   * state updateManyAndReturn
   */
  export type stateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * The data used to update states.
     */
    data: XOR<stateUpdateManyMutationInput, stateUncheckedUpdateManyInput>
    /**
     * Filter which states to update
     */
    where?: stateWhereInput
    /**
     * Limit how many states to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * state upsert
   */
  export type stateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * The filter to search for the state to update in case it exists.
     */
    where: stateWhereUniqueInput
    /**
     * In case the state found by the `where` argument doesn't exist, create a new state with this data.
     */
    create: XOR<stateCreateInput, stateUncheckedCreateInput>
    /**
     * In case the state was found with the provided `where` argument, update it with this data.
     */
    update: XOR<stateUpdateInput, stateUncheckedUpdateInput>
  }

  /**
   * state delete
   */
  export type stateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
    /**
     * Filter which state to delete.
     */
    where: stateWhereUniqueInput
  }

  /**
   * state deleteMany
   */
  export type stateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which states to delete
     */
    where?: stateWhereInput
    /**
     * Limit how many states to delete.
     */
    limit?: number
  }

  /**
   * state.groups
   */
  export type state$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the group
     */
    select?: groupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the group
     */
    omit?: groupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: groupInclude<ExtArgs> | null
    where?: groupWhereInput
    orderBy?: groupOrderByWithRelationInput | groupOrderByWithRelationInput[]
    cursor?: groupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * state without action
   */
  export type stateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the state
     */
    select?: stateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the state
     */
    omit?: stateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: stateInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CallScalarFieldEnum: {
    callId: 'callId',
    name: 'name',
    tamSeq: 'tamSeq',
    familyId: 'familyId'
  };

  export type CallScalarFieldEnum = (typeof CallScalarFieldEnum)[keyof typeof CallScalarFieldEnum]


  export const Call_familyScalarFieldEnum: {
    familyId: 'familyId',
    name: 'name'
  };

  export type Call_familyScalarFieldEnum = (typeof Call_familyScalarFieldEnum)[keyof typeof Call_familyScalarFieldEnum]


  export const Call_formationScalarFieldEnum: {
    callId: 'callId',
    startId: 'startId',
    endId: 'endId'
  };

  export type Call_formationScalarFieldEnum = (typeof Call_formationScalarFieldEnum)[keyof typeof Call_formationScalarFieldEnum]


  export const FormationScalarFieldEnum: {
    formId: 'formId',
    name: 'name',
    description: 'description',
    clCode: 'clCode',
    sdCode: 'sdCode'
  };

  export type FormationScalarFieldEnum = (typeof FormationScalarFieldEnum)[keyof typeof FormationScalarFieldEnum]


  export const ProgramScalarFieldEnum: {
    programId: 'programId',
    name: 'name',
    order: 'order'
  };

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const SequenceScalarFieldEnum: {
    seqId: 'seqId',
    name: 'name'
  };

  export type SequenceScalarFieldEnum = (typeof SequenceScalarFieldEnum)[keyof typeof SequenceScalarFieldEnum]


  export const Sequence_callsScalarFieldEnum: {
    seqId: 'seqId',
    callId: 'callId',
    startId: 'startId',
    order: 'order',
    helperText: 'helperText'
  };

  export type Sequence_callsScalarFieldEnum = (typeof Sequence_callsScalarFieldEnum)[keyof typeof Sequence_callsScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    code: 'code',
    name: 'name'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const DancerScalarFieldEnum: {
    dancerId: 'dancerId',
    name: 'name',
    email: 'email'
  };

  export type DancerScalarFieldEnum = (typeof DancerScalarFieldEnum)[keyof typeof DancerScalarFieldEnum]


  export const Dance_groupScalarFieldEnum: {
    dancerId: 'dancerId',
    groupId: 'groupId',
    side: 'side',
    proficency: 'proficency'
  };

  export type Dance_groupScalarFieldEnum = (typeof Dance_groupScalarFieldEnum)[keyof typeof Dance_groupScalarFieldEnum]


  export const Dance_programScalarFieldEnum: {
    dancerId: 'dancerId',
    programId: 'programId',
    type: 'type',
    proficency: 'proficency'
  };

  export type Dance_programScalarFieldEnum = (typeof Dance_programScalarFieldEnum)[keyof typeof Dance_programScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    countryCode: 'countryCode',
    state: 'state'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const Group_assocationsScalarFieldEnum: {
    groupId: 'groupId',
    parentId: 'parentId'
  };

  export type Group_assocationsScalarFieldEnum = (typeof Group_assocationsScalarFieldEnum)[keyof typeof Group_assocationsScalarFieldEnum]


  export const StateScalarFieldEnum: {
    countryCode: 'countryCode',
    state: 'state',
    name: 'name'
  };

  export type StateScalarFieldEnum = (typeof StateScalarFieldEnum)[keyof typeof StateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type callWhereInput = {
    AND?: callWhereInput | callWhereInput[]
    OR?: callWhereInput[]
    NOT?: callWhereInput | callWhereInput[]
    callId?: IntFilter<"call"> | number
    name?: StringFilter<"call"> | string
    tamSeq?: StringNullableFilter<"call"> | string | null
    familyId?: IntNullableFilter<"call"> | number | null
    callFamily?: XOR<Call_familyNullableScalarRelationFilter, call_familyWhereInput> | null
    formations?: Call_formationListRelationFilter
    sequences?: Sequence_callsListRelationFilter
  }

  export type callOrderByWithRelationInput = {
    callId?: SortOrder
    name?: SortOrder
    tamSeq?: SortOrderInput | SortOrder
    familyId?: SortOrderInput | SortOrder
    callFamily?: call_familyOrderByWithRelationInput
    formations?: call_formationOrderByRelationAggregateInput
    sequences?: sequence_callsOrderByRelationAggregateInput
  }

  export type callWhereUniqueInput = Prisma.AtLeast<{
    callId?: number
    name?: string
    AND?: callWhereInput | callWhereInput[]
    OR?: callWhereInput[]
    NOT?: callWhereInput | callWhereInput[]
    tamSeq?: StringNullableFilter<"call"> | string | null
    familyId?: IntNullableFilter<"call"> | number | null
    callFamily?: XOR<Call_familyNullableScalarRelationFilter, call_familyWhereInput> | null
    formations?: Call_formationListRelationFilter
    sequences?: Sequence_callsListRelationFilter
  }, "callId" | "name">

  export type callOrderByWithAggregationInput = {
    callId?: SortOrder
    name?: SortOrder
    tamSeq?: SortOrderInput | SortOrder
    familyId?: SortOrderInput | SortOrder
    _count?: callCountOrderByAggregateInput
    _avg?: callAvgOrderByAggregateInput
    _max?: callMaxOrderByAggregateInput
    _min?: callMinOrderByAggregateInput
    _sum?: callSumOrderByAggregateInput
  }

  export type callScalarWhereWithAggregatesInput = {
    AND?: callScalarWhereWithAggregatesInput | callScalarWhereWithAggregatesInput[]
    OR?: callScalarWhereWithAggregatesInput[]
    NOT?: callScalarWhereWithAggregatesInput | callScalarWhereWithAggregatesInput[]
    callId?: IntWithAggregatesFilter<"call"> | number
    name?: StringWithAggregatesFilter<"call"> | string
    tamSeq?: StringNullableWithAggregatesFilter<"call"> | string | null
    familyId?: IntNullableWithAggregatesFilter<"call"> | number | null
  }

  export type call_familyWhereInput = {
    AND?: call_familyWhereInput | call_familyWhereInput[]
    OR?: call_familyWhereInput[]
    NOT?: call_familyWhereInput | call_familyWhereInput[]
    familyId?: IntFilter<"call_family"> | number
    name?: StringFilter<"call_family"> | string
    call?: CallListRelationFilter
  }

  export type call_familyOrderByWithRelationInput = {
    familyId?: SortOrder
    name?: SortOrder
    call?: callOrderByRelationAggregateInput
  }

  export type call_familyWhereUniqueInput = Prisma.AtLeast<{
    familyId?: number
    AND?: call_familyWhereInput | call_familyWhereInput[]
    OR?: call_familyWhereInput[]
    NOT?: call_familyWhereInput | call_familyWhereInput[]
    name?: StringFilter<"call_family"> | string
    call?: CallListRelationFilter
  }, "familyId">

  export type call_familyOrderByWithAggregationInput = {
    familyId?: SortOrder
    name?: SortOrder
    _count?: call_familyCountOrderByAggregateInput
    _avg?: call_familyAvgOrderByAggregateInput
    _max?: call_familyMaxOrderByAggregateInput
    _min?: call_familyMinOrderByAggregateInput
    _sum?: call_familySumOrderByAggregateInput
  }

  export type call_familyScalarWhereWithAggregatesInput = {
    AND?: call_familyScalarWhereWithAggregatesInput | call_familyScalarWhereWithAggregatesInput[]
    OR?: call_familyScalarWhereWithAggregatesInput[]
    NOT?: call_familyScalarWhereWithAggregatesInput | call_familyScalarWhereWithAggregatesInput[]
    familyId?: IntWithAggregatesFilter<"call_family"> | number
    name?: StringWithAggregatesFilter<"call_family"> | string
  }

  export type call_formationWhereInput = {
    AND?: call_formationWhereInput | call_formationWhereInput[]
    OR?: call_formationWhereInput[]
    NOT?: call_formationWhereInput | call_formationWhereInput[]
    callId?: IntFilter<"call_formation"> | number
    startId?: IntFilter<"call_formation"> | number
    endId?: IntFilter<"call_formation"> | number
    call?: XOR<CallScalarRelationFilter, callWhereInput>
    startForm?: XOR<FormationScalarRelationFilter, formationWhereInput>
    endForm?: XOR<FormationScalarRelationFilter, formationWhereInput>
  }

  export type call_formationOrderByWithRelationInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
    call?: callOrderByWithRelationInput
    startForm?: formationOrderByWithRelationInput
    endForm?: formationOrderByWithRelationInput
  }

  export type call_formationWhereUniqueInput = Prisma.AtLeast<{
    callId_startId?: call_formationCallIdStartIdCompoundUniqueInput
    AND?: call_formationWhereInput | call_formationWhereInput[]
    OR?: call_formationWhereInput[]
    NOT?: call_formationWhereInput | call_formationWhereInput[]
    callId?: IntFilter<"call_formation"> | number
    startId?: IntFilter<"call_formation"> | number
    endId?: IntFilter<"call_formation"> | number
    call?: XOR<CallScalarRelationFilter, callWhereInput>
    startForm?: XOR<FormationScalarRelationFilter, formationWhereInput>
    endForm?: XOR<FormationScalarRelationFilter, formationWhereInput>
  }, "callId_startId">

  export type call_formationOrderByWithAggregationInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
    _count?: call_formationCountOrderByAggregateInput
    _avg?: call_formationAvgOrderByAggregateInput
    _max?: call_formationMaxOrderByAggregateInput
    _min?: call_formationMinOrderByAggregateInput
    _sum?: call_formationSumOrderByAggregateInput
  }

  export type call_formationScalarWhereWithAggregatesInput = {
    AND?: call_formationScalarWhereWithAggregatesInput | call_formationScalarWhereWithAggregatesInput[]
    OR?: call_formationScalarWhereWithAggregatesInput[]
    NOT?: call_formationScalarWhereWithAggregatesInput | call_formationScalarWhereWithAggregatesInput[]
    callId?: IntWithAggregatesFilter<"call_formation"> | number
    startId?: IntWithAggregatesFilter<"call_formation"> | number
    endId?: IntWithAggregatesFilter<"call_formation"> | number
  }

  export type formationWhereInput = {
    AND?: formationWhereInput | formationWhereInput[]
    OR?: formationWhereInput[]
    NOT?: formationWhereInput | formationWhereInput[]
    formId?: IntFilter<"formation"> | number
    name?: StringFilter<"formation"> | string
    description?: StringNullableFilter<"formation"> | string | null
    clCode?: StringNullableFilter<"formation"> | string | null
    sdCode?: StringNullableFilter<"formation"> | string | null
    callStart?: Call_formationListRelationFilter
    callEnding?: Call_formationListRelationFilter
    sequences?: Sequence_callsListRelationFilter
  }

  export type formationOrderByWithRelationInput = {
    formId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    clCode?: SortOrderInput | SortOrder
    sdCode?: SortOrderInput | SortOrder
    callStart?: call_formationOrderByRelationAggregateInput
    callEnding?: call_formationOrderByRelationAggregateInput
    sequences?: sequence_callsOrderByRelationAggregateInput
  }

  export type formationWhereUniqueInput = Prisma.AtLeast<{
    formId?: number
    AND?: formationWhereInput | formationWhereInput[]
    OR?: formationWhereInput[]
    NOT?: formationWhereInput | formationWhereInput[]
    name?: StringFilter<"formation"> | string
    description?: StringNullableFilter<"formation"> | string | null
    clCode?: StringNullableFilter<"formation"> | string | null
    sdCode?: StringNullableFilter<"formation"> | string | null
    callStart?: Call_formationListRelationFilter
    callEnding?: Call_formationListRelationFilter
    sequences?: Sequence_callsListRelationFilter
  }, "formId">

  export type formationOrderByWithAggregationInput = {
    formId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    clCode?: SortOrderInput | SortOrder
    sdCode?: SortOrderInput | SortOrder
    _count?: formationCountOrderByAggregateInput
    _avg?: formationAvgOrderByAggregateInput
    _max?: formationMaxOrderByAggregateInput
    _min?: formationMinOrderByAggregateInput
    _sum?: formationSumOrderByAggregateInput
  }

  export type formationScalarWhereWithAggregatesInput = {
    AND?: formationScalarWhereWithAggregatesInput | formationScalarWhereWithAggregatesInput[]
    OR?: formationScalarWhereWithAggregatesInput[]
    NOT?: formationScalarWhereWithAggregatesInput | formationScalarWhereWithAggregatesInput[]
    formId?: IntWithAggregatesFilter<"formation"> | number
    name?: StringWithAggregatesFilter<"formation"> | string
    description?: StringNullableWithAggregatesFilter<"formation"> | string | null
    clCode?: StringNullableWithAggregatesFilter<"formation"> | string | null
    sdCode?: StringNullableWithAggregatesFilter<"formation"> | string | null
  }

  export type programWhereInput = {
    AND?: programWhereInput | programWhereInput[]
    OR?: programWhereInput[]
    NOT?: programWhereInput | programWhereInput[]
    programId?: IntFilter<"program"> | number
    name?: StringFilter<"program"> | string
    order?: IntFilter<"program"> | number
    dancers?: Dance_programListRelationFilter
  }

  export type programOrderByWithRelationInput = {
    programId?: SortOrder
    name?: SortOrder
    order?: SortOrder
    dancers?: dance_programOrderByRelationAggregateInput
  }

  export type programWhereUniqueInput = Prisma.AtLeast<{
    programId?: number
    AND?: programWhereInput | programWhereInput[]
    OR?: programWhereInput[]
    NOT?: programWhereInput | programWhereInput[]
    name?: StringFilter<"program"> | string
    order?: IntFilter<"program"> | number
    dancers?: Dance_programListRelationFilter
  }, "programId">

  export type programOrderByWithAggregationInput = {
    programId?: SortOrder
    name?: SortOrder
    order?: SortOrder
    _count?: programCountOrderByAggregateInput
    _avg?: programAvgOrderByAggregateInput
    _max?: programMaxOrderByAggregateInput
    _min?: programMinOrderByAggregateInput
    _sum?: programSumOrderByAggregateInput
  }

  export type programScalarWhereWithAggregatesInput = {
    AND?: programScalarWhereWithAggregatesInput | programScalarWhereWithAggregatesInput[]
    OR?: programScalarWhereWithAggregatesInput[]
    NOT?: programScalarWhereWithAggregatesInput | programScalarWhereWithAggregatesInput[]
    programId?: IntWithAggregatesFilter<"program"> | number
    name?: StringWithAggregatesFilter<"program"> | string
    order?: IntWithAggregatesFilter<"program"> | number
  }

  export type sequenceWhereInput = {
    AND?: sequenceWhereInput | sequenceWhereInput[]
    OR?: sequenceWhereInput[]
    NOT?: sequenceWhereInput | sequenceWhereInput[]
    seqId?: IntFilter<"sequence"> | number
    name?: StringFilter<"sequence"> | string
    calls?: Sequence_callsListRelationFilter
  }

  export type sequenceOrderByWithRelationInput = {
    seqId?: SortOrder
    name?: SortOrder
    calls?: sequence_callsOrderByRelationAggregateInput
  }

  export type sequenceWhereUniqueInput = Prisma.AtLeast<{
    seqId?: number
    name?: string
    AND?: sequenceWhereInput | sequenceWhereInput[]
    OR?: sequenceWhereInput[]
    NOT?: sequenceWhereInput | sequenceWhereInput[]
    calls?: Sequence_callsListRelationFilter
  }, "seqId" | "name">

  export type sequenceOrderByWithAggregationInput = {
    seqId?: SortOrder
    name?: SortOrder
    _count?: sequenceCountOrderByAggregateInput
    _avg?: sequenceAvgOrderByAggregateInput
    _max?: sequenceMaxOrderByAggregateInput
    _min?: sequenceMinOrderByAggregateInput
    _sum?: sequenceSumOrderByAggregateInput
  }

  export type sequenceScalarWhereWithAggregatesInput = {
    AND?: sequenceScalarWhereWithAggregatesInput | sequenceScalarWhereWithAggregatesInput[]
    OR?: sequenceScalarWhereWithAggregatesInput[]
    NOT?: sequenceScalarWhereWithAggregatesInput | sequenceScalarWhereWithAggregatesInput[]
    seqId?: IntWithAggregatesFilter<"sequence"> | number
    name?: StringWithAggregatesFilter<"sequence"> | string
  }

  export type sequence_callsWhereInput = {
    AND?: sequence_callsWhereInput | sequence_callsWhereInput[]
    OR?: sequence_callsWhereInput[]
    NOT?: sequence_callsWhereInput | sequence_callsWhereInput[]
    seqId?: IntFilter<"sequence_calls"> | number
    callId?: IntFilter<"sequence_calls"> | number
    startId?: IntFilter<"sequence_calls"> | number
    order?: IntFilter<"sequence_calls"> | number
    helperText?: StringNullableFilter<"sequence_calls"> | string | null
    sequence?: XOR<SequenceScalarRelationFilter, sequenceWhereInput>
    call?: XOR<CallScalarRelationFilter, callWhereInput>
    startForm?: XOR<FormationScalarRelationFilter, formationWhereInput>
  }

  export type sequence_callsOrderByWithRelationInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
    helperText?: SortOrderInput | SortOrder
    sequence?: sequenceOrderByWithRelationInput
    call?: callOrderByWithRelationInput
    startForm?: formationOrderByWithRelationInput
  }

  export type sequence_callsWhereUniqueInput = Prisma.AtLeast<{
    seqId_callId_startId_order?: sequence_callsSeqIdCallIdStartIdOrderCompoundUniqueInput
    AND?: sequence_callsWhereInput | sequence_callsWhereInput[]
    OR?: sequence_callsWhereInput[]
    NOT?: sequence_callsWhereInput | sequence_callsWhereInput[]
    seqId?: IntFilter<"sequence_calls"> | number
    callId?: IntFilter<"sequence_calls"> | number
    startId?: IntFilter<"sequence_calls"> | number
    order?: IntFilter<"sequence_calls"> | number
    helperText?: StringNullableFilter<"sequence_calls"> | string | null
    sequence?: XOR<SequenceScalarRelationFilter, sequenceWhereInput>
    call?: XOR<CallScalarRelationFilter, callWhereInput>
    startForm?: XOR<FormationScalarRelationFilter, formationWhereInput>
  }, "seqId_callId_startId_order">

  export type sequence_callsOrderByWithAggregationInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
    helperText?: SortOrderInput | SortOrder
    _count?: sequence_callsCountOrderByAggregateInput
    _avg?: sequence_callsAvgOrderByAggregateInput
    _max?: sequence_callsMaxOrderByAggregateInput
    _min?: sequence_callsMinOrderByAggregateInput
    _sum?: sequence_callsSumOrderByAggregateInput
  }

  export type sequence_callsScalarWhereWithAggregatesInput = {
    AND?: sequence_callsScalarWhereWithAggregatesInput | sequence_callsScalarWhereWithAggregatesInput[]
    OR?: sequence_callsScalarWhereWithAggregatesInput[]
    NOT?: sequence_callsScalarWhereWithAggregatesInput | sequence_callsScalarWhereWithAggregatesInput[]
    seqId?: IntWithAggregatesFilter<"sequence_calls"> | number
    callId?: IntWithAggregatesFilter<"sequence_calls"> | number
    startId?: IntWithAggregatesFilter<"sequence_calls"> | number
    order?: IntWithAggregatesFilter<"sequence_calls"> | number
    helperText?: StringNullableWithAggregatesFilter<"sequence_calls"> | string | null
  }

  export type countryWhereInput = {
    AND?: countryWhereInput | countryWhereInput[]
    OR?: countryWhereInput[]
    NOT?: countryWhereInput | countryWhereInput[]
    code?: StringFilter<"country"> | string
    name?: StringNullableFilter<"country"> | string | null
    states?: StateListRelationFilter
  }

  export type countryOrderByWithRelationInput = {
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    states?: stateOrderByRelationAggregateInput
  }

  export type countryWhereUniqueInput = Prisma.AtLeast<{
    code?: string
    AND?: countryWhereInput | countryWhereInput[]
    OR?: countryWhereInput[]
    NOT?: countryWhereInput | countryWhereInput[]
    name?: StringNullableFilter<"country"> | string | null
    states?: StateListRelationFilter
  }, "code">

  export type countryOrderByWithAggregationInput = {
    code?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: countryCountOrderByAggregateInput
    _max?: countryMaxOrderByAggregateInput
    _min?: countryMinOrderByAggregateInput
  }

  export type countryScalarWhereWithAggregatesInput = {
    AND?: countryScalarWhereWithAggregatesInput | countryScalarWhereWithAggregatesInput[]
    OR?: countryScalarWhereWithAggregatesInput[]
    NOT?: countryScalarWhereWithAggregatesInput | countryScalarWhereWithAggregatesInput[]
    code?: StringWithAggregatesFilter<"country"> | string
    name?: StringNullableWithAggregatesFilter<"country"> | string | null
  }

  export type dancerWhereInput = {
    AND?: dancerWhereInput | dancerWhereInput[]
    OR?: dancerWhereInput[]
    NOT?: dancerWhereInput | dancerWhereInput[]
    dancerId?: IntFilter<"dancer"> | number
    name?: StringNullableFilter<"dancer"> | string | null
    email?: StringFilter<"dancer"> | string
    groups?: Dance_groupListRelationFilter
    levels?: Dance_programListRelationFilter
  }

  export type dancerOrderByWithRelationInput = {
    dancerId?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    groups?: dance_groupOrderByRelationAggregateInput
    levels?: dance_programOrderByRelationAggregateInput
  }

  export type dancerWhereUniqueInput = Prisma.AtLeast<{
    dancerId?: number
    email?: string
    AND?: dancerWhereInput | dancerWhereInput[]
    OR?: dancerWhereInput[]
    NOT?: dancerWhereInput | dancerWhereInput[]
    name?: StringNullableFilter<"dancer"> | string | null
    groups?: Dance_groupListRelationFilter
    levels?: Dance_programListRelationFilter
  }, "dancerId" | "email">

  export type dancerOrderByWithAggregationInput = {
    dancerId?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    _count?: dancerCountOrderByAggregateInput
    _avg?: dancerAvgOrderByAggregateInput
    _max?: dancerMaxOrderByAggregateInput
    _min?: dancerMinOrderByAggregateInput
    _sum?: dancerSumOrderByAggregateInput
  }

  export type dancerScalarWhereWithAggregatesInput = {
    AND?: dancerScalarWhereWithAggregatesInput | dancerScalarWhereWithAggregatesInput[]
    OR?: dancerScalarWhereWithAggregatesInput[]
    NOT?: dancerScalarWhereWithAggregatesInput | dancerScalarWhereWithAggregatesInput[]
    dancerId?: IntWithAggregatesFilter<"dancer"> | number
    name?: StringNullableWithAggregatesFilter<"dancer"> | string | null
    email?: StringWithAggregatesFilter<"dancer"> | string
  }

  export type dance_groupWhereInput = {
    AND?: dance_groupWhereInput | dance_groupWhereInput[]
    OR?: dance_groupWhereInput[]
    NOT?: dance_groupWhereInput | dance_groupWhereInput[]
    dancerId?: IntFilter<"dance_group"> | number
    groupId?: StringFilter<"dance_group"> | string
    side?: StringFilter<"dance_group"> | string
    proficency?: StringFilter<"dance_group"> | string
    dancer?: XOR<DancerScalarRelationFilter, dancerWhereInput>
    group?: XOR<GroupScalarRelationFilter, groupWhereInput>
  }

  export type dance_groupOrderByWithRelationInput = {
    dancerId?: SortOrder
    groupId?: SortOrder
    side?: SortOrder
    proficency?: SortOrder
    dancer?: dancerOrderByWithRelationInput
    group?: groupOrderByWithRelationInput
  }

  export type dance_groupWhereUniqueInput = Prisma.AtLeast<{
    dancerId_groupId?: dance_groupDancerIdGroupIdCompoundUniqueInput
    AND?: dance_groupWhereInput | dance_groupWhereInput[]
    OR?: dance_groupWhereInput[]
    NOT?: dance_groupWhereInput | dance_groupWhereInput[]
    dancerId?: IntFilter<"dance_group"> | number
    groupId?: StringFilter<"dance_group"> | string
    side?: StringFilter<"dance_group"> | string
    proficency?: StringFilter<"dance_group"> | string
    dancer?: XOR<DancerScalarRelationFilter, dancerWhereInput>
    group?: XOR<GroupScalarRelationFilter, groupWhereInput>
  }, "dancerId_groupId">

  export type dance_groupOrderByWithAggregationInput = {
    dancerId?: SortOrder
    groupId?: SortOrder
    side?: SortOrder
    proficency?: SortOrder
    _count?: dance_groupCountOrderByAggregateInput
    _avg?: dance_groupAvgOrderByAggregateInput
    _max?: dance_groupMaxOrderByAggregateInput
    _min?: dance_groupMinOrderByAggregateInput
    _sum?: dance_groupSumOrderByAggregateInput
  }

  export type dance_groupScalarWhereWithAggregatesInput = {
    AND?: dance_groupScalarWhereWithAggregatesInput | dance_groupScalarWhereWithAggregatesInput[]
    OR?: dance_groupScalarWhereWithAggregatesInput[]
    NOT?: dance_groupScalarWhereWithAggregatesInput | dance_groupScalarWhereWithAggregatesInput[]
    dancerId?: IntWithAggregatesFilter<"dance_group"> | number
    groupId?: StringWithAggregatesFilter<"dance_group"> | string
    side?: StringWithAggregatesFilter<"dance_group"> | string
    proficency?: StringWithAggregatesFilter<"dance_group"> | string
  }

  export type dance_programWhereInput = {
    AND?: dance_programWhereInput | dance_programWhereInput[]
    OR?: dance_programWhereInput[]
    NOT?: dance_programWhereInput | dance_programWhereInput[]
    dancerId?: IntFilter<"dance_program"> | number
    programId?: IntFilter<"dance_program"> | number
    type?: StringFilter<"dance_program"> | string
    proficency?: StringFilter<"dance_program"> | string
    dancer?: XOR<DancerScalarRelationFilter, dancerWhereInput>
    program?: XOR<ProgramScalarRelationFilter, programWhereInput>
  }

  export type dance_programOrderByWithRelationInput = {
    dancerId?: SortOrder
    programId?: SortOrder
    type?: SortOrder
    proficency?: SortOrder
    dancer?: dancerOrderByWithRelationInput
    program?: programOrderByWithRelationInput
  }

  export type dance_programWhereUniqueInput = Prisma.AtLeast<{
    dancerId_programId_type_proficency?: dance_programDancerIdProgramIdTypeProficencyCompoundUniqueInput
    AND?: dance_programWhereInput | dance_programWhereInput[]
    OR?: dance_programWhereInput[]
    NOT?: dance_programWhereInput | dance_programWhereInput[]
    dancerId?: IntFilter<"dance_program"> | number
    programId?: IntFilter<"dance_program"> | number
    type?: StringFilter<"dance_program"> | string
    proficency?: StringFilter<"dance_program"> | string
    dancer?: XOR<DancerScalarRelationFilter, dancerWhereInput>
    program?: XOR<ProgramScalarRelationFilter, programWhereInput>
  }, "dancerId_programId_type_proficency">

  export type dance_programOrderByWithAggregationInput = {
    dancerId?: SortOrder
    programId?: SortOrder
    type?: SortOrder
    proficency?: SortOrder
    _count?: dance_programCountOrderByAggregateInput
    _avg?: dance_programAvgOrderByAggregateInput
    _max?: dance_programMaxOrderByAggregateInput
    _min?: dance_programMinOrderByAggregateInput
    _sum?: dance_programSumOrderByAggregateInput
  }

  export type dance_programScalarWhereWithAggregatesInput = {
    AND?: dance_programScalarWhereWithAggregatesInput | dance_programScalarWhereWithAggregatesInput[]
    OR?: dance_programScalarWhereWithAggregatesInput[]
    NOT?: dance_programScalarWhereWithAggregatesInput | dance_programScalarWhereWithAggregatesInput[]
    dancerId?: IntWithAggregatesFilter<"dance_program"> | number
    programId?: IntWithAggregatesFilter<"dance_program"> | number
    type?: StringWithAggregatesFilter<"dance_program"> | string
    proficency?: StringWithAggregatesFilter<"dance_program"> | string
  }

  export type groupWhereInput = {
    AND?: groupWhereInput | groupWhereInput[]
    OR?: groupWhereInput[]
    NOT?: groupWhereInput | groupWhereInput[]
    id?: StringFilter<"group"> | string
    name?: StringFilter<"group"> | string
    type?: StringFilter<"group"> | string
    countryCode?: StringFilter<"group"> | string
    state?: StringFilter<"group"> | string
    countryState?: XOR<StateScalarRelationFilter, stateWhereInput>
    dancers?: Dance_groupListRelationFilter
    parent?: Group_assocationsListRelationFilter
    child?: Group_assocationsListRelationFilter
  }

  export type groupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    countryCode?: SortOrder
    state?: SortOrder
    countryState?: stateOrderByWithRelationInput
    dancers?: dance_groupOrderByRelationAggregateInput
    parent?: group_assocationsOrderByRelationAggregateInput
    child?: group_assocationsOrderByRelationAggregateInput
  }

  export type groupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: groupWhereInput | groupWhereInput[]
    OR?: groupWhereInput[]
    NOT?: groupWhereInput | groupWhereInput[]
    name?: StringFilter<"group"> | string
    type?: StringFilter<"group"> | string
    countryCode?: StringFilter<"group"> | string
    state?: StringFilter<"group"> | string
    countryState?: XOR<StateScalarRelationFilter, stateWhereInput>
    dancers?: Dance_groupListRelationFilter
    parent?: Group_assocationsListRelationFilter
    child?: Group_assocationsListRelationFilter
  }, "id">

  export type groupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    countryCode?: SortOrder
    state?: SortOrder
    _count?: groupCountOrderByAggregateInput
    _max?: groupMaxOrderByAggregateInput
    _min?: groupMinOrderByAggregateInput
  }

  export type groupScalarWhereWithAggregatesInput = {
    AND?: groupScalarWhereWithAggregatesInput | groupScalarWhereWithAggregatesInput[]
    OR?: groupScalarWhereWithAggregatesInput[]
    NOT?: groupScalarWhereWithAggregatesInput | groupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"group"> | string
    name?: StringWithAggregatesFilter<"group"> | string
    type?: StringWithAggregatesFilter<"group"> | string
    countryCode?: StringWithAggregatesFilter<"group"> | string
    state?: StringWithAggregatesFilter<"group"> | string
  }

  export type group_assocationsWhereInput = {
    AND?: group_assocationsWhereInput | group_assocationsWhereInput[]
    OR?: group_assocationsWhereInput[]
    NOT?: group_assocationsWhereInput | group_assocationsWhereInput[]
    groupId?: StringFilter<"group_assocations"> | string
    parentId?: StringFilter<"group_assocations"> | string
    group?: XOR<GroupScalarRelationFilter, groupWhereInput>
    parent?: XOR<GroupScalarRelationFilter, groupWhereInput>
  }

  export type group_assocationsOrderByWithRelationInput = {
    groupId?: SortOrder
    parentId?: SortOrder
    group?: groupOrderByWithRelationInput
    parent?: groupOrderByWithRelationInput
  }

  export type group_assocationsWhereUniqueInput = Prisma.AtLeast<{
    groupId_parentId?: group_assocationsGroupIdParentIdCompoundUniqueInput
    AND?: group_assocationsWhereInput | group_assocationsWhereInput[]
    OR?: group_assocationsWhereInput[]
    NOT?: group_assocationsWhereInput | group_assocationsWhereInput[]
    groupId?: StringFilter<"group_assocations"> | string
    parentId?: StringFilter<"group_assocations"> | string
    group?: XOR<GroupScalarRelationFilter, groupWhereInput>
    parent?: XOR<GroupScalarRelationFilter, groupWhereInput>
  }, "groupId_parentId">

  export type group_assocationsOrderByWithAggregationInput = {
    groupId?: SortOrder
    parentId?: SortOrder
    _count?: group_assocationsCountOrderByAggregateInput
    _max?: group_assocationsMaxOrderByAggregateInput
    _min?: group_assocationsMinOrderByAggregateInput
  }

  export type group_assocationsScalarWhereWithAggregatesInput = {
    AND?: group_assocationsScalarWhereWithAggregatesInput | group_assocationsScalarWhereWithAggregatesInput[]
    OR?: group_assocationsScalarWhereWithAggregatesInput[]
    NOT?: group_assocationsScalarWhereWithAggregatesInput | group_assocationsScalarWhereWithAggregatesInput[]
    groupId?: StringWithAggregatesFilter<"group_assocations"> | string
    parentId?: StringWithAggregatesFilter<"group_assocations"> | string
  }

  export type stateWhereInput = {
    AND?: stateWhereInput | stateWhereInput[]
    OR?: stateWhereInput[]
    NOT?: stateWhereInput | stateWhereInput[]
    countryCode?: StringFilter<"state"> | string
    state?: StringFilter<"state"> | string
    name?: StringNullableFilter<"state"> | string | null
    country?: XOR<CountryScalarRelationFilter, countryWhereInput>
    groups?: GroupListRelationFilter
  }

  export type stateOrderByWithRelationInput = {
    countryCode?: SortOrder
    state?: SortOrder
    name?: SortOrderInput | SortOrder
    country?: countryOrderByWithRelationInput
    groups?: groupOrderByRelationAggregateInput
  }

  export type stateWhereUniqueInput = Prisma.AtLeast<{
    countryCode_state?: stateCountryCodeStateCompoundUniqueInput
    AND?: stateWhereInput | stateWhereInput[]
    OR?: stateWhereInput[]
    NOT?: stateWhereInput | stateWhereInput[]
    countryCode?: StringFilter<"state"> | string
    state?: StringFilter<"state"> | string
    name?: StringNullableFilter<"state"> | string | null
    country?: XOR<CountryScalarRelationFilter, countryWhereInput>
    groups?: GroupListRelationFilter
  }, "countryCode_state">

  export type stateOrderByWithAggregationInput = {
    countryCode?: SortOrder
    state?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: stateCountOrderByAggregateInput
    _max?: stateMaxOrderByAggregateInput
    _min?: stateMinOrderByAggregateInput
  }

  export type stateScalarWhereWithAggregatesInput = {
    AND?: stateScalarWhereWithAggregatesInput | stateScalarWhereWithAggregatesInput[]
    OR?: stateScalarWhereWithAggregatesInput[]
    NOT?: stateScalarWhereWithAggregatesInput | stateScalarWhereWithAggregatesInput[]
    countryCode?: StringWithAggregatesFilter<"state"> | string
    state?: StringWithAggregatesFilter<"state"> | string
    name?: StringNullableWithAggregatesFilter<"state"> | string | null
  }

  export type callCreateInput = {
    name: string
    tamSeq?: string | null
    callFamily?: call_familyCreateNestedOneWithoutCallInput
    formations?: call_formationCreateNestedManyWithoutCallInput
    sequences?: sequence_callsCreateNestedManyWithoutCallInput
  }

  export type callUncheckedCreateInput = {
    callId?: number
    name: string
    tamSeq?: string | null
    familyId?: number | null
    formations?: call_formationUncheckedCreateNestedManyWithoutCallInput
    sequences?: sequence_callsUncheckedCreateNestedManyWithoutCallInput
  }

  export type callUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    callFamily?: call_familyUpdateOneWithoutCallNestedInput
    formations?: call_formationUpdateManyWithoutCallNestedInput
    sequences?: sequence_callsUpdateManyWithoutCallNestedInput
  }

  export type callUncheckedUpdateInput = {
    callId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: NullableIntFieldUpdateOperationsInput | number | null
    formations?: call_formationUncheckedUpdateManyWithoutCallNestedInput
    sequences?: sequence_callsUncheckedUpdateManyWithoutCallNestedInput
  }

  export type callCreateManyInput = {
    callId?: number
    name: string
    tamSeq?: string | null
    familyId?: number | null
  }

  export type callUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type callUncheckedUpdateManyInput = {
    callId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type call_familyCreateInput = {
    name: string
    call?: callCreateNestedManyWithoutCallFamilyInput
  }

  export type call_familyUncheckedCreateInput = {
    familyId?: number
    name: string
    call?: callUncheckedCreateNestedManyWithoutCallFamilyInput
  }

  export type call_familyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    call?: callUpdateManyWithoutCallFamilyNestedInput
  }

  export type call_familyUncheckedUpdateInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    call?: callUncheckedUpdateManyWithoutCallFamilyNestedInput
  }

  export type call_familyCreateManyInput = {
    familyId?: number
    name: string
  }

  export type call_familyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type call_familyUncheckedUpdateManyInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type call_formationCreateInput = {
    call: callCreateNestedOneWithoutFormationsInput
    startForm: formationCreateNestedOneWithoutCallStartInput
    endForm: formationCreateNestedOneWithoutCallEndingInput
  }

  export type call_formationUncheckedCreateInput = {
    callId: number
    startId: number
    endId: number
  }

  export type call_formationUpdateInput = {
    call?: callUpdateOneRequiredWithoutFormationsNestedInput
    startForm?: formationUpdateOneRequiredWithoutCallStartNestedInput
    endForm?: formationUpdateOneRequiredWithoutCallEndingNestedInput
  }

  export type call_formationUncheckedUpdateInput = {
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    endId?: IntFieldUpdateOperationsInput | number
  }

  export type call_formationCreateManyInput = {
    callId: number
    startId: number
    endId: number
  }

  export type call_formationUpdateManyMutationInput = {

  }

  export type call_formationUncheckedUpdateManyInput = {
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    endId?: IntFieldUpdateOperationsInput | number
  }

  export type formationCreateInput = {
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callStart?: call_formationCreateNestedManyWithoutStartFormInput
    callEnding?: call_formationCreateNestedManyWithoutEndFormInput
    sequences?: sequence_callsCreateNestedManyWithoutStartFormInput
  }

  export type formationUncheckedCreateInput = {
    formId?: number
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callStart?: call_formationUncheckedCreateNestedManyWithoutStartFormInput
    callEnding?: call_formationUncheckedCreateNestedManyWithoutEndFormInput
    sequences?: sequence_callsUncheckedCreateNestedManyWithoutStartFormInput
  }

  export type formationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callStart?: call_formationUpdateManyWithoutStartFormNestedInput
    callEnding?: call_formationUpdateManyWithoutEndFormNestedInput
    sequences?: sequence_callsUpdateManyWithoutStartFormNestedInput
  }

  export type formationUncheckedUpdateInput = {
    formId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callStart?: call_formationUncheckedUpdateManyWithoutStartFormNestedInput
    callEnding?: call_formationUncheckedUpdateManyWithoutEndFormNestedInput
    sequences?: sequence_callsUncheckedUpdateManyWithoutStartFormNestedInput
  }

  export type formationCreateManyInput = {
    formId?: number
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
  }

  export type formationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type formationUncheckedUpdateManyInput = {
    formId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type programCreateInput = {
    name: string
    order: number
    dancers?: dance_programCreateNestedManyWithoutProgramInput
  }

  export type programUncheckedCreateInput = {
    programId?: number
    name: string
    order: number
    dancers?: dance_programUncheckedCreateNestedManyWithoutProgramInput
  }

  export type programUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    dancers?: dance_programUpdateManyWithoutProgramNestedInput
  }

  export type programUncheckedUpdateInput = {
    programId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    dancers?: dance_programUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type programCreateManyInput = {
    programId?: number
    name: string
    order: number
  }

  export type programUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type programUncheckedUpdateManyInput = {
    programId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type sequenceCreateInput = {
    name: string
    calls?: sequence_callsCreateNestedManyWithoutSequenceInput
  }

  export type sequenceUncheckedCreateInput = {
    seqId?: number
    name: string
    calls?: sequence_callsUncheckedCreateNestedManyWithoutSequenceInput
  }

  export type sequenceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    calls?: sequence_callsUpdateManyWithoutSequenceNestedInput
  }

  export type sequenceUncheckedUpdateInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    calls?: sequence_callsUncheckedUpdateManyWithoutSequenceNestedInput
  }

  export type sequenceCreateManyInput = {
    seqId?: number
    name: string
  }

  export type sequenceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type sequenceUncheckedUpdateManyInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type sequence_callsCreateInput = {
    order: number
    helperText?: string | null
    sequence: sequenceCreateNestedOneWithoutCallsInput
    call: callCreateNestedOneWithoutSequencesInput
    startForm: formationCreateNestedOneWithoutSequencesInput
  }

  export type sequence_callsUncheckedCreateInput = {
    seqId: number
    callId: number
    startId: number
    order: number
    helperText?: string | null
  }

  export type sequence_callsUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: sequenceUpdateOneRequiredWithoutCallsNestedInput
    call?: callUpdateOneRequiredWithoutSequencesNestedInput
    startForm?: formationUpdateOneRequiredWithoutSequencesNestedInput
  }

  export type sequence_callsUncheckedUpdateInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sequence_callsCreateManyInput = {
    seqId: number
    callId: number
    startId: number
    order: number
    helperText?: string | null
  }

  export type sequence_callsUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sequence_callsUncheckedUpdateManyInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type countryCreateInput = {
    code: string
    name?: string | null
    states?: stateCreateNestedManyWithoutCountryInput
  }

  export type countryUncheckedCreateInput = {
    code: string
    name?: string | null
    states?: stateUncheckedCreateNestedManyWithoutCountryInput
  }

  export type countryUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    states?: stateUpdateManyWithoutCountryNestedInput
  }

  export type countryUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    states?: stateUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type countryCreateManyInput = {
    code: string
    name?: string | null
  }

  export type countryUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type countryUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type dancerCreateInput = {
    name?: string | null
    email: string
    groups?: dance_groupCreateNestedManyWithoutDancerInput
    levels?: dance_programCreateNestedManyWithoutDancerInput
  }

  export type dancerUncheckedCreateInput = {
    dancerId?: number
    name?: string | null
    email: string
    groups?: dance_groupUncheckedCreateNestedManyWithoutDancerInput
    levels?: dance_programUncheckedCreateNestedManyWithoutDancerInput
  }

  export type dancerUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    groups?: dance_groupUpdateManyWithoutDancerNestedInput
    levels?: dance_programUpdateManyWithoutDancerNestedInput
  }

  export type dancerUncheckedUpdateInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    groups?: dance_groupUncheckedUpdateManyWithoutDancerNestedInput
    levels?: dance_programUncheckedUpdateManyWithoutDancerNestedInput
  }

  export type dancerCreateManyInput = {
    dancerId?: number
    name?: string | null
    email: string
  }

  export type dancerUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type dancerUncheckedUpdateManyInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
  }

  export type dance_groupCreateInput = {
    side: string
    proficency: string
    dancer: dancerCreateNestedOneWithoutGroupsInput
    group: groupCreateNestedOneWithoutDancersInput
  }

  export type dance_groupUncheckedCreateInput = {
    dancerId: number
    groupId: string
    side: string
    proficency: string
  }

  export type dance_groupUpdateInput = {
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
    dancer?: dancerUpdateOneRequiredWithoutGroupsNestedInput
    group?: groupUpdateOneRequiredWithoutDancersNestedInput
  }

  export type dance_groupUncheckedUpdateInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    groupId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_groupCreateManyInput = {
    dancerId: number
    groupId: string
    side: string
    proficency: string
  }

  export type dance_groupUpdateManyMutationInput = {
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_groupUncheckedUpdateManyInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    groupId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_programCreateInput = {
    type: string
    proficency: string
    dancer: dancerCreateNestedOneWithoutLevelsInput
    program: programCreateNestedOneWithoutDancersInput
  }

  export type dance_programUncheckedCreateInput = {
    dancerId: number
    programId: number
    type: string
    proficency: string
  }

  export type dance_programUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
    dancer?: dancerUpdateOneRequiredWithoutLevelsNestedInput
    program?: programUpdateOneRequiredWithoutDancersNestedInput
  }

  export type dance_programUncheckedUpdateInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    programId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_programCreateManyInput = {
    dancerId: number
    programId: number
    type: string
    proficency: string
  }

  export type dance_programUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_programUncheckedUpdateManyInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    programId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type groupCreateInput = {
    id?: string
    name: string
    type: string
    countryState: stateCreateNestedOneWithoutGroupsInput
    dancers?: dance_groupCreateNestedManyWithoutGroupInput
    parent?: group_assocationsCreateNestedManyWithoutGroupInput
    child?: group_assocationsCreateNestedManyWithoutParentInput
  }

  export type groupUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    countryCode: string
    state: string
    dancers?: dance_groupUncheckedCreateNestedManyWithoutGroupInput
    parent?: group_assocationsUncheckedCreateNestedManyWithoutGroupInput
    child?: group_assocationsUncheckedCreateNestedManyWithoutParentInput
  }

  export type groupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryState?: stateUpdateOneRequiredWithoutGroupsNestedInput
    dancers?: dance_groupUpdateManyWithoutGroupNestedInput
    parent?: group_assocationsUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUpdateManyWithoutParentNestedInput
  }

  export type groupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    dancers?: dance_groupUncheckedUpdateManyWithoutGroupNestedInput
    parent?: group_assocationsUncheckedUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUncheckedUpdateManyWithoutParentNestedInput
  }

  export type groupCreateManyInput = {
    id?: string
    name: string
    type: string
    countryCode: string
    state: string
  }

  export type groupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }

  export type groupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
  }

  export type group_assocationsCreateInput = {
    group: groupCreateNestedOneWithoutParentInput
    parent: groupCreateNestedOneWithoutChildInput
  }

  export type group_assocationsUncheckedCreateInput = {
    groupId: string
    parentId: string
  }

  export type group_assocationsUpdateInput = {
    group?: groupUpdateOneRequiredWithoutParentNestedInput
    parent?: groupUpdateOneRequiredWithoutChildNestedInput
  }

  export type group_assocationsUncheckedUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type group_assocationsCreateManyInput = {
    groupId: string
    parentId: string
  }

  export type group_assocationsUpdateManyMutationInput = {

  }

  export type group_assocationsUncheckedUpdateManyInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type stateCreateInput = {
    state: string
    name?: string | null
    country: countryCreateNestedOneWithoutStatesInput
    groups?: groupCreateNestedManyWithoutCountryStateInput
  }

  export type stateUncheckedCreateInput = {
    countryCode: string
    state: string
    name?: string | null
    groups?: groupUncheckedCreateNestedManyWithoutCountryStateInput
  }

  export type stateUpdateInput = {
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: countryUpdateOneRequiredWithoutStatesNestedInput
    groups?: groupUpdateManyWithoutCountryStateNestedInput
  }

  export type stateUncheckedUpdateInput = {
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groups?: groupUncheckedUpdateManyWithoutCountryStateNestedInput
  }

  export type stateCreateManyInput = {
    countryCode: string
    state: string
    name?: string | null
  }

  export type stateUpdateManyMutationInput = {
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type stateUncheckedUpdateManyInput = {
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Call_familyNullableScalarRelationFilter = {
    is?: call_familyWhereInput | null
    isNot?: call_familyWhereInput | null
  }

  export type Call_formationListRelationFilter = {
    every?: call_formationWhereInput
    some?: call_formationWhereInput
    none?: call_formationWhereInput
  }

  export type Sequence_callsListRelationFilter = {
    every?: sequence_callsWhereInput
    some?: sequence_callsWhereInput
    none?: sequence_callsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type call_formationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sequence_callsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type callCountOrderByAggregateInput = {
    callId?: SortOrder
    name?: SortOrder
    tamSeq?: SortOrder
    familyId?: SortOrder
  }

  export type callAvgOrderByAggregateInput = {
    callId?: SortOrder
    familyId?: SortOrder
  }

  export type callMaxOrderByAggregateInput = {
    callId?: SortOrder
    name?: SortOrder
    tamSeq?: SortOrder
    familyId?: SortOrder
  }

  export type callMinOrderByAggregateInput = {
    callId?: SortOrder
    name?: SortOrder
    tamSeq?: SortOrder
    familyId?: SortOrder
  }

  export type callSumOrderByAggregateInput = {
    callId?: SortOrder
    familyId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CallListRelationFilter = {
    every?: callWhereInput
    some?: callWhereInput
    none?: callWhereInput
  }

  export type callOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type call_familyCountOrderByAggregateInput = {
    familyId?: SortOrder
    name?: SortOrder
  }

  export type call_familyAvgOrderByAggregateInput = {
    familyId?: SortOrder
  }

  export type call_familyMaxOrderByAggregateInput = {
    familyId?: SortOrder
    name?: SortOrder
  }

  export type call_familyMinOrderByAggregateInput = {
    familyId?: SortOrder
    name?: SortOrder
  }

  export type call_familySumOrderByAggregateInput = {
    familyId?: SortOrder
  }

  export type CallScalarRelationFilter = {
    is?: callWhereInput
    isNot?: callWhereInput
  }

  export type FormationScalarRelationFilter = {
    is?: formationWhereInput
    isNot?: formationWhereInput
  }

  export type call_formationCallIdStartIdCompoundUniqueInput = {
    callId: number
    startId: number
  }

  export type call_formationCountOrderByAggregateInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
  }

  export type call_formationAvgOrderByAggregateInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
  }

  export type call_formationMaxOrderByAggregateInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
  }

  export type call_formationMinOrderByAggregateInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
  }

  export type call_formationSumOrderByAggregateInput = {
    callId?: SortOrder
    startId?: SortOrder
    endId?: SortOrder
  }

  export type formationCountOrderByAggregateInput = {
    formId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clCode?: SortOrder
    sdCode?: SortOrder
  }

  export type formationAvgOrderByAggregateInput = {
    formId?: SortOrder
  }

  export type formationMaxOrderByAggregateInput = {
    formId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clCode?: SortOrder
    sdCode?: SortOrder
  }

  export type formationMinOrderByAggregateInput = {
    formId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    clCode?: SortOrder
    sdCode?: SortOrder
  }

  export type formationSumOrderByAggregateInput = {
    formId?: SortOrder
  }

  export type Dance_programListRelationFilter = {
    every?: dance_programWhereInput
    some?: dance_programWhereInput
    none?: dance_programWhereInput
  }

  export type dance_programOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type programCountOrderByAggregateInput = {
    programId?: SortOrder
    name?: SortOrder
    order?: SortOrder
  }

  export type programAvgOrderByAggregateInput = {
    programId?: SortOrder
    order?: SortOrder
  }

  export type programMaxOrderByAggregateInput = {
    programId?: SortOrder
    name?: SortOrder
    order?: SortOrder
  }

  export type programMinOrderByAggregateInput = {
    programId?: SortOrder
    name?: SortOrder
    order?: SortOrder
  }

  export type programSumOrderByAggregateInput = {
    programId?: SortOrder
    order?: SortOrder
  }

  export type sequenceCountOrderByAggregateInput = {
    seqId?: SortOrder
    name?: SortOrder
  }

  export type sequenceAvgOrderByAggregateInput = {
    seqId?: SortOrder
  }

  export type sequenceMaxOrderByAggregateInput = {
    seqId?: SortOrder
    name?: SortOrder
  }

  export type sequenceMinOrderByAggregateInput = {
    seqId?: SortOrder
    name?: SortOrder
  }

  export type sequenceSumOrderByAggregateInput = {
    seqId?: SortOrder
  }

  export type SequenceScalarRelationFilter = {
    is?: sequenceWhereInput
    isNot?: sequenceWhereInput
  }

  export type sequence_callsSeqIdCallIdStartIdOrderCompoundUniqueInput = {
    seqId: number
    callId: number
    startId: number
    order: number
  }

  export type sequence_callsCountOrderByAggregateInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
    helperText?: SortOrder
  }

  export type sequence_callsAvgOrderByAggregateInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
  }

  export type sequence_callsMaxOrderByAggregateInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
    helperText?: SortOrder
  }

  export type sequence_callsMinOrderByAggregateInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
    helperText?: SortOrder
  }

  export type sequence_callsSumOrderByAggregateInput = {
    seqId?: SortOrder
    callId?: SortOrder
    startId?: SortOrder
    order?: SortOrder
  }

  export type StateListRelationFilter = {
    every?: stateWhereInput
    some?: stateWhereInput
    none?: stateWhereInput
  }

  export type stateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type countryCountOrderByAggregateInput = {
    code?: SortOrder
    name?: SortOrder
  }

  export type countryMaxOrderByAggregateInput = {
    code?: SortOrder
    name?: SortOrder
  }

  export type countryMinOrderByAggregateInput = {
    code?: SortOrder
    name?: SortOrder
  }

  export type Dance_groupListRelationFilter = {
    every?: dance_groupWhereInput
    some?: dance_groupWhereInput
    none?: dance_groupWhereInput
  }

  export type dance_groupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type dancerCountOrderByAggregateInput = {
    dancerId?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type dancerAvgOrderByAggregateInput = {
    dancerId?: SortOrder
  }

  export type dancerMaxOrderByAggregateInput = {
    dancerId?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type dancerMinOrderByAggregateInput = {
    dancerId?: SortOrder
    name?: SortOrder
    email?: SortOrder
  }

  export type dancerSumOrderByAggregateInput = {
    dancerId?: SortOrder
  }

  export type DancerScalarRelationFilter = {
    is?: dancerWhereInput
    isNot?: dancerWhereInput
  }

  export type GroupScalarRelationFilter = {
    is?: groupWhereInput
    isNot?: groupWhereInput
  }

  export type dance_groupDancerIdGroupIdCompoundUniqueInput = {
    dancerId: number
    groupId: string
  }

  export type dance_groupCountOrderByAggregateInput = {
    dancerId?: SortOrder
    groupId?: SortOrder
    side?: SortOrder
    proficency?: SortOrder
  }

  export type dance_groupAvgOrderByAggregateInput = {
    dancerId?: SortOrder
  }

  export type dance_groupMaxOrderByAggregateInput = {
    dancerId?: SortOrder
    groupId?: SortOrder
    side?: SortOrder
    proficency?: SortOrder
  }

  export type dance_groupMinOrderByAggregateInput = {
    dancerId?: SortOrder
    groupId?: SortOrder
    side?: SortOrder
    proficency?: SortOrder
  }

  export type dance_groupSumOrderByAggregateInput = {
    dancerId?: SortOrder
  }

  export type ProgramScalarRelationFilter = {
    is?: programWhereInput
    isNot?: programWhereInput
  }

  export type dance_programDancerIdProgramIdTypeProficencyCompoundUniqueInput = {
    dancerId: number
    programId: number
    type: string
    proficency: string
  }

  export type dance_programCountOrderByAggregateInput = {
    dancerId?: SortOrder
    programId?: SortOrder
    type?: SortOrder
    proficency?: SortOrder
  }

  export type dance_programAvgOrderByAggregateInput = {
    dancerId?: SortOrder
    programId?: SortOrder
  }

  export type dance_programMaxOrderByAggregateInput = {
    dancerId?: SortOrder
    programId?: SortOrder
    type?: SortOrder
    proficency?: SortOrder
  }

  export type dance_programMinOrderByAggregateInput = {
    dancerId?: SortOrder
    programId?: SortOrder
    type?: SortOrder
    proficency?: SortOrder
  }

  export type dance_programSumOrderByAggregateInput = {
    dancerId?: SortOrder
    programId?: SortOrder
  }

  export type StateScalarRelationFilter = {
    is?: stateWhereInput
    isNot?: stateWhereInput
  }

  export type Group_assocationsListRelationFilter = {
    every?: group_assocationsWhereInput
    some?: group_assocationsWhereInput
    none?: group_assocationsWhereInput
  }

  export type group_assocationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type groupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    countryCode?: SortOrder
    state?: SortOrder
  }

  export type groupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    countryCode?: SortOrder
    state?: SortOrder
  }

  export type groupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    countryCode?: SortOrder
    state?: SortOrder
  }

  export type group_assocationsGroupIdParentIdCompoundUniqueInput = {
    groupId: string
    parentId: string
  }

  export type group_assocationsCountOrderByAggregateInput = {
    groupId?: SortOrder
    parentId?: SortOrder
  }

  export type group_assocationsMaxOrderByAggregateInput = {
    groupId?: SortOrder
    parentId?: SortOrder
  }

  export type group_assocationsMinOrderByAggregateInput = {
    groupId?: SortOrder
    parentId?: SortOrder
  }

  export type CountryScalarRelationFilter = {
    is?: countryWhereInput
    isNot?: countryWhereInput
  }

  export type GroupListRelationFilter = {
    every?: groupWhereInput
    some?: groupWhereInput
    none?: groupWhereInput
  }

  export type groupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type stateCountryCodeStateCompoundUniqueInput = {
    countryCode: string
    state: string
  }

  export type stateCountOrderByAggregateInput = {
    countryCode?: SortOrder
    state?: SortOrder
    name?: SortOrder
  }

  export type stateMaxOrderByAggregateInput = {
    countryCode?: SortOrder
    state?: SortOrder
    name?: SortOrder
  }

  export type stateMinOrderByAggregateInput = {
    countryCode?: SortOrder
    state?: SortOrder
    name?: SortOrder
  }

  export type call_familyCreateNestedOneWithoutCallInput = {
    create?: XOR<call_familyCreateWithoutCallInput, call_familyUncheckedCreateWithoutCallInput>
    connectOrCreate?: call_familyCreateOrConnectWithoutCallInput
    connect?: call_familyWhereUniqueInput
  }

  export type call_formationCreateNestedManyWithoutCallInput = {
    create?: XOR<call_formationCreateWithoutCallInput, call_formationUncheckedCreateWithoutCallInput> | call_formationCreateWithoutCallInput[] | call_formationUncheckedCreateWithoutCallInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutCallInput | call_formationCreateOrConnectWithoutCallInput[]
    createMany?: call_formationCreateManyCallInputEnvelope
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
  }

  export type sequence_callsCreateNestedManyWithoutCallInput = {
    create?: XOR<sequence_callsCreateWithoutCallInput, sequence_callsUncheckedCreateWithoutCallInput> | sequence_callsCreateWithoutCallInput[] | sequence_callsUncheckedCreateWithoutCallInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutCallInput | sequence_callsCreateOrConnectWithoutCallInput[]
    createMany?: sequence_callsCreateManyCallInputEnvelope
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
  }

  export type call_formationUncheckedCreateNestedManyWithoutCallInput = {
    create?: XOR<call_formationCreateWithoutCallInput, call_formationUncheckedCreateWithoutCallInput> | call_formationCreateWithoutCallInput[] | call_formationUncheckedCreateWithoutCallInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutCallInput | call_formationCreateOrConnectWithoutCallInput[]
    createMany?: call_formationCreateManyCallInputEnvelope
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
  }

  export type sequence_callsUncheckedCreateNestedManyWithoutCallInput = {
    create?: XOR<sequence_callsCreateWithoutCallInput, sequence_callsUncheckedCreateWithoutCallInput> | sequence_callsCreateWithoutCallInput[] | sequence_callsUncheckedCreateWithoutCallInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutCallInput | sequence_callsCreateOrConnectWithoutCallInput[]
    createMany?: sequence_callsCreateManyCallInputEnvelope
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type call_familyUpdateOneWithoutCallNestedInput = {
    create?: XOR<call_familyCreateWithoutCallInput, call_familyUncheckedCreateWithoutCallInput>
    connectOrCreate?: call_familyCreateOrConnectWithoutCallInput
    upsert?: call_familyUpsertWithoutCallInput
    disconnect?: call_familyWhereInput | boolean
    delete?: call_familyWhereInput | boolean
    connect?: call_familyWhereUniqueInput
    update?: XOR<XOR<call_familyUpdateToOneWithWhereWithoutCallInput, call_familyUpdateWithoutCallInput>, call_familyUncheckedUpdateWithoutCallInput>
  }

  export type call_formationUpdateManyWithoutCallNestedInput = {
    create?: XOR<call_formationCreateWithoutCallInput, call_formationUncheckedCreateWithoutCallInput> | call_formationCreateWithoutCallInput[] | call_formationUncheckedCreateWithoutCallInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutCallInput | call_formationCreateOrConnectWithoutCallInput[]
    upsert?: call_formationUpsertWithWhereUniqueWithoutCallInput | call_formationUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: call_formationCreateManyCallInputEnvelope
    set?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    disconnect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    delete?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    update?: call_formationUpdateWithWhereUniqueWithoutCallInput | call_formationUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: call_formationUpdateManyWithWhereWithoutCallInput | call_formationUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
  }

  export type sequence_callsUpdateManyWithoutCallNestedInput = {
    create?: XOR<sequence_callsCreateWithoutCallInput, sequence_callsUncheckedCreateWithoutCallInput> | sequence_callsCreateWithoutCallInput[] | sequence_callsUncheckedCreateWithoutCallInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutCallInput | sequence_callsCreateOrConnectWithoutCallInput[]
    upsert?: sequence_callsUpsertWithWhereUniqueWithoutCallInput | sequence_callsUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: sequence_callsCreateManyCallInputEnvelope
    set?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    disconnect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    delete?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    update?: sequence_callsUpdateWithWhereUniqueWithoutCallInput | sequence_callsUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: sequence_callsUpdateManyWithWhereWithoutCallInput | sequence_callsUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type call_formationUncheckedUpdateManyWithoutCallNestedInput = {
    create?: XOR<call_formationCreateWithoutCallInput, call_formationUncheckedCreateWithoutCallInput> | call_formationCreateWithoutCallInput[] | call_formationUncheckedCreateWithoutCallInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutCallInput | call_formationCreateOrConnectWithoutCallInput[]
    upsert?: call_formationUpsertWithWhereUniqueWithoutCallInput | call_formationUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: call_formationCreateManyCallInputEnvelope
    set?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    disconnect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    delete?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    update?: call_formationUpdateWithWhereUniqueWithoutCallInput | call_formationUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: call_formationUpdateManyWithWhereWithoutCallInput | call_formationUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
  }

  export type sequence_callsUncheckedUpdateManyWithoutCallNestedInput = {
    create?: XOR<sequence_callsCreateWithoutCallInput, sequence_callsUncheckedCreateWithoutCallInput> | sequence_callsCreateWithoutCallInput[] | sequence_callsUncheckedCreateWithoutCallInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutCallInput | sequence_callsCreateOrConnectWithoutCallInput[]
    upsert?: sequence_callsUpsertWithWhereUniqueWithoutCallInput | sequence_callsUpsertWithWhereUniqueWithoutCallInput[]
    createMany?: sequence_callsCreateManyCallInputEnvelope
    set?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    disconnect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    delete?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    update?: sequence_callsUpdateWithWhereUniqueWithoutCallInput | sequence_callsUpdateWithWhereUniqueWithoutCallInput[]
    updateMany?: sequence_callsUpdateManyWithWhereWithoutCallInput | sequence_callsUpdateManyWithWhereWithoutCallInput[]
    deleteMany?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
  }

  export type callCreateNestedManyWithoutCallFamilyInput = {
    create?: XOR<callCreateWithoutCallFamilyInput, callUncheckedCreateWithoutCallFamilyInput> | callCreateWithoutCallFamilyInput[] | callUncheckedCreateWithoutCallFamilyInput[]
    connectOrCreate?: callCreateOrConnectWithoutCallFamilyInput | callCreateOrConnectWithoutCallFamilyInput[]
    createMany?: callCreateManyCallFamilyInputEnvelope
    connect?: callWhereUniqueInput | callWhereUniqueInput[]
  }

  export type callUncheckedCreateNestedManyWithoutCallFamilyInput = {
    create?: XOR<callCreateWithoutCallFamilyInput, callUncheckedCreateWithoutCallFamilyInput> | callCreateWithoutCallFamilyInput[] | callUncheckedCreateWithoutCallFamilyInput[]
    connectOrCreate?: callCreateOrConnectWithoutCallFamilyInput | callCreateOrConnectWithoutCallFamilyInput[]
    createMany?: callCreateManyCallFamilyInputEnvelope
    connect?: callWhereUniqueInput | callWhereUniqueInput[]
  }

  export type callUpdateManyWithoutCallFamilyNestedInput = {
    create?: XOR<callCreateWithoutCallFamilyInput, callUncheckedCreateWithoutCallFamilyInput> | callCreateWithoutCallFamilyInput[] | callUncheckedCreateWithoutCallFamilyInput[]
    connectOrCreate?: callCreateOrConnectWithoutCallFamilyInput | callCreateOrConnectWithoutCallFamilyInput[]
    upsert?: callUpsertWithWhereUniqueWithoutCallFamilyInput | callUpsertWithWhereUniqueWithoutCallFamilyInput[]
    createMany?: callCreateManyCallFamilyInputEnvelope
    set?: callWhereUniqueInput | callWhereUniqueInput[]
    disconnect?: callWhereUniqueInput | callWhereUniqueInput[]
    delete?: callWhereUniqueInput | callWhereUniqueInput[]
    connect?: callWhereUniqueInput | callWhereUniqueInput[]
    update?: callUpdateWithWhereUniqueWithoutCallFamilyInput | callUpdateWithWhereUniqueWithoutCallFamilyInput[]
    updateMany?: callUpdateManyWithWhereWithoutCallFamilyInput | callUpdateManyWithWhereWithoutCallFamilyInput[]
    deleteMany?: callScalarWhereInput | callScalarWhereInput[]
  }

  export type callUncheckedUpdateManyWithoutCallFamilyNestedInput = {
    create?: XOR<callCreateWithoutCallFamilyInput, callUncheckedCreateWithoutCallFamilyInput> | callCreateWithoutCallFamilyInput[] | callUncheckedCreateWithoutCallFamilyInput[]
    connectOrCreate?: callCreateOrConnectWithoutCallFamilyInput | callCreateOrConnectWithoutCallFamilyInput[]
    upsert?: callUpsertWithWhereUniqueWithoutCallFamilyInput | callUpsertWithWhereUniqueWithoutCallFamilyInput[]
    createMany?: callCreateManyCallFamilyInputEnvelope
    set?: callWhereUniqueInput | callWhereUniqueInput[]
    disconnect?: callWhereUniqueInput | callWhereUniqueInput[]
    delete?: callWhereUniqueInput | callWhereUniqueInput[]
    connect?: callWhereUniqueInput | callWhereUniqueInput[]
    update?: callUpdateWithWhereUniqueWithoutCallFamilyInput | callUpdateWithWhereUniqueWithoutCallFamilyInput[]
    updateMany?: callUpdateManyWithWhereWithoutCallFamilyInput | callUpdateManyWithWhereWithoutCallFamilyInput[]
    deleteMany?: callScalarWhereInput | callScalarWhereInput[]
  }

  export type callCreateNestedOneWithoutFormationsInput = {
    create?: XOR<callCreateWithoutFormationsInput, callUncheckedCreateWithoutFormationsInput>
    connectOrCreate?: callCreateOrConnectWithoutFormationsInput
    connect?: callWhereUniqueInput
  }

  export type formationCreateNestedOneWithoutCallStartInput = {
    create?: XOR<formationCreateWithoutCallStartInput, formationUncheckedCreateWithoutCallStartInput>
    connectOrCreate?: formationCreateOrConnectWithoutCallStartInput
    connect?: formationWhereUniqueInput
  }

  export type formationCreateNestedOneWithoutCallEndingInput = {
    create?: XOR<formationCreateWithoutCallEndingInput, formationUncheckedCreateWithoutCallEndingInput>
    connectOrCreate?: formationCreateOrConnectWithoutCallEndingInput
    connect?: formationWhereUniqueInput
  }

  export type callUpdateOneRequiredWithoutFormationsNestedInput = {
    create?: XOR<callCreateWithoutFormationsInput, callUncheckedCreateWithoutFormationsInput>
    connectOrCreate?: callCreateOrConnectWithoutFormationsInput
    upsert?: callUpsertWithoutFormationsInput
    connect?: callWhereUniqueInput
    update?: XOR<XOR<callUpdateToOneWithWhereWithoutFormationsInput, callUpdateWithoutFormationsInput>, callUncheckedUpdateWithoutFormationsInput>
  }

  export type formationUpdateOneRequiredWithoutCallStartNestedInput = {
    create?: XOR<formationCreateWithoutCallStartInput, formationUncheckedCreateWithoutCallStartInput>
    connectOrCreate?: formationCreateOrConnectWithoutCallStartInput
    upsert?: formationUpsertWithoutCallStartInput
    connect?: formationWhereUniqueInput
    update?: XOR<XOR<formationUpdateToOneWithWhereWithoutCallStartInput, formationUpdateWithoutCallStartInput>, formationUncheckedUpdateWithoutCallStartInput>
  }

  export type formationUpdateOneRequiredWithoutCallEndingNestedInput = {
    create?: XOR<formationCreateWithoutCallEndingInput, formationUncheckedCreateWithoutCallEndingInput>
    connectOrCreate?: formationCreateOrConnectWithoutCallEndingInput
    upsert?: formationUpsertWithoutCallEndingInput
    connect?: formationWhereUniqueInput
    update?: XOR<XOR<formationUpdateToOneWithWhereWithoutCallEndingInput, formationUpdateWithoutCallEndingInput>, formationUncheckedUpdateWithoutCallEndingInput>
  }

  export type call_formationCreateNestedManyWithoutStartFormInput = {
    create?: XOR<call_formationCreateWithoutStartFormInput, call_formationUncheckedCreateWithoutStartFormInput> | call_formationCreateWithoutStartFormInput[] | call_formationUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutStartFormInput | call_formationCreateOrConnectWithoutStartFormInput[]
    createMany?: call_formationCreateManyStartFormInputEnvelope
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
  }

  export type call_formationCreateNestedManyWithoutEndFormInput = {
    create?: XOR<call_formationCreateWithoutEndFormInput, call_formationUncheckedCreateWithoutEndFormInput> | call_formationCreateWithoutEndFormInput[] | call_formationUncheckedCreateWithoutEndFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutEndFormInput | call_formationCreateOrConnectWithoutEndFormInput[]
    createMany?: call_formationCreateManyEndFormInputEnvelope
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
  }

  export type sequence_callsCreateNestedManyWithoutStartFormInput = {
    create?: XOR<sequence_callsCreateWithoutStartFormInput, sequence_callsUncheckedCreateWithoutStartFormInput> | sequence_callsCreateWithoutStartFormInput[] | sequence_callsUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutStartFormInput | sequence_callsCreateOrConnectWithoutStartFormInput[]
    createMany?: sequence_callsCreateManyStartFormInputEnvelope
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
  }

  export type call_formationUncheckedCreateNestedManyWithoutStartFormInput = {
    create?: XOR<call_formationCreateWithoutStartFormInput, call_formationUncheckedCreateWithoutStartFormInput> | call_formationCreateWithoutStartFormInput[] | call_formationUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutStartFormInput | call_formationCreateOrConnectWithoutStartFormInput[]
    createMany?: call_formationCreateManyStartFormInputEnvelope
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
  }

  export type call_formationUncheckedCreateNestedManyWithoutEndFormInput = {
    create?: XOR<call_formationCreateWithoutEndFormInput, call_formationUncheckedCreateWithoutEndFormInput> | call_formationCreateWithoutEndFormInput[] | call_formationUncheckedCreateWithoutEndFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutEndFormInput | call_formationCreateOrConnectWithoutEndFormInput[]
    createMany?: call_formationCreateManyEndFormInputEnvelope
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
  }

  export type sequence_callsUncheckedCreateNestedManyWithoutStartFormInput = {
    create?: XOR<sequence_callsCreateWithoutStartFormInput, sequence_callsUncheckedCreateWithoutStartFormInput> | sequence_callsCreateWithoutStartFormInput[] | sequence_callsUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutStartFormInput | sequence_callsCreateOrConnectWithoutStartFormInput[]
    createMany?: sequence_callsCreateManyStartFormInputEnvelope
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
  }

  export type call_formationUpdateManyWithoutStartFormNestedInput = {
    create?: XOR<call_formationCreateWithoutStartFormInput, call_formationUncheckedCreateWithoutStartFormInput> | call_formationCreateWithoutStartFormInput[] | call_formationUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutStartFormInput | call_formationCreateOrConnectWithoutStartFormInput[]
    upsert?: call_formationUpsertWithWhereUniqueWithoutStartFormInput | call_formationUpsertWithWhereUniqueWithoutStartFormInput[]
    createMany?: call_formationCreateManyStartFormInputEnvelope
    set?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    disconnect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    delete?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    update?: call_formationUpdateWithWhereUniqueWithoutStartFormInput | call_formationUpdateWithWhereUniqueWithoutStartFormInput[]
    updateMany?: call_formationUpdateManyWithWhereWithoutStartFormInput | call_formationUpdateManyWithWhereWithoutStartFormInput[]
    deleteMany?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
  }

  export type call_formationUpdateManyWithoutEndFormNestedInput = {
    create?: XOR<call_formationCreateWithoutEndFormInput, call_formationUncheckedCreateWithoutEndFormInput> | call_formationCreateWithoutEndFormInput[] | call_formationUncheckedCreateWithoutEndFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutEndFormInput | call_formationCreateOrConnectWithoutEndFormInput[]
    upsert?: call_formationUpsertWithWhereUniqueWithoutEndFormInput | call_formationUpsertWithWhereUniqueWithoutEndFormInput[]
    createMany?: call_formationCreateManyEndFormInputEnvelope
    set?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    disconnect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    delete?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    update?: call_formationUpdateWithWhereUniqueWithoutEndFormInput | call_formationUpdateWithWhereUniqueWithoutEndFormInput[]
    updateMany?: call_formationUpdateManyWithWhereWithoutEndFormInput | call_formationUpdateManyWithWhereWithoutEndFormInput[]
    deleteMany?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
  }

  export type sequence_callsUpdateManyWithoutStartFormNestedInput = {
    create?: XOR<sequence_callsCreateWithoutStartFormInput, sequence_callsUncheckedCreateWithoutStartFormInput> | sequence_callsCreateWithoutStartFormInput[] | sequence_callsUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutStartFormInput | sequence_callsCreateOrConnectWithoutStartFormInput[]
    upsert?: sequence_callsUpsertWithWhereUniqueWithoutStartFormInput | sequence_callsUpsertWithWhereUniqueWithoutStartFormInput[]
    createMany?: sequence_callsCreateManyStartFormInputEnvelope
    set?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    disconnect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    delete?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    update?: sequence_callsUpdateWithWhereUniqueWithoutStartFormInput | sequence_callsUpdateWithWhereUniqueWithoutStartFormInput[]
    updateMany?: sequence_callsUpdateManyWithWhereWithoutStartFormInput | sequence_callsUpdateManyWithWhereWithoutStartFormInput[]
    deleteMany?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
  }

  export type call_formationUncheckedUpdateManyWithoutStartFormNestedInput = {
    create?: XOR<call_formationCreateWithoutStartFormInput, call_formationUncheckedCreateWithoutStartFormInput> | call_formationCreateWithoutStartFormInput[] | call_formationUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutStartFormInput | call_formationCreateOrConnectWithoutStartFormInput[]
    upsert?: call_formationUpsertWithWhereUniqueWithoutStartFormInput | call_formationUpsertWithWhereUniqueWithoutStartFormInput[]
    createMany?: call_formationCreateManyStartFormInputEnvelope
    set?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    disconnect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    delete?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    update?: call_formationUpdateWithWhereUniqueWithoutStartFormInput | call_formationUpdateWithWhereUniqueWithoutStartFormInput[]
    updateMany?: call_formationUpdateManyWithWhereWithoutStartFormInput | call_formationUpdateManyWithWhereWithoutStartFormInput[]
    deleteMany?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
  }

  export type call_formationUncheckedUpdateManyWithoutEndFormNestedInput = {
    create?: XOR<call_formationCreateWithoutEndFormInput, call_formationUncheckedCreateWithoutEndFormInput> | call_formationCreateWithoutEndFormInput[] | call_formationUncheckedCreateWithoutEndFormInput[]
    connectOrCreate?: call_formationCreateOrConnectWithoutEndFormInput | call_formationCreateOrConnectWithoutEndFormInput[]
    upsert?: call_formationUpsertWithWhereUniqueWithoutEndFormInput | call_formationUpsertWithWhereUniqueWithoutEndFormInput[]
    createMany?: call_formationCreateManyEndFormInputEnvelope
    set?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    disconnect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    delete?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    connect?: call_formationWhereUniqueInput | call_formationWhereUniqueInput[]
    update?: call_formationUpdateWithWhereUniqueWithoutEndFormInput | call_formationUpdateWithWhereUniqueWithoutEndFormInput[]
    updateMany?: call_formationUpdateManyWithWhereWithoutEndFormInput | call_formationUpdateManyWithWhereWithoutEndFormInput[]
    deleteMany?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
  }

  export type sequence_callsUncheckedUpdateManyWithoutStartFormNestedInput = {
    create?: XOR<sequence_callsCreateWithoutStartFormInput, sequence_callsUncheckedCreateWithoutStartFormInput> | sequence_callsCreateWithoutStartFormInput[] | sequence_callsUncheckedCreateWithoutStartFormInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutStartFormInput | sequence_callsCreateOrConnectWithoutStartFormInput[]
    upsert?: sequence_callsUpsertWithWhereUniqueWithoutStartFormInput | sequence_callsUpsertWithWhereUniqueWithoutStartFormInput[]
    createMany?: sequence_callsCreateManyStartFormInputEnvelope
    set?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    disconnect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    delete?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    update?: sequence_callsUpdateWithWhereUniqueWithoutStartFormInput | sequence_callsUpdateWithWhereUniqueWithoutStartFormInput[]
    updateMany?: sequence_callsUpdateManyWithWhereWithoutStartFormInput | sequence_callsUpdateManyWithWhereWithoutStartFormInput[]
    deleteMany?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
  }

  export type dance_programCreateNestedManyWithoutProgramInput = {
    create?: XOR<dance_programCreateWithoutProgramInput, dance_programUncheckedCreateWithoutProgramInput> | dance_programCreateWithoutProgramInput[] | dance_programUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutProgramInput | dance_programCreateOrConnectWithoutProgramInput[]
    createMany?: dance_programCreateManyProgramInputEnvelope
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
  }

  export type dance_programUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<dance_programCreateWithoutProgramInput, dance_programUncheckedCreateWithoutProgramInput> | dance_programCreateWithoutProgramInput[] | dance_programUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutProgramInput | dance_programCreateOrConnectWithoutProgramInput[]
    createMany?: dance_programCreateManyProgramInputEnvelope
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
  }

  export type dance_programUpdateManyWithoutProgramNestedInput = {
    create?: XOR<dance_programCreateWithoutProgramInput, dance_programUncheckedCreateWithoutProgramInput> | dance_programCreateWithoutProgramInput[] | dance_programUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutProgramInput | dance_programCreateOrConnectWithoutProgramInput[]
    upsert?: dance_programUpsertWithWhereUniqueWithoutProgramInput | dance_programUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: dance_programCreateManyProgramInputEnvelope
    set?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    disconnect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    delete?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    update?: dance_programUpdateWithWhereUniqueWithoutProgramInput | dance_programUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: dance_programUpdateManyWithWhereWithoutProgramInput | dance_programUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: dance_programScalarWhereInput | dance_programScalarWhereInput[]
  }

  export type dance_programUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<dance_programCreateWithoutProgramInput, dance_programUncheckedCreateWithoutProgramInput> | dance_programCreateWithoutProgramInput[] | dance_programUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutProgramInput | dance_programCreateOrConnectWithoutProgramInput[]
    upsert?: dance_programUpsertWithWhereUniqueWithoutProgramInput | dance_programUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: dance_programCreateManyProgramInputEnvelope
    set?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    disconnect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    delete?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    update?: dance_programUpdateWithWhereUniqueWithoutProgramInput | dance_programUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: dance_programUpdateManyWithWhereWithoutProgramInput | dance_programUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: dance_programScalarWhereInput | dance_programScalarWhereInput[]
  }

  export type sequence_callsCreateNestedManyWithoutSequenceInput = {
    create?: XOR<sequence_callsCreateWithoutSequenceInput, sequence_callsUncheckedCreateWithoutSequenceInput> | sequence_callsCreateWithoutSequenceInput[] | sequence_callsUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutSequenceInput | sequence_callsCreateOrConnectWithoutSequenceInput[]
    createMany?: sequence_callsCreateManySequenceInputEnvelope
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
  }

  export type sequence_callsUncheckedCreateNestedManyWithoutSequenceInput = {
    create?: XOR<sequence_callsCreateWithoutSequenceInput, sequence_callsUncheckedCreateWithoutSequenceInput> | sequence_callsCreateWithoutSequenceInput[] | sequence_callsUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutSequenceInput | sequence_callsCreateOrConnectWithoutSequenceInput[]
    createMany?: sequence_callsCreateManySequenceInputEnvelope
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
  }

  export type sequence_callsUpdateManyWithoutSequenceNestedInput = {
    create?: XOR<sequence_callsCreateWithoutSequenceInput, sequence_callsUncheckedCreateWithoutSequenceInput> | sequence_callsCreateWithoutSequenceInput[] | sequence_callsUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutSequenceInput | sequence_callsCreateOrConnectWithoutSequenceInput[]
    upsert?: sequence_callsUpsertWithWhereUniqueWithoutSequenceInput | sequence_callsUpsertWithWhereUniqueWithoutSequenceInput[]
    createMany?: sequence_callsCreateManySequenceInputEnvelope
    set?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    disconnect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    delete?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    update?: sequence_callsUpdateWithWhereUniqueWithoutSequenceInput | sequence_callsUpdateWithWhereUniqueWithoutSequenceInput[]
    updateMany?: sequence_callsUpdateManyWithWhereWithoutSequenceInput | sequence_callsUpdateManyWithWhereWithoutSequenceInput[]
    deleteMany?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
  }

  export type sequence_callsUncheckedUpdateManyWithoutSequenceNestedInput = {
    create?: XOR<sequence_callsCreateWithoutSequenceInput, sequence_callsUncheckedCreateWithoutSequenceInput> | sequence_callsCreateWithoutSequenceInput[] | sequence_callsUncheckedCreateWithoutSequenceInput[]
    connectOrCreate?: sequence_callsCreateOrConnectWithoutSequenceInput | sequence_callsCreateOrConnectWithoutSequenceInput[]
    upsert?: sequence_callsUpsertWithWhereUniqueWithoutSequenceInput | sequence_callsUpsertWithWhereUniqueWithoutSequenceInput[]
    createMany?: sequence_callsCreateManySequenceInputEnvelope
    set?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    disconnect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    delete?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    connect?: sequence_callsWhereUniqueInput | sequence_callsWhereUniqueInput[]
    update?: sequence_callsUpdateWithWhereUniqueWithoutSequenceInput | sequence_callsUpdateWithWhereUniqueWithoutSequenceInput[]
    updateMany?: sequence_callsUpdateManyWithWhereWithoutSequenceInput | sequence_callsUpdateManyWithWhereWithoutSequenceInput[]
    deleteMany?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
  }

  export type sequenceCreateNestedOneWithoutCallsInput = {
    create?: XOR<sequenceCreateWithoutCallsInput, sequenceUncheckedCreateWithoutCallsInput>
    connectOrCreate?: sequenceCreateOrConnectWithoutCallsInput
    connect?: sequenceWhereUniqueInput
  }

  export type callCreateNestedOneWithoutSequencesInput = {
    create?: XOR<callCreateWithoutSequencesInput, callUncheckedCreateWithoutSequencesInput>
    connectOrCreate?: callCreateOrConnectWithoutSequencesInput
    connect?: callWhereUniqueInput
  }

  export type formationCreateNestedOneWithoutSequencesInput = {
    create?: XOR<formationCreateWithoutSequencesInput, formationUncheckedCreateWithoutSequencesInput>
    connectOrCreate?: formationCreateOrConnectWithoutSequencesInput
    connect?: formationWhereUniqueInput
  }

  export type sequenceUpdateOneRequiredWithoutCallsNestedInput = {
    create?: XOR<sequenceCreateWithoutCallsInput, sequenceUncheckedCreateWithoutCallsInput>
    connectOrCreate?: sequenceCreateOrConnectWithoutCallsInput
    upsert?: sequenceUpsertWithoutCallsInput
    connect?: sequenceWhereUniqueInput
    update?: XOR<XOR<sequenceUpdateToOneWithWhereWithoutCallsInput, sequenceUpdateWithoutCallsInput>, sequenceUncheckedUpdateWithoutCallsInput>
  }

  export type callUpdateOneRequiredWithoutSequencesNestedInput = {
    create?: XOR<callCreateWithoutSequencesInput, callUncheckedCreateWithoutSequencesInput>
    connectOrCreate?: callCreateOrConnectWithoutSequencesInput
    upsert?: callUpsertWithoutSequencesInput
    connect?: callWhereUniqueInput
    update?: XOR<XOR<callUpdateToOneWithWhereWithoutSequencesInput, callUpdateWithoutSequencesInput>, callUncheckedUpdateWithoutSequencesInput>
  }

  export type formationUpdateOneRequiredWithoutSequencesNestedInput = {
    create?: XOR<formationCreateWithoutSequencesInput, formationUncheckedCreateWithoutSequencesInput>
    connectOrCreate?: formationCreateOrConnectWithoutSequencesInput
    upsert?: formationUpsertWithoutSequencesInput
    connect?: formationWhereUniqueInput
    update?: XOR<XOR<formationUpdateToOneWithWhereWithoutSequencesInput, formationUpdateWithoutSequencesInput>, formationUncheckedUpdateWithoutSequencesInput>
  }

  export type stateCreateNestedManyWithoutCountryInput = {
    create?: XOR<stateCreateWithoutCountryInput, stateUncheckedCreateWithoutCountryInput> | stateCreateWithoutCountryInput[] | stateUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: stateCreateOrConnectWithoutCountryInput | stateCreateOrConnectWithoutCountryInput[]
    createMany?: stateCreateManyCountryInputEnvelope
    connect?: stateWhereUniqueInput | stateWhereUniqueInput[]
  }

  export type stateUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<stateCreateWithoutCountryInput, stateUncheckedCreateWithoutCountryInput> | stateCreateWithoutCountryInput[] | stateUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: stateCreateOrConnectWithoutCountryInput | stateCreateOrConnectWithoutCountryInput[]
    createMany?: stateCreateManyCountryInputEnvelope
    connect?: stateWhereUniqueInput | stateWhereUniqueInput[]
  }

  export type stateUpdateManyWithoutCountryNestedInput = {
    create?: XOR<stateCreateWithoutCountryInput, stateUncheckedCreateWithoutCountryInput> | stateCreateWithoutCountryInput[] | stateUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: stateCreateOrConnectWithoutCountryInput | stateCreateOrConnectWithoutCountryInput[]
    upsert?: stateUpsertWithWhereUniqueWithoutCountryInput | stateUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: stateCreateManyCountryInputEnvelope
    set?: stateWhereUniqueInput | stateWhereUniqueInput[]
    disconnect?: stateWhereUniqueInput | stateWhereUniqueInput[]
    delete?: stateWhereUniqueInput | stateWhereUniqueInput[]
    connect?: stateWhereUniqueInput | stateWhereUniqueInput[]
    update?: stateUpdateWithWhereUniqueWithoutCountryInput | stateUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: stateUpdateManyWithWhereWithoutCountryInput | stateUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: stateScalarWhereInput | stateScalarWhereInput[]
  }

  export type stateUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<stateCreateWithoutCountryInput, stateUncheckedCreateWithoutCountryInput> | stateCreateWithoutCountryInput[] | stateUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: stateCreateOrConnectWithoutCountryInput | stateCreateOrConnectWithoutCountryInput[]
    upsert?: stateUpsertWithWhereUniqueWithoutCountryInput | stateUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: stateCreateManyCountryInputEnvelope
    set?: stateWhereUniqueInput | stateWhereUniqueInput[]
    disconnect?: stateWhereUniqueInput | stateWhereUniqueInput[]
    delete?: stateWhereUniqueInput | stateWhereUniqueInput[]
    connect?: stateWhereUniqueInput | stateWhereUniqueInput[]
    update?: stateUpdateWithWhereUniqueWithoutCountryInput | stateUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: stateUpdateManyWithWhereWithoutCountryInput | stateUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: stateScalarWhereInput | stateScalarWhereInput[]
  }

  export type dance_groupCreateNestedManyWithoutDancerInput = {
    create?: XOR<dance_groupCreateWithoutDancerInput, dance_groupUncheckedCreateWithoutDancerInput> | dance_groupCreateWithoutDancerInput[] | dance_groupUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutDancerInput | dance_groupCreateOrConnectWithoutDancerInput[]
    createMany?: dance_groupCreateManyDancerInputEnvelope
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
  }

  export type dance_programCreateNestedManyWithoutDancerInput = {
    create?: XOR<dance_programCreateWithoutDancerInput, dance_programUncheckedCreateWithoutDancerInput> | dance_programCreateWithoutDancerInput[] | dance_programUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutDancerInput | dance_programCreateOrConnectWithoutDancerInput[]
    createMany?: dance_programCreateManyDancerInputEnvelope
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
  }

  export type dance_groupUncheckedCreateNestedManyWithoutDancerInput = {
    create?: XOR<dance_groupCreateWithoutDancerInput, dance_groupUncheckedCreateWithoutDancerInput> | dance_groupCreateWithoutDancerInput[] | dance_groupUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutDancerInput | dance_groupCreateOrConnectWithoutDancerInput[]
    createMany?: dance_groupCreateManyDancerInputEnvelope
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
  }

  export type dance_programUncheckedCreateNestedManyWithoutDancerInput = {
    create?: XOR<dance_programCreateWithoutDancerInput, dance_programUncheckedCreateWithoutDancerInput> | dance_programCreateWithoutDancerInput[] | dance_programUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutDancerInput | dance_programCreateOrConnectWithoutDancerInput[]
    createMany?: dance_programCreateManyDancerInputEnvelope
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
  }

  export type dance_groupUpdateManyWithoutDancerNestedInput = {
    create?: XOR<dance_groupCreateWithoutDancerInput, dance_groupUncheckedCreateWithoutDancerInput> | dance_groupCreateWithoutDancerInput[] | dance_groupUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutDancerInput | dance_groupCreateOrConnectWithoutDancerInput[]
    upsert?: dance_groupUpsertWithWhereUniqueWithoutDancerInput | dance_groupUpsertWithWhereUniqueWithoutDancerInput[]
    createMany?: dance_groupCreateManyDancerInputEnvelope
    set?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    disconnect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    delete?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    update?: dance_groupUpdateWithWhereUniqueWithoutDancerInput | dance_groupUpdateWithWhereUniqueWithoutDancerInput[]
    updateMany?: dance_groupUpdateManyWithWhereWithoutDancerInput | dance_groupUpdateManyWithWhereWithoutDancerInput[]
    deleteMany?: dance_groupScalarWhereInput | dance_groupScalarWhereInput[]
  }

  export type dance_programUpdateManyWithoutDancerNestedInput = {
    create?: XOR<dance_programCreateWithoutDancerInput, dance_programUncheckedCreateWithoutDancerInput> | dance_programCreateWithoutDancerInput[] | dance_programUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutDancerInput | dance_programCreateOrConnectWithoutDancerInput[]
    upsert?: dance_programUpsertWithWhereUniqueWithoutDancerInput | dance_programUpsertWithWhereUniqueWithoutDancerInput[]
    createMany?: dance_programCreateManyDancerInputEnvelope
    set?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    disconnect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    delete?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    update?: dance_programUpdateWithWhereUniqueWithoutDancerInput | dance_programUpdateWithWhereUniqueWithoutDancerInput[]
    updateMany?: dance_programUpdateManyWithWhereWithoutDancerInput | dance_programUpdateManyWithWhereWithoutDancerInput[]
    deleteMany?: dance_programScalarWhereInput | dance_programScalarWhereInput[]
  }

  export type dance_groupUncheckedUpdateManyWithoutDancerNestedInput = {
    create?: XOR<dance_groupCreateWithoutDancerInput, dance_groupUncheckedCreateWithoutDancerInput> | dance_groupCreateWithoutDancerInput[] | dance_groupUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutDancerInput | dance_groupCreateOrConnectWithoutDancerInput[]
    upsert?: dance_groupUpsertWithWhereUniqueWithoutDancerInput | dance_groupUpsertWithWhereUniqueWithoutDancerInput[]
    createMany?: dance_groupCreateManyDancerInputEnvelope
    set?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    disconnect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    delete?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    update?: dance_groupUpdateWithWhereUniqueWithoutDancerInput | dance_groupUpdateWithWhereUniqueWithoutDancerInput[]
    updateMany?: dance_groupUpdateManyWithWhereWithoutDancerInput | dance_groupUpdateManyWithWhereWithoutDancerInput[]
    deleteMany?: dance_groupScalarWhereInput | dance_groupScalarWhereInput[]
  }

  export type dance_programUncheckedUpdateManyWithoutDancerNestedInput = {
    create?: XOR<dance_programCreateWithoutDancerInput, dance_programUncheckedCreateWithoutDancerInput> | dance_programCreateWithoutDancerInput[] | dance_programUncheckedCreateWithoutDancerInput[]
    connectOrCreate?: dance_programCreateOrConnectWithoutDancerInput | dance_programCreateOrConnectWithoutDancerInput[]
    upsert?: dance_programUpsertWithWhereUniqueWithoutDancerInput | dance_programUpsertWithWhereUniqueWithoutDancerInput[]
    createMany?: dance_programCreateManyDancerInputEnvelope
    set?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    disconnect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    delete?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    connect?: dance_programWhereUniqueInput | dance_programWhereUniqueInput[]
    update?: dance_programUpdateWithWhereUniqueWithoutDancerInput | dance_programUpdateWithWhereUniqueWithoutDancerInput[]
    updateMany?: dance_programUpdateManyWithWhereWithoutDancerInput | dance_programUpdateManyWithWhereWithoutDancerInput[]
    deleteMany?: dance_programScalarWhereInput | dance_programScalarWhereInput[]
  }

  export type dancerCreateNestedOneWithoutGroupsInput = {
    create?: XOR<dancerCreateWithoutGroupsInput, dancerUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: dancerCreateOrConnectWithoutGroupsInput
    connect?: dancerWhereUniqueInput
  }

  export type groupCreateNestedOneWithoutDancersInput = {
    create?: XOR<groupCreateWithoutDancersInput, groupUncheckedCreateWithoutDancersInput>
    connectOrCreate?: groupCreateOrConnectWithoutDancersInput
    connect?: groupWhereUniqueInput
  }

  export type dancerUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<dancerCreateWithoutGroupsInput, dancerUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: dancerCreateOrConnectWithoutGroupsInput
    upsert?: dancerUpsertWithoutGroupsInput
    connect?: dancerWhereUniqueInput
    update?: XOR<XOR<dancerUpdateToOneWithWhereWithoutGroupsInput, dancerUpdateWithoutGroupsInput>, dancerUncheckedUpdateWithoutGroupsInput>
  }

  export type groupUpdateOneRequiredWithoutDancersNestedInput = {
    create?: XOR<groupCreateWithoutDancersInput, groupUncheckedCreateWithoutDancersInput>
    connectOrCreate?: groupCreateOrConnectWithoutDancersInput
    upsert?: groupUpsertWithoutDancersInput
    connect?: groupWhereUniqueInput
    update?: XOR<XOR<groupUpdateToOneWithWhereWithoutDancersInput, groupUpdateWithoutDancersInput>, groupUncheckedUpdateWithoutDancersInput>
  }

  export type dancerCreateNestedOneWithoutLevelsInput = {
    create?: XOR<dancerCreateWithoutLevelsInput, dancerUncheckedCreateWithoutLevelsInput>
    connectOrCreate?: dancerCreateOrConnectWithoutLevelsInput
    connect?: dancerWhereUniqueInput
  }

  export type programCreateNestedOneWithoutDancersInput = {
    create?: XOR<programCreateWithoutDancersInput, programUncheckedCreateWithoutDancersInput>
    connectOrCreate?: programCreateOrConnectWithoutDancersInput
    connect?: programWhereUniqueInput
  }

  export type dancerUpdateOneRequiredWithoutLevelsNestedInput = {
    create?: XOR<dancerCreateWithoutLevelsInput, dancerUncheckedCreateWithoutLevelsInput>
    connectOrCreate?: dancerCreateOrConnectWithoutLevelsInput
    upsert?: dancerUpsertWithoutLevelsInput
    connect?: dancerWhereUniqueInput
    update?: XOR<XOR<dancerUpdateToOneWithWhereWithoutLevelsInput, dancerUpdateWithoutLevelsInput>, dancerUncheckedUpdateWithoutLevelsInput>
  }

  export type programUpdateOneRequiredWithoutDancersNestedInput = {
    create?: XOR<programCreateWithoutDancersInput, programUncheckedCreateWithoutDancersInput>
    connectOrCreate?: programCreateOrConnectWithoutDancersInput
    upsert?: programUpsertWithoutDancersInput
    connect?: programWhereUniqueInput
    update?: XOR<XOR<programUpdateToOneWithWhereWithoutDancersInput, programUpdateWithoutDancersInput>, programUncheckedUpdateWithoutDancersInput>
  }

  export type stateCreateNestedOneWithoutGroupsInput = {
    create?: XOR<stateCreateWithoutGroupsInput, stateUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: stateCreateOrConnectWithoutGroupsInput
    connect?: stateWhereUniqueInput
  }

  export type dance_groupCreateNestedManyWithoutGroupInput = {
    create?: XOR<dance_groupCreateWithoutGroupInput, dance_groupUncheckedCreateWithoutGroupInput> | dance_groupCreateWithoutGroupInput[] | dance_groupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutGroupInput | dance_groupCreateOrConnectWithoutGroupInput[]
    createMany?: dance_groupCreateManyGroupInputEnvelope
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
  }

  export type group_assocationsCreateNestedManyWithoutGroupInput = {
    create?: XOR<group_assocationsCreateWithoutGroupInput, group_assocationsUncheckedCreateWithoutGroupInput> | group_assocationsCreateWithoutGroupInput[] | group_assocationsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutGroupInput | group_assocationsCreateOrConnectWithoutGroupInput[]
    createMany?: group_assocationsCreateManyGroupInputEnvelope
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
  }

  export type group_assocationsCreateNestedManyWithoutParentInput = {
    create?: XOR<group_assocationsCreateWithoutParentInput, group_assocationsUncheckedCreateWithoutParentInput> | group_assocationsCreateWithoutParentInput[] | group_assocationsUncheckedCreateWithoutParentInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutParentInput | group_assocationsCreateOrConnectWithoutParentInput[]
    createMany?: group_assocationsCreateManyParentInputEnvelope
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
  }

  export type dance_groupUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<dance_groupCreateWithoutGroupInput, dance_groupUncheckedCreateWithoutGroupInput> | dance_groupCreateWithoutGroupInput[] | dance_groupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutGroupInput | dance_groupCreateOrConnectWithoutGroupInput[]
    createMany?: dance_groupCreateManyGroupInputEnvelope
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
  }

  export type group_assocationsUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<group_assocationsCreateWithoutGroupInput, group_assocationsUncheckedCreateWithoutGroupInput> | group_assocationsCreateWithoutGroupInput[] | group_assocationsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutGroupInput | group_assocationsCreateOrConnectWithoutGroupInput[]
    createMany?: group_assocationsCreateManyGroupInputEnvelope
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
  }

  export type group_assocationsUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<group_assocationsCreateWithoutParentInput, group_assocationsUncheckedCreateWithoutParentInput> | group_assocationsCreateWithoutParentInput[] | group_assocationsUncheckedCreateWithoutParentInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutParentInput | group_assocationsCreateOrConnectWithoutParentInput[]
    createMany?: group_assocationsCreateManyParentInputEnvelope
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
  }

  export type stateUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<stateCreateWithoutGroupsInput, stateUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: stateCreateOrConnectWithoutGroupsInput
    upsert?: stateUpsertWithoutGroupsInput
    connect?: stateWhereUniqueInput
    update?: XOR<XOR<stateUpdateToOneWithWhereWithoutGroupsInput, stateUpdateWithoutGroupsInput>, stateUncheckedUpdateWithoutGroupsInput>
  }

  export type dance_groupUpdateManyWithoutGroupNestedInput = {
    create?: XOR<dance_groupCreateWithoutGroupInput, dance_groupUncheckedCreateWithoutGroupInput> | dance_groupCreateWithoutGroupInput[] | dance_groupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutGroupInput | dance_groupCreateOrConnectWithoutGroupInput[]
    upsert?: dance_groupUpsertWithWhereUniqueWithoutGroupInput | dance_groupUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: dance_groupCreateManyGroupInputEnvelope
    set?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    disconnect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    delete?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    update?: dance_groupUpdateWithWhereUniqueWithoutGroupInput | dance_groupUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: dance_groupUpdateManyWithWhereWithoutGroupInput | dance_groupUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: dance_groupScalarWhereInput | dance_groupScalarWhereInput[]
  }

  export type group_assocationsUpdateManyWithoutGroupNestedInput = {
    create?: XOR<group_assocationsCreateWithoutGroupInput, group_assocationsUncheckedCreateWithoutGroupInput> | group_assocationsCreateWithoutGroupInput[] | group_assocationsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutGroupInput | group_assocationsCreateOrConnectWithoutGroupInput[]
    upsert?: group_assocationsUpsertWithWhereUniqueWithoutGroupInput | group_assocationsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: group_assocationsCreateManyGroupInputEnvelope
    set?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    disconnect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    delete?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    update?: group_assocationsUpdateWithWhereUniqueWithoutGroupInput | group_assocationsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: group_assocationsUpdateManyWithWhereWithoutGroupInput | group_assocationsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: group_assocationsScalarWhereInput | group_assocationsScalarWhereInput[]
  }

  export type group_assocationsUpdateManyWithoutParentNestedInput = {
    create?: XOR<group_assocationsCreateWithoutParentInput, group_assocationsUncheckedCreateWithoutParentInput> | group_assocationsCreateWithoutParentInput[] | group_assocationsUncheckedCreateWithoutParentInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutParentInput | group_assocationsCreateOrConnectWithoutParentInput[]
    upsert?: group_assocationsUpsertWithWhereUniqueWithoutParentInput | group_assocationsUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: group_assocationsCreateManyParentInputEnvelope
    set?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    disconnect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    delete?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    update?: group_assocationsUpdateWithWhereUniqueWithoutParentInput | group_assocationsUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: group_assocationsUpdateManyWithWhereWithoutParentInput | group_assocationsUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: group_assocationsScalarWhereInput | group_assocationsScalarWhereInput[]
  }

  export type dance_groupUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<dance_groupCreateWithoutGroupInput, dance_groupUncheckedCreateWithoutGroupInput> | dance_groupCreateWithoutGroupInput[] | dance_groupUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: dance_groupCreateOrConnectWithoutGroupInput | dance_groupCreateOrConnectWithoutGroupInput[]
    upsert?: dance_groupUpsertWithWhereUniqueWithoutGroupInput | dance_groupUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: dance_groupCreateManyGroupInputEnvelope
    set?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    disconnect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    delete?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    connect?: dance_groupWhereUniqueInput | dance_groupWhereUniqueInput[]
    update?: dance_groupUpdateWithWhereUniqueWithoutGroupInput | dance_groupUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: dance_groupUpdateManyWithWhereWithoutGroupInput | dance_groupUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: dance_groupScalarWhereInput | dance_groupScalarWhereInput[]
  }

  export type group_assocationsUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<group_assocationsCreateWithoutGroupInput, group_assocationsUncheckedCreateWithoutGroupInput> | group_assocationsCreateWithoutGroupInput[] | group_assocationsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutGroupInput | group_assocationsCreateOrConnectWithoutGroupInput[]
    upsert?: group_assocationsUpsertWithWhereUniqueWithoutGroupInput | group_assocationsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: group_assocationsCreateManyGroupInputEnvelope
    set?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    disconnect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    delete?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    update?: group_assocationsUpdateWithWhereUniqueWithoutGroupInput | group_assocationsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: group_assocationsUpdateManyWithWhereWithoutGroupInput | group_assocationsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: group_assocationsScalarWhereInput | group_assocationsScalarWhereInput[]
  }

  export type group_assocationsUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<group_assocationsCreateWithoutParentInput, group_assocationsUncheckedCreateWithoutParentInput> | group_assocationsCreateWithoutParentInput[] | group_assocationsUncheckedCreateWithoutParentInput[]
    connectOrCreate?: group_assocationsCreateOrConnectWithoutParentInput | group_assocationsCreateOrConnectWithoutParentInput[]
    upsert?: group_assocationsUpsertWithWhereUniqueWithoutParentInput | group_assocationsUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: group_assocationsCreateManyParentInputEnvelope
    set?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    disconnect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    delete?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    connect?: group_assocationsWhereUniqueInput | group_assocationsWhereUniqueInput[]
    update?: group_assocationsUpdateWithWhereUniqueWithoutParentInput | group_assocationsUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: group_assocationsUpdateManyWithWhereWithoutParentInput | group_assocationsUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: group_assocationsScalarWhereInput | group_assocationsScalarWhereInput[]
  }

  export type groupCreateNestedOneWithoutParentInput = {
    create?: XOR<groupCreateWithoutParentInput, groupUncheckedCreateWithoutParentInput>
    connectOrCreate?: groupCreateOrConnectWithoutParentInput
    connect?: groupWhereUniqueInput
  }

  export type groupCreateNestedOneWithoutChildInput = {
    create?: XOR<groupCreateWithoutChildInput, groupUncheckedCreateWithoutChildInput>
    connectOrCreate?: groupCreateOrConnectWithoutChildInput
    connect?: groupWhereUniqueInput
  }

  export type groupUpdateOneRequiredWithoutParentNestedInput = {
    create?: XOR<groupCreateWithoutParentInput, groupUncheckedCreateWithoutParentInput>
    connectOrCreate?: groupCreateOrConnectWithoutParentInput
    upsert?: groupUpsertWithoutParentInput
    connect?: groupWhereUniqueInput
    update?: XOR<XOR<groupUpdateToOneWithWhereWithoutParentInput, groupUpdateWithoutParentInput>, groupUncheckedUpdateWithoutParentInput>
  }

  export type groupUpdateOneRequiredWithoutChildNestedInput = {
    create?: XOR<groupCreateWithoutChildInput, groupUncheckedCreateWithoutChildInput>
    connectOrCreate?: groupCreateOrConnectWithoutChildInput
    upsert?: groupUpsertWithoutChildInput
    connect?: groupWhereUniqueInput
    update?: XOR<XOR<groupUpdateToOneWithWhereWithoutChildInput, groupUpdateWithoutChildInput>, groupUncheckedUpdateWithoutChildInput>
  }

  export type countryCreateNestedOneWithoutStatesInput = {
    create?: XOR<countryCreateWithoutStatesInput, countryUncheckedCreateWithoutStatesInput>
    connectOrCreate?: countryCreateOrConnectWithoutStatesInput
    connect?: countryWhereUniqueInput
  }

  export type groupCreateNestedManyWithoutCountryStateInput = {
    create?: XOR<groupCreateWithoutCountryStateInput, groupUncheckedCreateWithoutCountryStateInput> | groupCreateWithoutCountryStateInput[] | groupUncheckedCreateWithoutCountryStateInput[]
    connectOrCreate?: groupCreateOrConnectWithoutCountryStateInput | groupCreateOrConnectWithoutCountryStateInput[]
    createMany?: groupCreateManyCountryStateInputEnvelope
    connect?: groupWhereUniqueInput | groupWhereUniqueInput[]
  }

  export type groupUncheckedCreateNestedManyWithoutCountryStateInput = {
    create?: XOR<groupCreateWithoutCountryStateInput, groupUncheckedCreateWithoutCountryStateInput> | groupCreateWithoutCountryStateInput[] | groupUncheckedCreateWithoutCountryStateInput[]
    connectOrCreate?: groupCreateOrConnectWithoutCountryStateInput | groupCreateOrConnectWithoutCountryStateInput[]
    createMany?: groupCreateManyCountryStateInputEnvelope
    connect?: groupWhereUniqueInput | groupWhereUniqueInput[]
  }

  export type countryUpdateOneRequiredWithoutStatesNestedInput = {
    create?: XOR<countryCreateWithoutStatesInput, countryUncheckedCreateWithoutStatesInput>
    connectOrCreate?: countryCreateOrConnectWithoutStatesInput
    upsert?: countryUpsertWithoutStatesInput
    connect?: countryWhereUniqueInput
    update?: XOR<XOR<countryUpdateToOneWithWhereWithoutStatesInput, countryUpdateWithoutStatesInput>, countryUncheckedUpdateWithoutStatesInput>
  }

  export type groupUpdateManyWithoutCountryStateNestedInput = {
    create?: XOR<groupCreateWithoutCountryStateInput, groupUncheckedCreateWithoutCountryStateInput> | groupCreateWithoutCountryStateInput[] | groupUncheckedCreateWithoutCountryStateInput[]
    connectOrCreate?: groupCreateOrConnectWithoutCountryStateInput | groupCreateOrConnectWithoutCountryStateInput[]
    upsert?: groupUpsertWithWhereUniqueWithoutCountryStateInput | groupUpsertWithWhereUniqueWithoutCountryStateInput[]
    createMany?: groupCreateManyCountryStateInputEnvelope
    set?: groupWhereUniqueInput | groupWhereUniqueInput[]
    disconnect?: groupWhereUniqueInput | groupWhereUniqueInput[]
    delete?: groupWhereUniqueInput | groupWhereUniqueInput[]
    connect?: groupWhereUniqueInput | groupWhereUniqueInput[]
    update?: groupUpdateWithWhereUniqueWithoutCountryStateInput | groupUpdateWithWhereUniqueWithoutCountryStateInput[]
    updateMany?: groupUpdateManyWithWhereWithoutCountryStateInput | groupUpdateManyWithWhereWithoutCountryStateInput[]
    deleteMany?: groupScalarWhereInput | groupScalarWhereInput[]
  }

  export type groupUncheckedUpdateManyWithoutCountryStateNestedInput = {
    create?: XOR<groupCreateWithoutCountryStateInput, groupUncheckedCreateWithoutCountryStateInput> | groupCreateWithoutCountryStateInput[] | groupUncheckedCreateWithoutCountryStateInput[]
    connectOrCreate?: groupCreateOrConnectWithoutCountryStateInput | groupCreateOrConnectWithoutCountryStateInput[]
    upsert?: groupUpsertWithWhereUniqueWithoutCountryStateInput | groupUpsertWithWhereUniqueWithoutCountryStateInput[]
    createMany?: groupCreateManyCountryStateInputEnvelope
    set?: groupWhereUniqueInput | groupWhereUniqueInput[]
    disconnect?: groupWhereUniqueInput | groupWhereUniqueInput[]
    delete?: groupWhereUniqueInput | groupWhereUniqueInput[]
    connect?: groupWhereUniqueInput | groupWhereUniqueInput[]
    update?: groupUpdateWithWhereUniqueWithoutCountryStateInput | groupUpdateWithWhereUniqueWithoutCountryStateInput[]
    updateMany?: groupUpdateManyWithWhereWithoutCountryStateInput | groupUpdateManyWithWhereWithoutCountryStateInput[]
    deleteMany?: groupScalarWhereInput | groupScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type call_familyCreateWithoutCallInput = {
    name: string
  }

  export type call_familyUncheckedCreateWithoutCallInput = {
    familyId?: number
    name: string
  }

  export type call_familyCreateOrConnectWithoutCallInput = {
    where: call_familyWhereUniqueInput
    create: XOR<call_familyCreateWithoutCallInput, call_familyUncheckedCreateWithoutCallInput>
  }

  export type call_formationCreateWithoutCallInput = {
    startForm: formationCreateNestedOneWithoutCallStartInput
    endForm: formationCreateNestedOneWithoutCallEndingInput
  }

  export type call_formationUncheckedCreateWithoutCallInput = {
    startId: number
    endId: number
  }

  export type call_formationCreateOrConnectWithoutCallInput = {
    where: call_formationWhereUniqueInput
    create: XOR<call_formationCreateWithoutCallInput, call_formationUncheckedCreateWithoutCallInput>
  }

  export type call_formationCreateManyCallInputEnvelope = {
    data: call_formationCreateManyCallInput | call_formationCreateManyCallInput[]
    skipDuplicates?: boolean
  }

  export type sequence_callsCreateWithoutCallInput = {
    order: number
    helperText?: string | null
    sequence: sequenceCreateNestedOneWithoutCallsInput
    startForm: formationCreateNestedOneWithoutSequencesInput
  }

  export type sequence_callsUncheckedCreateWithoutCallInput = {
    seqId: number
    startId: number
    order: number
    helperText?: string | null
  }

  export type sequence_callsCreateOrConnectWithoutCallInput = {
    where: sequence_callsWhereUniqueInput
    create: XOR<sequence_callsCreateWithoutCallInput, sequence_callsUncheckedCreateWithoutCallInput>
  }

  export type sequence_callsCreateManyCallInputEnvelope = {
    data: sequence_callsCreateManyCallInput | sequence_callsCreateManyCallInput[]
    skipDuplicates?: boolean
  }

  export type call_familyUpsertWithoutCallInput = {
    update: XOR<call_familyUpdateWithoutCallInput, call_familyUncheckedUpdateWithoutCallInput>
    create: XOR<call_familyCreateWithoutCallInput, call_familyUncheckedCreateWithoutCallInput>
    where?: call_familyWhereInput
  }

  export type call_familyUpdateToOneWithWhereWithoutCallInput = {
    where?: call_familyWhereInput
    data: XOR<call_familyUpdateWithoutCallInput, call_familyUncheckedUpdateWithoutCallInput>
  }

  export type call_familyUpdateWithoutCallInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type call_familyUncheckedUpdateWithoutCallInput = {
    familyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type call_formationUpsertWithWhereUniqueWithoutCallInput = {
    where: call_formationWhereUniqueInput
    update: XOR<call_formationUpdateWithoutCallInput, call_formationUncheckedUpdateWithoutCallInput>
    create: XOR<call_formationCreateWithoutCallInput, call_formationUncheckedCreateWithoutCallInput>
  }

  export type call_formationUpdateWithWhereUniqueWithoutCallInput = {
    where: call_formationWhereUniqueInput
    data: XOR<call_formationUpdateWithoutCallInput, call_formationUncheckedUpdateWithoutCallInput>
  }

  export type call_formationUpdateManyWithWhereWithoutCallInput = {
    where: call_formationScalarWhereInput
    data: XOR<call_formationUpdateManyMutationInput, call_formationUncheckedUpdateManyWithoutCallInput>
  }

  export type call_formationScalarWhereInput = {
    AND?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
    OR?: call_formationScalarWhereInput[]
    NOT?: call_formationScalarWhereInput | call_formationScalarWhereInput[]
    callId?: IntFilter<"call_formation"> | number
    startId?: IntFilter<"call_formation"> | number
    endId?: IntFilter<"call_formation"> | number
  }

  export type sequence_callsUpsertWithWhereUniqueWithoutCallInput = {
    where: sequence_callsWhereUniqueInput
    update: XOR<sequence_callsUpdateWithoutCallInput, sequence_callsUncheckedUpdateWithoutCallInput>
    create: XOR<sequence_callsCreateWithoutCallInput, sequence_callsUncheckedCreateWithoutCallInput>
  }

  export type sequence_callsUpdateWithWhereUniqueWithoutCallInput = {
    where: sequence_callsWhereUniqueInput
    data: XOR<sequence_callsUpdateWithoutCallInput, sequence_callsUncheckedUpdateWithoutCallInput>
  }

  export type sequence_callsUpdateManyWithWhereWithoutCallInput = {
    where: sequence_callsScalarWhereInput
    data: XOR<sequence_callsUpdateManyMutationInput, sequence_callsUncheckedUpdateManyWithoutCallInput>
  }

  export type sequence_callsScalarWhereInput = {
    AND?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
    OR?: sequence_callsScalarWhereInput[]
    NOT?: sequence_callsScalarWhereInput | sequence_callsScalarWhereInput[]
    seqId?: IntFilter<"sequence_calls"> | number
    callId?: IntFilter<"sequence_calls"> | number
    startId?: IntFilter<"sequence_calls"> | number
    order?: IntFilter<"sequence_calls"> | number
    helperText?: StringNullableFilter<"sequence_calls"> | string | null
  }

  export type callCreateWithoutCallFamilyInput = {
    name: string
    tamSeq?: string | null
    formations?: call_formationCreateNestedManyWithoutCallInput
    sequences?: sequence_callsCreateNestedManyWithoutCallInput
  }

  export type callUncheckedCreateWithoutCallFamilyInput = {
    callId?: number
    name: string
    tamSeq?: string | null
    formations?: call_formationUncheckedCreateNestedManyWithoutCallInput
    sequences?: sequence_callsUncheckedCreateNestedManyWithoutCallInput
  }

  export type callCreateOrConnectWithoutCallFamilyInput = {
    where: callWhereUniqueInput
    create: XOR<callCreateWithoutCallFamilyInput, callUncheckedCreateWithoutCallFamilyInput>
  }

  export type callCreateManyCallFamilyInputEnvelope = {
    data: callCreateManyCallFamilyInput | callCreateManyCallFamilyInput[]
    skipDuplicates?: boolean
  }

  export type callUpsertWithWhereUniqueWithoutCallFamilyInput = {
    where: callWhereUniqueInput
    update: XOR<callUpdateWithoutCallFamilyInput, callUncheckedUpdateWithoutCallFamilyInput>
    create: XOR<callCreateWithoutCallFamilyInput, callUncheckedCreateWithoutCallFamilyInput>
  }

  export type callUpdateWithWhereUniqueWithoutCallFamilyInput = {
    where: callWhereUniqueInput
    data: XOR<callUpdateWithoutCallFamilyInput, callUncheckedUpdateWithoutCallFamilyInput>
  }

  export type callUpdateManyWithWhereWithoutCallFamilyInput = {
    where: callScalarWhereInput
    data: XOR<callUpdateManyMutationInput, callUncheckedUpdateManyWithoutCallFamilyInput>
  }

  export type callScalarWhereInput = {
    AND?: callScalarWhereInput | callScalarWhereInput[]
    OR?: callScalarWhereInput[]
    NOT?: callScalarWhereInput | callScalarWhereInput[]
    callId?: IntFilter<"call"> | number
    name?: StringFilter<"call"> | string
    tamSeq?: StringNullableFilter<"call"> | string | null
    familyId?: IntNullableFilter<"call"> | number | null
  }

  export type callCreateWithoutFormationsInput = {
    name: string
    tamSeq?: string | null
    callFamily?: call_familyCreateNestedOneWithoutCallInput
    sequences?: sequence_callsCreateNestedManyWithoutCallInput
  }

  export type callUncheckedCreateWithoutFormationsInput = {
    callId?: number
    name: string
    tamSeq?: string | null
    familyId?: number | null
    sequences?: sequence_callsUncheckedCreateNestedManyWithoutCallInput
  }

  export type callCreateOrConnectWithoutFormationsInput = {
    where: callWhereUniqueInput
    create: XOR<callCreateWithoutFormationsInput, callUncheckedCreateWithoutFormationsInput>
  }

  export type formationCreateWithoutCallStartInput = {
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callEnding?: call_formationCreateNestedManyWithoutEndFormInput
    sequences?: sequence_callsCreateNestedManyWithoutStartFormInput
  }

  export type formationUncheckedCreateWithoutCallStartInput = {
    formId?: number
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callEnding?: call_formationUncheckedCreateNestedManyWithoutEndFormInput
    sequences?: sequence_callsUncheckedCreateNestedManyWithoutStartFormInput
  }

  export type formationCreateOrConnectWithoutCallStartInput = {
    where: formationWhereUniqueInput
    create: XOR<formationCreateWithoutCallStartInput, formationUncheckedCreateWithoutCallStartInput>
  }

  export type formationCreateWithoutCallEndingInput = {
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callStart?: call_formationCreateNestedManyWithoutStartFormInput
    sequences?: sequence_callsCreateNestedManyWithoutStartFormInput
  }

  export type formationUncheckedCreateWithoutCallEndingInput = {
    formId?: number
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callStart?: call_formationUncheckedCreateNestedManyWithoutStartFormInput
    sequences?: sequence_callsUncheckedCreateNestedManyWithoutStartFormInput
  }

  export type formationCreateOrConnectWithoutCallEndingInput = {
    where: formationWhereUniqueInput
    create: XOR<formationCreateWithoutCallEndingInput, formationUncheckedCreateWithoutCallEndingInput>
  }

  export type callUpsertWithoutFormationsInput = {
    update: XOR<callUpdateWithoutFormationsInput, callUncheckedUpdateWithoutFormationsInput>
    create: XOR<callCreateWithoutFormationsInput, callUncheckedCreateWithoutFormationsInput>
    where?: callWhereInput
  }

  export type callUpdateToOneWithWhereWithoutFormationsInput = {
    where?: callWhereInput
    data: XOR<callUpdateWithoutFormationsInput, callUncheckedUpdateWithoutFormationsInput>
  }

  export type callUpdateWithoutFormationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    callFamily?: call_familyUpdateOneWithoutCallNestedInput
    sequences?: sequence_callsUpdateManyWithoutCallNestedInput
  }

  export type callUncheckedUpdateWithoutFormationsInput = {
    callId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: NullableIntFieldUpdateOperationsInput | number | null
    sequences?: sequence_callsUncheckedUpdateManyWithoutCallNestedInput
  }

  export type formationUpsertWithoutCallStartInput = {
    update: XOR<formationUpdateWithoutCallStartInput, formationUncheckedUpdateWithoutCallStartInput>
    create: XOR<formationCreateWithoutCallStartInput, formationUncheckedCreateWithoutCallStartInput>
    where?: formationWhereInput
  }

  export type formationUpdateToOneWithWhereWithoutCallStartInput = {
    where?: formationWhereInput
    data: XOR<formationUpdateWithoutCallStartInput, formationUncheckedUpdateWithoutCallStartInput>
  }

  export type formationUpdateWithoutCallStartInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callEnding?: call_formationUpdateManyWithoutEndFormNestedInput
    sequences?: sequence_callsUpdateManyWithoutStartFormNestedInput
  }

  export type formationUncheckedUpdateWithoutCallStartInput = {
    formId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callEnding?: call_formationUncheckedUpdateManyWithoutEndFormNestedInput
    sequences?: sequence_callsUncheckedUpdateManyWithoutStartFormNestedInput
  }

  export type formationUpsertWithoutCallEndingInput = {
    update: XOR<formationUpdateWithoutCallEndingInput, formationUncheckedUpdateWithoutCallEndingInput>
    create: XOR<formationCreateWithoutCallEndingInput, formationUncheckedCreateWithoutCallEndingInput>
    where?: formationWhereInput
  }

  export type formationUpdateToOneWithWhereWithoutCallEndingInput = {
    where?: formationWhereInput
    data: XOR<formationUpdateWithoutCallEndingInput, formationUncheckedUpdateWithoutCallEndingInput>
  }

  export type formationUpdateWithoutCallEndingInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callStart?: call_formationUpdateManyWithoutStartFormNestedInput
    sequences?: sequence_callsUpdateManyWithoutStartFormNestedInput
  }

  export type formationUncheckedUpdateWithoutCallEndingInput = {
    formId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callStart?: call_formationUncheckedUpdateManyWithoutStartFormNestedInput
    sequences?: sequence_callsUncheckedUpdateManyWithoutStartFormNestedInput
  }

  export type call_formationCreateWithoutStartFormInput = {
    call: callCreateNestedOneWithoutFormationsInput
    endForm: formationCreateNestedOneWithoutCallEndingInput
  }

  export type call_formationUncheckedCreateWithoutStartFormInput = {
    callId: number
    endId: number
  }

  export type call_formationCreateOrConnectWithoutStartFormInput = {
    where: call_formationWhereUniqueInput
    create: XOR<call_formationCreateWithoutStartFormInput, call_formationUncheckedCreateWithoutStartFormInput>
  }

  export type call_formationCreateManyStartFormInputEnvelope = {
    data: call_formationCreateManyStartFormInput | call_formationCreateManyStartFormInput[]
    skipDuplicates?: boolean
  }

  export type call_formationCreateWithoutEndFormInput = {
    call: callCreateNestedOneWithoutFormationsInput
    startForm: formationCreateNestedOneWithoutCallStartInput
  }

  export type call_formationUncheckedCreateWithoutEndFormInput = {
    callId: number
    startId: number
  }

  export type call_formationCreateOrConnectWithoutEndFormInput = {
    where: call_formationWhereUniqueInput
    create: XOR<call_formationCreateWithoutEndFormInput, call_formationUncheckedCreateWithoutEndFormInput>
  }

  export type call_formationCreateManyEndFormInputEnvelope = {
    data: call_formationCreateManyEndFormInput | call_formationCreateManyEndFormInput[]
    skipDuplicates?: boolean
  }

  export type sequence_callsCreateWithoutStartFormInput = {
    order: number
    helperText?: string | null
    sequence: sequenceCreateNestedOneWithoutCallsInput
    call: callCreateNestedOneWithoutSequencesInput
  }

  export type sequence_callsUncheckedCreateWithoutStartFormInput = {
    seqId: number
    callId: number
    order: number
    helperText?: string | null
  }

  export type sequence_callsCreateOrConnectWithoutStartFormInput = {
    where: sequence_callsWhereUniqueInput
    create: XOR<sequence_callsCreateWithoutStartFormInput, sequence_callsUncheckedCreateWithoutStartFormInput>
  }

  export type sequence_callsCreateManyStartFormInputEnvelope = {
    data: sequence_callsCreateManyStartFormInput | sequence_callsCreateManyStartFormInput[]
    skipDuplicates?: boolean
  }

  export type call_formationUpsertWithWhereUniqueWithoutStartFormInput = {
    where: call_formationWhereUniqueInput
    update: XOR<call_formationUpdateWithoutStartFormInput, call_formationUncheckedUpdateWithoutStartFormInput>
    create: XOR<call_formationCreateWithoutStartFormInput, call_formationUncheckedCreateWithoutStartFormInput>
  }

  export type call_formationUpdateWithWhereUniqueWithoutStartFormInput = {
    where: call_formationWhereUniqueInput
    data: XOR<call_formationUpdateWithoutStartFormInput, call_formationUncheckedUpdateWithoutStartFormInput>
  }

  export type call_formationUpdateManyWithWhereWithoutStartFormInput = {
    where: call_formationScalarWhereInput
    data: XOR<call_formationUpdateManyMutationInput, call_formationUncheckedUpdateManyWithoutStartFormInput>
  }

  export type call_formationUpsertWithWhereUniqueWithoutEndFormInput = {
    where: call_formationWhereUniqueInput
    update: XOR<call_formationUpdateWithoutEndFormInput, call_formationUncheckedUpdateWithoutEndFormInput>
    create: XOR<call_formationCreateWithoutEndFormInput, call_formationUncheckedCreateWithoutEndFormInput>
  }

  export type call_formationUpdateWithWhereUniqueWithoutEndFormInput = {
    where: call_formationWhereUniqueInput
    data: XOR<call_formationUpdateWithoutEndFormInput, call_formationUncheckedUpdateWithoutEndFormInput>
  }

  export type call_formationUpdateManyWithWhereWithoutEndFormInput = {
    where: call_formationScalarWhereInput
    data: XOR<call_formationUpdateManyMutationInput, call_formationUncheckedUpdateManyWithoutEndFormInput>
  }

  export type sequence_callsUpsertWithWhereUniqueWithoutStartFormInput = {
    where: sequence_callsWhereUniqueInput
    update: XOR<sequence_callsUpdateWithoutStartFormInput, sequence_callsUncheckedUpdateWithoutStartFormInput>
    create: XOR<sequence_callsCreateWithoutStartFormInput, sequence_callsUncheckedCreateWithoutStartFormInput>
  }

  export type sequence_callsUpdateWithWhereUniqueWithoutStartFormInput = {
    where: sequence_callsWhereUniqueInput
    data: XOR<sequence_callsUpdateWithoutStartFormInput, sequence_callsUncheckedUpdateWithoutStartFormInput>
  }

  export type sequence_callsUpdateManyWithWhereWithoutStartFormInput = {
    where: sequence_callsScalarWhereInput
    data: XOR<sequence_callsUpdateManyMutationInput, sequence_callsUncheckedUpdateManyWithoutStartFormInput>
  }

  export type dance_programCreateWithoutProgramInput = {
    type: string
    proficency: string
    dancer: dancerCreateNestedOneWithoutLevelsInput
  }

  export type dance_programUncheckedCreateWithoutProgramInput = {
    dancerId: number
    type: string
    proficency: string
  }

  export type dance_programCreateOrConnectWithoutProgramInput = {
    where: dance_programWhereUniqueInput
    create: XOR<dance_programCreateWithoutProgramInput, dance_programUncheckedCreateWithoutProgramInput>
  }

  export type dance_programCreateManyProgramInputEnvelope = {
    data: dance_programCreateManyProgramInput | dance_programCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type dance_programUpsertWithWhereUniqueWithoutProgramInput = {
    where: dance_programWhereUniqueInput
    update: XOR<dance_programUpdateWithoutProgramInput, dance_programUncheckedUpdateWithoutProgramInput>
    create: XOR<dance_programCreateWithoutProgramInput, dance_programUncheckedCreateWithoutProgramInput>
  }

  export type dance_programUpdateWithWhereUniqueWithoutProgramInput = {
    where: dance_programWhereUniqueInput
    data: XOR<dance_programUpdateWithoutProgramInput, dance_programUncheckedUpdateWithoutProgramInput>
  }

  export type dance_programUpdateManyWithWhereWithoutProgramInput = {
    where: dance_programScalarWhereInput
    data: XOR<dance_programUpdateManyMutationInput, dance_programUncheckedUpdateManyWithoutProgramInput>
  }

  export type dance_programScalarWhereInput = {
    AND?: dance_programScalarWhereInput | dance_programScalarWhereInput[]
    OR?: dance_programScalarWhereInput[]
    NOT?: dance_programScalarWhereInput | dance_programScalarWhereInput[]
    dancerId?: IntFilter<"dance_program"> | number
    programId?: IntFilter<"dance_program"> | number
    type?: StringFilter<"dance_program"> | string
    proficency?: StringFilter<"dance_program"> | string
  }

  export type sequence_callsCreateWithoutSequenceInput = {
    order: number
    helperText?: string | null
    call: callCreateNestedOneWithoutSequencesInput
    startForm: formationCreateNestedOneWithoutSequencesInput
  }

  export type sequence_callsUncheckedCreateWithoutSequenceInput = {
    callId: number
    startId: number
    order: number
    helperText?: string | null
  }

  export type sequence_callsCreateOrConnectWithoutSequenceInput = {
    where: sequence_callsWhereUniqueInput
    create: XOR<sequence_callsCreateWithoutSequenceInput, sequence_callsUncheckedCreateWithoutSequenceInput>
  }

  export type sequence_callsCreateManySequenceInputEnvelope = {
    data: sequence_callsCreateManySequenceInput | sequence_callsCreateManySequenceInput[]
    skipDuplicates?: boolean
  }

  export type sequence_callsUpsertWithWhereUniqueWithoutSequenceInput = {
    where: sequence_callsWhereUniqueInput
    update: XOR<sequence_callsUpdateWithoutSequenceInput, sequence_callsUncheckedUpdateWithoutSequenceInput>
    create: XOR<sequence_callsCreateWithoutSequenceInput, sequence_callsUncheckedCreateWithoutSequenceInput>
  }

  export type sequence_callsUpdateWithWhereUniqueWithoutSequenceInput = {
    where: sequence_callsWhereUniqueInput
    data: XOR<sequence_callsUpdateWithoutSequenceInput, sequence_callsUncheckedUpdateWithoutSequenceInput>
  }

  export type sequence_callsUpdateManyWithWhereWithoutSequenceInput = {
    where: sequence_callsScalarWhereInput
    data: XOR<sequence_callsUpdateManyMutationInput, sequence_callsUncheckedUpdateManyWithoutSequenceInput>
  }

  export type sequenceCreateWithoutCallsInput = {
    name: string
  }

  export type sequenceUncheckedCreateWithoutCallsInput = {
    seqId?: number
    name: string
  }

  export type sequenceCreateOrConnectWithoutCallsInput = {
    where: sequenceWhereUniqueInput
    create: XOR<sequenceCreateWithoutCallsInput, sequenceUncheckedCreateWithoutCallsInput>
  }

  export type callCreateWithoutSequencesInput = {
    name: string
    tamSeq?: string | null
    callFamily?: call_familyCreateNestedOneWithoutCallInput
    formations?: call_formationCreateNestedManyWithoutCallInput
  }

  export type callUncheckedCreateWithoutSequencesInput = {
    callId?: number
    name: string
    tamSeq?: string | null
    familyId?: number | null
    formations?: call_formationUncheckedCreateNestedManyWithoutCallInput
  }

  export type callCreateOrConnectWithoutSequencesInput = {
    where: callWhereUniqueInput
    create: XOR<callCreateWithoutSequencesInput, callUncheckedCreateWithoutSequencesInput>
  }

  export type formationCreateWithoutSequencesInput = {
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callStart?: call_formationCreateNestedManyWithoutStartFormInput
    callEnding?: call_formationCreateNestedManyWithoutEndFormInput
  }

  export type formationUncheckedCreateWithoutSequencesInput = {
    formId?: number
    name: string
    description?: string | null
    clCode?: string | null
    sdCode?: string | null
    callStart?: call_formationUncheckedCreateNestedManyWithoutStartFormInput
    callEnding?: call_formationUncheckedCreateNestedManyWithoutEndFormInput
  }

  export type formationCreateOrConnectWithoutSequencesInput = {
    where: formationWhereUniqueInput
    create: XOR<formationCreateWithoutSequencesInput, formationUncheckedCreateWithoutSequencesInput>
  }

  export type sequenceUpsertWithoutCallsInput = {
    update: XOR<sequenceUpdateWithoutCallsInput, sequenceUncheckedUpdateWithoutCallsInput>
    create: XOR<sequenceCreateWithoutCallsInput, sequenceUncheckedCreateWithoutCallsInput>
    where?: sequenceWhereInput
  }

  export type sequenceUpdateToOneWithWhereWithoutCallsInput = {
    where?: sequenceWhereInput
    data: XOR<sequenceUpdateWithoutCallsInput, sequenceUncheckedUpdateWithoutCallsInput>
  }

  export type sequenceUpdateWithoutCallsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type sequenceUncheckedUpdateWithoutCallsInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type callUpsertWithoutSequencesInput = {
    update: XOR<callUpdateWithoutSequencesInput, callUncheckedUpdateWithoutSequencesInput>
    create: XOR<callCreateWithoutSequencesInput, callUncheckedCreateWithoutSequencesInput>
    where?: callWhereInput
  }

  export type callUpdateToOneWithWhereWithoutSequencesInput = {
    where?: callWhereInput
    data: XOR<callUpdateWithoutSequencesInput, callUncheckedUpdateWithoutSequencesInput>
  }

  export type callUpdateWithoutSequencesInput = {
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    callFamily?: call_familyUpdateOneWithoutCallNestedInput
    formations?: call_formationUpdateManyWithoutCallNestedInput
  }

  export type callUncheckedUpdateWithoutSequencesInput = {
    callId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: NullableIntFieldUpdateOperationsInput | number | null
    formations?: call_formationUncheckedUpdateManyWithoutCallNestedInput
  }

  export type formationUpsertWithoutSequencesInput = {
    update: XOR<formationUpdateWithoutSequencesInput, formationUncheckedUpdateWithoutSequencesInput>
    create: XOR<formationCreateWithoutSequencesInput, formationUncheckedCreateWithoutSequencesInput>
    where?: formationWhereInput
  }

  export type formationUpdateToOneWithWhereWithoutSequencesInput = {
    where?: formationWhereInput
    data: XOR<formationUpdateWithoutSequencesInput, formationUncheckedUpdateWithoutSequencesInput>
  }

  export type formationUpdateWithoutSequencesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callStart?: call_formationUpdateManyWithoutStartFormNestedInput
    callEnding?: call_formationUpdateManyWithoutEndFormNestedInput
  }

  export type formationUncheckedUpdateWithoutSequencesInput = {
    formId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    clCode?: NullableStringFieldUpdateOperationsInput | string | null
    sdCode?: NullableStringFieldUpdateOperationsInput | string | null
    callStart?: call_formationUncheckedUpdateManyWithoutStartFormNestedInput
    callEnding?: call_formationUncheckedUpdateManyWithoutEndFormNestedInput
  }

  export type stateCreateWithoutCountryInput = {
    state: string
    name?: string | null
    groups?: groupCreateNestedManyWithoutCountryStateInput
  }

  export type stateUncheckedCreateWithoutCountryInput = {
    state: string
    name?: string | null
    groups?: groupUncheckedCreateNestedManyWithoutCountryStateInput
  }

  export type stateCreateOrConnectWithoutCountryInput = {
    where: stateWhereUniqueInput
    create: XOR<stateCreateWithoutCountryInput, stateUncheckedCreateWithoutCountryInput>
  }

  export type stateCreateManyCountryInputEnvelope = {
    data: stateCreateManyCountryInput | stateCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type stateUpsertWithWhereUniqueWithoutCountryInput = {
    where: stateWhereUniqueInput
    update: XOR<stateUpdateWithoutCountryInput, stateUncheckedUpdateWithoutCountryInput>
    create: XOR<stateCreateWithoutCountryInput, stateUncheckedCreateWithoutCountryInput>
  }

  export type stateUpdateWithWhereUniqueWithoutCountryInput = {
    where: stateWhereUniqueInput
    data: XOR<stateUpdateWithoutCountryInput, stateUncheckedUpdateWithoutCountryInput>
  }

  export type stateUpdateManyWithWhereWithoutCountryInput = {
    where: stateScalarWhereInput
    data: XOR<stateUpdateManyMutationInput, stateUncheckedUpdateManyWithoutCountryInput>
  }

  export type stateScalarWhereInput = {
    AND?: stateScalarWhereInput | stateScalarWhereInput[]
    OR?: stateScalarWhereInput[]
    NOT?: stateScalarWhereInput | stateScalarWhereInput[]
    countryCode?: StringFilter<"state"> | string
    state?: StringFilter<"state"> | string
    name?: StringNullableFilter<"state"> | string | null
  }

  export type dance_groupCreateWithoutDancerInput = {
    side: string
    proficency: string
    group: groupCreateNestedOneWithoutDancersInput
  }

  export type dance_groupUncheckedCreateWithoutDancerInput = {
    groupId: string
    side: string
    proficency: string
  }

  export type dance_groupCreateOrConnectWithoutDancerInput = {
    where: dance_groupWhereUniqueInput
    create: XOR<dance_groupCreateWithoutDancerInput, dance_groupUncheckedCreateWithoutDancerInput>
  }

  export type dance_groupCreateManyDancerInputEnvelope = {
    data: dance_groupCreateManyDancerInput | dance_groupCreateManyDancerInput[]
    skipDuplicates?: boolean
  }

  export type dance_programCreateWithoutDancerInput = {
    type: string
    proficency: string
    program: programCreateNestedOneWithoutDancersInput
  }

  export type dance_programUncheckedCreateWithoutDancerInput = {
    programId: number
    type: string
    proficency: string
  }

  export type dance_programCreateOrConnectWithoutDancerInput = {
    where: dance_programWhereUniqueInput
    create: XOR<dance_programCreateWithoutDancerInput, dance_programUncheckedCreateWithoutDancerInput>
  }

  export type dance_programCreateManyDancerInputEnvelope = {
    data: dance_programCreateManyDancerInput | dance_programCreateManyDancerInput[]
    skipDuplicates?: boolean
  }

  export type dance_groupUpsertWithWhereUniqueWithoutDancerInput = {
    where: dance_groupWhereUniqueInput
    update: XOR<dance_groupUpdateWithoutDancerInput, dance_groupUncheckedUpdateWithoutDancerInput>
    create: XOR<dance_groupCreateWithoutDancerInput, dance_groupUncheckedCreateWithoutDancerInput>
  }

  export type dance_groupUpdateWithWhereUniqueWithoutDancerInput = {
    where: dance_groupWhereUniqueInput
    data: XOR<dance_groupUpdateWithoutDancerInput, dance_groupUncheckedUpdateWithoutDancerInput>
  }

  export type dance_groupUpdateManyWithWhereWithoutDancerInput = {
    where: dance_groupScalarWhereInput
    data: XOR<dance_groupUpdateManyMutationInput, dance_groupUncheckedUpdateManyWithoutDancerInput>
  }

  export type dance_groupScalarWhereInput = {
    AND?: dance_groupScalarWhereInput | dance_groupScalarWhereInput[]
    OR?: dance_groupScalarWhereInput[]
    NOT?: dance_groupScalarWhereInput | dance_groupScalarWhereInput[]
    dancerId?: IntFilter<"dance_group"> | number
    groupId?: StringFilter<"dance_group"> | string
    side?: StringFilter<"dance_group"> | string
    proficency?: StringFilter<"dance_group"> | string
  }

  export type dance_programUpsertWithWhereUniqueWithoutDancerInput = {
    where: dance_programWhereUniqueInput
    update: XOR<dance_programUpdateWithoutDancerInput, dance_programUncheckedUpdateWithoutDancerInput>
    create: XOR<dance_programCreateWithoutDancerInput, dance_programUncheckedCreateWithoutDancerInput>
  }

  export type dance_programUpdateWithWhereUniqueWithoutDancerInput = {
    where: dance_programWhereUniqueInput
    data: XOR<dance_programUpdateWithoutDancerInput, dance_programUncheckedUpdateWithoutDancerInput>
  }

  export type dance_programUpdateManyWithWhereWithoutDancerInput = {
    where: dance_programScalarWhereInput
    data: XOR<dance_programUpdateManyMutationInput, dance_programUncheckedUpdateManyWithoutDancerInput>
  }

  export type dancerCreateWithoutGroupsInput = {
    name?: string | null
    email: string
    levels?: dance_programCreateNestedManyWithoutDancerInput
  }

  export type dancerUncheckedCreateWithoutGroupsInput = {
    dancerId?: number
    name?: string | null
    email: string
    levels?: dance_programUncheckedCreateNestedManyWithoutDancerInput
  }

  export type dancerCreateOrConnectWithoutGroupsInput = {
    where: dancerWhereUniqueInput
    create: XOR<dancerCreateWithoutGroupsInput, dancerUncheckedCreateWithoutGroupsInput>
  }

  export type groupCreateWithoutDancersInput = {
    id?: string
    name: string
    type: string
    countryState: stateCreateNestedOneWithoutGroupsInput
    parent?: group_assocationsCreateNestedManyWithoutGroupInput
    child?: group_assocationsCreateNestedManyWithoutParentInput
  }

  export type groupUncheckedCreateWithoutDancersInput = {
    id?: string
    name: string
    type: string
    countryCode: string
    state: string
    parent?: group_assocationsUncheckedCreateNestedManyWithoutGroupInput
    child?: group_assocationsUncheckedCreateNestedManyWithoutParentInput
  }

  export type groupCreateOrConnectWithoutDancersInput = {
    where: groupWhereUniqueInput
    create: XOR<groupCreateWithoutDancersInput, groupUncheckedCreateWithoutDancersInput>
  }

  export type dancerUpsertWithoutGroupsInput = {
    update: XOR<dancerUpdateWithoutGroupsInput, dancerUncheckedUpdateWithoutGroupsInput>
    create: XOR<dancerCreateWithoutGroupsInput, dancerUncheckedCreateWithoutGroupsInput>
    where?: dancerWhereInput
  }

  export type dancerUpdateToOneWithWhereWithoutGroupsInput = {
    where?: dancerWhereInput
    data: XOR<dancerUpdateWithoutGroupsInput, dancerUncheckedUpdateWithoutGroupsInput>
  }

  export type dancerUpdateWithoutGroupsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    levels?: dance_programUpdateManyWithoutDancerNestedInput
  }

  export type dancerUncheckedUpdateWithoutGroupsInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    levels?: dance_programUncheckedUpdateManyWithoutDancerNestedInput
  }

  export type groupUpsertWithoutDancersInput = {
    update: XOR<groupUpdateWithoutDancersInput, groupUncheckedUpdateWithoutDancersInput>
    create: XOR<groupCreateWithoutDancersInput, groupUncheckedCreateWithoutDancersInput>
    where?: groupWhereInput
  }

  export type groupUpdateToOneWithWhereWithoutDancersInput = {
    where?: groupWhereInput
    data: XOR<groupUpdateWithoutDancersInput, groupUncheckedUpdateWithoutDancersInput>
  }

  export type groupUpdateWithoutDancersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryState?: stateUpdateOneRequiredWithoutGroupsNestedInput
    parent?: group_assocationsUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUpdateManyWithoutParentNestedInput
  }

  export type groupUncheckedUpdateWithoutDancersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    parent?: group_assocationsUncheckedUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUncheckedUpdateManyWithoutParentNestedInput
  }

  export type dancerCreateWithoutLevelsInput = {
    name?: string | null
    email: string
    groups?: dance_groupCreateNestedManyWithoutDancerInput
  }

  export type dancerUncheckedCreateWithoutLevelsInput = {
    dancerId?: number
    name?: string | null
    email: string
    groups?: dance_groupUncheckedCreateNestedManyWithoutDancerInput
  }

  export type dancerCreateOrConnectWithoutLevelsInput = {
    where: dancerWhereUniqueInput
    create: XOR<dancerCreateWithoutLevelsInput, dancerUncheckedCreateWithoutLevelsInput>
  }

  export type programCreateWithoutDancersInput = {
    name: string
    order: number
  }

  export type programUncheckedCreateWithoutDancersInput = {
    programId?: number
    name: string
    order: number
  }

  export type programCreateOrConnectWithoutDancersInput = {
    where: programWhereUniqueInput
    create: XOR<programCreateWithoutDancersInput, programUncheckedCreateWithoutDancersInput>
  }

  export type dancerUpsertWithoutLevelsInput = {
    update: XOR<dancerUpdateWithoutLevelsInput, dancerUncheckedUpdateWithoutLevelsInput>
    create: XOR<dancerCreateWithoutLevelsInput, dancerUncheckedCreateWithoutLevelsInput>
    where?: dancerWhereInput
  }

  export type dancerUpdateToOneWithWhereWithoutLevelsInput = {
    where?: dancerWhereInput
    data: XOR<dancerUpdateWithoutLevelsInput, dancerUncheckedUpdateWithoutLevelsInput>
  }

  export type dancerUpdateWithoutLevelsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    groups?: dance_groupUpdateManyWithoutDancerNestedInput
  }

  export type dancerUncheckedUpdateWithoutLevelsInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    groups?: dance_groupUncheckedUpdateManyWithoutDancerNestedInput
  }

  export type programUpsertWithoutDancersInput = {
    update: XOR<programUpdateWithoutDancersInput, programUncheckedUpdateWithoutDancersInput>
    create: XOR<programCreateWithoutDancersInput, programUncheckedCreateWithoutDancersInput>
    where?: programWhereInput
  }

  export type programUpdateToOneWithWhereWithoutDancersInput = {
    where?: programWhereInput
    data: XOR<programUpdateWithoutDancersInput, programUncheckedUpdateWithoutDancersInput>
  }

  export type programUpdateWithoutDancersInput = {
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type programUncheckedUpdateWithoutDancersInput = {
    programId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type stateCreateWithoutGroupsInput = {
    state: string
    name?: string | null
    country: countryCreateNestedOneWithoutStatesInput
  }

  export type stateUncheckedCreateWithoutGroupsInput = {
    countryCode: string
    state: string
    name?: string | null
  }

  export type stateCreateOrConnectWithoutGroupsInput = {
    where: stateWhereUniqueInput
    create: XOR<stateCreateWithoutGroupsInput, stateUncheckedCreateWithoutGroupsInput>
  }

  export type dance_groupCreateWithoutGroupInput = {
    side: string
    proficency: string
    dancer: dancerCreateNestedOneWithoutGroupsInput
  }

  export type dance_groupUncheckedCreateWithoutGroupInput = {
    dancerId: number
    side: string
    proficency: string
  }

  export type dance_groupCreateOrConnectWithoutGroupInput = {
    where: dance_groupWhereUniqueInput
    create: XOR<dance_groupCreateWithoutGroupInput, dance_groupUncheckedCreateWithoutGroupInput>
  }

  export type dance_groupCreateManyGroupInputEnvelope = {
    data: dance_groupCreateManyGroupInput | dance_groupCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type group_assocationsCreateWithoutGroupInput = {
    parent: groupCreateNestedOneWithoutChildInput
  }

  export type group_assocationsUncheckedCreateWithoutGroupInput = {
    parentId: string
  }

  export type group_assocationsCreateOrConnectWithoutGroupInput = {
    where: group_assocationsWhereUniqueInput
    create: XOR<group_assocationsCreateWithoutGroupInput, group_assocationsUncheckedCreateWithoutGroupInput>
  }

  export type group_assocationsCreateManyGroupInputEnvelope = {
    data: group_assocationsCreateManyGroupInput | group_assocationsCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type group_assocationsCreateWithoutParentInput = {
    group: groupCreateNestedOneWithoutParentInput
  }

  export type group_assocationsUncheckedCreateWithoutParentInput = {
    groupId: string
  }

  export type group_assocationsCreateOrConnectWithoutParentInput = {
    where: group_assocationsWhereUniqueInput
    create: XOR<group_assocationsCreateWithoutParentInput, group_assocationsUncheckedCreateWithoutParentInput>
  }

  export type group_assocationsCreateManyParentInputEnvelope = {
    data: group_assocationsCreateManyParentInput | group_assocationsCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type stateUpsertWithoutGroupsInput = {
    update: XOR<stateUpdateWithoutGroupsInput, stateUncheckedUpdateWithoutGroupsInput>
    create: XOR<stateCreateWithoutGroupsInput, stateUncheckedCreateWithoutGroupsInput>
    where?: stateWhereInput
  }

  export type stateUpdateToOneWithWhereWithoutGroupsInput = {
    where?: stateWhereInput
    data: XOR<stateUpdateWithoutGroupsInput, stateUncheckedUpdateWithoutGroupsInput>
  }

  export type stateUpdateWithoutGroupsInput = {
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: countryUpdateOneRequiredWithoutStatesNestedInput
  }

  export type stateUncheckedUpdateWithoutGroupsInput = {
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type dance_groupUpsertWithWhereUniqueWithoutGroupInput = {
    where: dance_groupWhereUniqueInput
    update: XOR<dance_groupUpdateWithoutGroupInput, dance_groupUncheckedUpdateWithoutGroupInput>
    create: XOR<dance_groupCreateWithoutGroupInput, dance_groupUncheckedCreateWithoutGroupInput>
  }

  export type dance_groupUpdateWithWhereUniqueWithoutGroupInput = {
    where: dance_groupWhereUniqueInput
    data: XOR<dance_groupUpdateWithoutGroupInput, dance_groupUncheckedUpdateWithoutGroupInput>
  }

  export type dance_groupUpdateManyWithWhereWithoutGroupInput = {
    where: dance_groupScalarWhereInput
    data: XOR<dance_groupUpdateManyMutationInput, dance_groupUncheckedUpdateManyWithoutGroupInput>
  }

  export type group_assocationsUpsertWithWhereUniqueWithoutGroupInput = {
    where: group_assocationsWhereUniqueInput
    update: XOR<group_assocationsUpdateWithoutGroupInput, group_assocationsUncheckedUpdateWithoutGroupInput>
    create: XOR<group_assocationsCreateWithoutGroupInput, group_assocationsUncheckedCreateWithoutGroupInput>
  }

  export type group_assocationsUpdateWithWhereUniqueWithoutGroupInput = {
    where: group_assocationsWhereUniqueInput
    data: XOR<group_assocationsUpdateWithoutGroupInput, group_assocationsUncheckedUpdateWithoutGroupInput>
  }

  export type group_assocationsUpdateManyWithWhereWithoutGroupInput = {
    where: group_assocationsScalarWhereInput
    data: XOR<group_assocationsUpdateManyMutationInput, group_assocationsUncheckedUpdateManyWithoutGroupInput>
  }

  export type group_assocationsScalarWhereInput = {
    AND?: group_assocationsScalarWhereInput | group_assocationsScalarWhereInput[]
    OR?: group_assocationsScalarWhereInput[]
    NOT?: group_assocationsScalarWhereInput | group_assocationsScalarWhereInput[]
    groupId?: StringFilter<"group_assocations"> | string
    parentId?: StringFilter<"group_assocations"> | string
  }

  export type group_assocationsUpsertWithWhereUniqueWithoutParentInput = {
    where: group_assocationsWhereUniqueInput
    update: XOR<group_assocationsUpdateWithoutParentInput, group_assocationsUncheckedUpdateWithoutParentInput>
    create: XOR<group_assocationsCreateWithoutParentInput, group_assocationsUncheckedCreateWithoutParentInput>
  }

  export type group_assocationsUpdateWithWhereUniqueWithoutParentInput = {
    where: group_assocationsWhereUniqueInput
    data: XOR<group_assocationsUpdateWithoutParentInput, group_assocationsUncheckedUpdateWithoutParentInput>
  }

  export type group_assocationsUpdateManyWithWhereWithoutParentInput = {
    where: group_assocationsScalarWhereInput
    data: XOR<group_assocationsUpdateManyMutationInput, group_assocationsUncheckedUpdateManyWithoutParentInput>
  }

  export type groupCreateWithoutParentInput = {
    id?: string
    name: string
    type: string
    countryState: stateCreateNestedOneWithoutGroupsInput
    dancers?: dance_groupCreateNestedManyWithoutGroupInput
    child?: group_assocationsCreateNestedManyWithoutParentInput
  }

  export type groupUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    type: string
    countryCode: string
    state: string
    dancers?: dance_groupUncheckedCreateNestedManyWithoutGroupInput
    child?: group_assocationsUncheckedCreateNestedManyWithoutParentInput
  }

  export type groupCreateOrConnectWithoutParentInput = {
    where: groupWhereUniqueInput
    create: XOR<groupCreateWithoutParentInput, groupUncheckedCreateWithoutParentInput>
  }

  export type groupCreateWithoutChildInput = {
    id?: string
    name: string
    type: string
    countryState: stateCreateNestedOneWithoutGroupsInput
    dancers?: dance_groupCreateNestedManyWithoutGroupInput
    parent?: group_assocationsCreateNestedManyWithoutGroupInput
  }

  export type groupUncheckedCreateWithoutChildInput = {
    id?: string
    name: string
    type: string
    countryCode: string
    state: string
    dancers?: dance_groupUncheckedCreateNestedManyWithoutGroupInput
    parent?: group_assocationsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type groupCreateOrConnectWithoutChildInput = {
    where: groupWhereUniqueInput
    create: XOR<groupCreateWithoutChildInput, groupUncheckedCreateWithoutChildInput>
  }

  export type groupUpsertWithoutParentInput = {
    update: XOR<groupUpdateWithoutParentInput, groupUncheckedUpdateWithoutParentInput>
    create: XOR<groupCreateWithoutParentInput, groupUncheckedCreateWithoutParentInput>
    where?: groupWhereInput
  }

  export type groupUpdateToOneWithWhereWithoutParentInput = {
    where?: groupWhereInput
    data: XOR<groupUpdateWithoutParentInput, groupUncheckedUpdateWithoutParentInput>
  }

  export type groupUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryState?: stateUpdateOneRequiredWithoutGroupsNestedInput
    dancers?: dance_groupUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUpdateManyWithoutParentNestedInput
  }

  export type groupUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    dancers?: dance_groupUncheckedUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUncheckedUpdateManyWithoutParentNestedInput
  }

  export type groupUpsertWithoutChildInput = {
    update: XOR<groupUpdateWithoutChildInput, groupUncheckedUpdateWithoutChildInput>
    create: XOR<groupCreateWithoutChildInput, groupUncheckedCreateWithoutChildInput>
    where?: groupWhereInput
  }

  export type groupUpdateToOneWithWhereWithoutChildInput = {
    where?: groupWhereInput
    data: XOR<groupUpdateWithoutChildInput, groupUncheckedUpdateWithoutChildInput>
  }

  export type groupUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryState?: stateUpdateOneRequiredWithoutGroupsNestedInput
    dancers?: dance_groupUpdateManyWithoutGroupNestedInput
    parent?: group_assocationsUpdateManyWithoutGroupNestedInput
  }

  export type groupUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    dancers?: dance_groupUncheckedUpdateManyWithoutGroupNestedInput
    parent?: group_assocationsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type countryCreateWithoutStatesInput = {
    code: string
    name?: string | null
  }

  export type countryUncheckedCreateWithoutStatesInput = {
    code: string
    name?: string | null
  }

  export type countryCreateOrConnectWithoutStatesInput = {
    where: countryWhereUniqueInput
    create: XOR<countryCreateWithoutStatesInput, countryUncheckedCreateWithoutStatesInput>
  }

  export type groupCreateWithoutCountryStateInput = {
    id?: string
    name: string
    type: string
    dancers?: dance_groupCreateNestedManyWithoutGroupInput
    parent?: group_assocationsCreateNestedManyWithoutGroupInput
    child?: group_assocationsCreateNestedManyWithoutParentInput
  }

  export type groupUncheckedCreateWithoutCountryStateInput = {
    id?: string
    name: string
    type: string
    dancers?: dance_groupUncheckedCreateNestedManyWithoutGroupInput
    parent?: group_assocationsUncheckedCreateNestedManyWithoutGroupInput
    child?: group_assocationsUncheckedCreateNestedManyWithoutParentInput
  }

  export type groupCreateOrConnectWithoutCountryStateInput = {
    where: groupWhereUniqueInput
    create: XOR<groupCreateWithoutCountryStateInput, groupUncheckedCreateWithoutCountryStateInput>
  }

  export type groupCreateManyCountryStateInputEnvelope = {
    data: groupCreateManyCountryStateInput | groupCreateManyCountryStateInput[]
    skipDuplicates?: boolean
  }

  export type countryUpsertWithoutStatesInput = {
    update: XOR<countryUpdateWithoutStatesInput, countryUncheckedUpdateWithoutStatesInput>
    create: XOR<countryCreateWithoutStatesInput, countryUncheckedCreateWithoutStatesInput>
    where?: countryWhereInput
  }

  export type countryUpdateToOneWithWhereWithoutStatesInput = {
    where?: countryWhereInput
    data: XOR<countryUpdateWithoutStatesInput, countryUncheckedUpdateWithoutStatesInput>
  }

  export type countryUpdateWithoutStatesInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type countryUncheckedUpdateWithoutStatesInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type groupUpsertWithWhereUniqueWithoutCountryStateInput = {
    where: groupWhereUniqueInput
    update: XOR<groupUpdateWithoutCountryStateInput, groupUncheckedUpdateWithoutCountryStateInput>
    create: XOR<groupCreateWithoutCountryStateInput, groupUncheckedCreateWithoutCountryStateInput>
  }

  export type groupUpdateWithWhereUniqueWithoutCountryStateInput = {
    where: groupWhereUniqueInput
    data: XOR<groupUpdateWithoutCountryStateInput, groupUncheckedUpdateWithoutCountryStateInput>
  }

  export type groupUpdateManyWithWhereWithoutCountryStateInput = {
    where: groupScalarWhereInput
    data: XOR<groupUpdateManyMutationInput, groupUncheckedUpdateManyWithoutCountryStateInput>
  }

  export type groupScalarWhereInput = {
    AND?: groupScalarWhereInput | groupScalarWhereInput[]
    OR?: groupScalarWhereInput[]
    NOT?: groupScalarWhereInput | groupScalarWhereInput[]
    id?: StringFilter<"group"> | string
    name?: StringFilter<"group"> | string
    type?: StringFilter<"group"> | string
    countryCode?: StringFilter<"group"> | string
    state?: StringFilter<"group"> | string
  }

  export type call_formationCreateManyCallInput = {
    startId: number
    endId: number
  }

  export type sequence_callsCreateManyCallInput = {
    seqId: number
    startId: number
    order: number
    helperText?: string | null
  }

  export type call_formationUpdateWithoutCallInput = {
    startForm?: formationUpdateOneRequiredWithoutCallStartNestedInput
    endForm?: formationUpdateOneRequiredWithoutCallEndingNestedInput
  }

  export type call_formationUncheckedUpdateWithoutCallInput = {
    startId?: IntFieldUpdateOperationsInput | number
    endId?: IntFieldUpdateOperationsInput | number
  }

  export type call_formationUncheckedUpdateManyWithoutCallInput = {
    startId?: IntFieldUpdateOperationsInput | number
    endId?: IntFieldUpdateOperationsInput | number
  }

  export type sequence_callsUpdateWithoutCallInput = {
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: sequenceUpdateOneRequiredWithoutCallsNestedInput
    startForm?: formationUpdateOneRequiredWithoutSequencesNestedInput
  }

  export type sequence_callsUncheckedUpdateWithoutCallInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sequence_callsUncheckedUpdateManyWithoutCallInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type callCreateManyCallFamilyInput = {
    callId?: number
    name: string
    tamSeq?: string | null
  }

  export type callUpdateWithoutCallFamilyInput = {
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    formations?: call_formationUpdateManyWithoutCallNestedInput
    sequences?: sequence_callsUpdateManyWithoutCallNestedInput
  }

  export type callUncheckedUpdateWithoutCallFamilyInput = {
    callId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
    formations?: call_formationUncheckedUpdateManyWithoutCallNestedInput
    sequences?: sequence_callsUncheckedUpdateManyWithoutCallNestedInput
  }

  export type callUncheckedUpdateManyWithoutCallFamilyInput = {
    callId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tamSeq?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type call_formationCreateManyStartFormInput = {
    callId: number
    endId: number
  }

  export type call_formationCreateManyEndFormInput = {
    callId: number
    startId: number
  }

  export type sequence_callsCreateManyStartFormInput = {
    seqId: number
    callId: number
    order: number
    helperText?: string | null
  }

  export type call_formationUpdateWithoutStartFormInput = {
    call?: callUpdateOneRequiredWithoutFormationsNestedInput
    endForm?: formationUpdateOneRequiredWithoutCallEndingNestedInput
  }

  export type call_formationUncheckedUpdateWithoutStartFormInput = {
    callId?: IntFieldUpdateOperationsInput | number
    endId?: IntFieldUpdateOperationsInput | number
  }

  export type call_formationUncheckedUpdateManyWithoutStartFormInput = {
    callId?: IntFieldUpdateOperationsInput | number
    endId?: IntFieldUpdateOperationsInput | number
  }

  export type call_formationUpdateWithoutEndFormInput = {
    call?: callUpdateOneRequiredWithoutFormationsNestedInput
    startForm?: formationUpdateOneRequiredWithoutCallStartNestedInput
  }

  export type call_formationUncheckedUpdateWithoutEndFormInput = {
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
  }

  export type call_formationUncheckedUpdateManyWithoutEndFormInput = {
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
  }

  export type sequence_callsUpdateWithoutStartFormInput = {
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
    sequence?: sequenceUpdateOneRequiredWithoutCallsNestedInput
    call?: callUpdateOneRequiredWithoutSequencesNestedInput
  }

  export type sequence_callsUncheckedUpdateWithoutStartFormInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    callId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sequence_callsUncheckedUpdateManyWithoutStartFormInput = {
    seqId?: IntFieldUpdateOperationsInput | number
    callId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type dance_programCreateManyProgramInput = {
    dancerId: number
    type: string
    proficency: string
  }

  export type dance_programUpdateWithoutProgramInput = {
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
    dancer?: dancerUpdateOneRequiredWithoutLevelsNestedInput
  }

  export type dance_programUncheckedUpdateWithoutProgramInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_programUncheckedUpdateManyWithoutProgramInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type sequence_callsCreateManySequenceInput = {
    callId: number
    startId: number
    order: number
    helperText?: string | null
  }

  export type sequence_callsUpdateWithoutSequenceInput = {
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
    call?: callUpdateOneRequiredWithoutSequencesNestedInput
    startForm?: formationUpdateOneRequiredWithoutSequencesNestedInput
  }

  export type sequence_callsUncheckedUpdateWithoutSequenceInput = {
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sequence_callsUncheckedUpdateManyWithoutSequenceInput = {
    callId?: IntFieldUpdateOperationsInput | number
    startId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    helperText?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type stateCreateManyCountryInput = {
    state: string
    name?: string | null
  }

  export type stateUpdateWithoutCountryInput = {
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groups?: groupUpdateManyWithoutCountryStateNestedInput
  }

  export type stateUncheckedUpdateWithoutCountryInput = {
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    groups?: groupUncheckedUpdateManyWithoutCountryStateNestedInput
  }

  export type stateUncheckedUpdateManyWithoutCountryInput = {
    state?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type dance_groupCreateManyDancerInput = {
    groupId: string
    side: string
    proficency: string
  }

  export type dance_programCreateManyDancerInput = {
    programId: number
    type: string
    proficency: string
  }

  export type dance_groupUpdateWithoutDancerInput = {
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
    group?: groupUpdateOneRequiredWithoutDancersNestedInput
  }

  export type dance_groupUncheckedUpdateWithoutDancerInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_groupUncheckedUpdateManyWithoutDancerInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_programUpdateWithoutDancerInput = {
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
    program?: programUpdateOneRequiredWithoutDancersNestedInput
  }

  export type dance_programUncheckedUpdateWithoutDancerInput = {
    programId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_programUncheckedUpdateManyWithoutDancerInput = {
    programId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_groupCreateManyGroupInput = {
    dancerId: number
    side: string
    proficency: string
  }

  export type group_assocationsCreateManyGroupInput = {
    parentId: string
  }

  export type group_assocationsCreateManyParentInput = {
    groupId: string
  }

  export type dance_groupUpdateWithoutGroupInput = {
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
    dancer?: dancerUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type dance_groupUncheckedUpdateWithoutGroupInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type dance_groupUncheckedUpdateManyWithoutGroupInput = {
    dancerId?: IntFieldUpdateOperationsInput | number
    side?: StringFieldUpdateOperationsInput | string
    proficency?: StringFieldUpdateOperationsInput | string
  }

  export type group_assocationsUpdateWithoutGroupInput = {
    parent?: groupUpdateOneRequiredWithoutChildNestedInput
  }

  export type group_assocationsUncheckedUpdateWithoutGroupInput = {
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type group_assocationsUncheckedUpdateManyWithoutGroupInput = {
    parentId?: StringFieldUpdateOperationsInput | string
  }

  export type group_assocationsUpdateWithoutParentInput = {
    group?: groupUpdateOneRequiredWithoutParentNestedInput
  }

  export type group_assocationsUncheckedUpdateWithoutParentInput = {
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type group_assocationsUncheckedUpdateManyWithoutParentInput = {
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type groupCreateManyCountryStateInput = {
    id?: string
    name: string
    type: string
  }

  export type groupUpdateWithoutCountryStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dancers?: dance_groupUpdateManyWithoutGroupNestedInput
    parent?: group_assocationsUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUpdateManyWithoutParentNestedInput
  }

  export type groupUncheckedUpdateWithoutCountryStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    dancers?: dance_groupUncheckedUpdateManyWithoutGroupNestedInput
    parent?: group_assocationsUncheckedUpdateManyWithoutGroupNestedInput
    child?: group_assocationsUncheckedUpdateManyWithoutParentNestedInput
  }

  export type groupUncheckedUpdateManyWithoutCountryStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}