/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_KAKAO_JS_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
	const src: string;
	export default src;
}

declare module '*.png' {
	const src: string;
	export default src;
}
