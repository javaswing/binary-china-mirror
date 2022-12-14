declare module "binary-mirror-config" {
  interface MirrorConfigOptions {
    /**
     * @default 'https://registry.npmmirror.com'
     */
    registry?: string;
    /**
     * @default 5
     */
    retryCount?: number;
    /** @default 5000 (ms) */
    retryTimeout?: number;
    /**
     * @default console
     */
    console?: unknown;
  }

  interface MirrorConfigInterface {
    new (config: MirrorConfigOptions);
  }
  interface mirrorsTypes {
    china: {
      ENVS: Record<string, string>;
      [x: string]: unknown;
    };
    MirrorConfig: MirrorConfigInterface;
  }

  interface BinaryMirrorConfigType {
    mirrors: mirrorsTypes;
    MirrorConfig: MirrorConfig;
  }

  const BinaryMirrorConfigType: BinaryMirrorConfigType;
  export = BinaryMirrorConfigType;
}
