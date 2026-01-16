type KakaoShareLink = {
	webUrl?: string;
	mobileWebUrl?: string;
	androidExecutionParams?: string;
	iosExecutionParams?: string;
};

export type KakaoSdk = {
	init: (appKey: string) => void;
	isInitialized: () => boolean;
	Share: {
		sendDefault: (params: {
			objectType: string;
			text?: string;
			content?: unknown;
			link?: KakaoShareLink;
			buttons?: unknown;
			serverCallbackArgs?: Record<string, string>;
		}) => void;
	};
};

declare global {
	interface Window {
		Kakao?: KakaoSdk;
	}
}

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
const KAKAO_SDK_SCRIPT_ID = 'kakao-js-sdk';

function loadKakaoSdk(): Promise<KakaoSdk> {
	return new Promise((resolve, reject) => {
		if (window.Kakao) {
			resolve(window.Kakao);
			return;
		}

		const existing = document.getElementById(KAKAO_SDK_SCRIPT_ID) as HTMLScriptElement | null;
		if (existing) {
			existing.addEventListener('load', () => {
				if (window.Kakao) resolve(window.Kakao);
				else reject(new Error('Kakao SDK loaded but window.Kakao is missing'));
			});
			existing.addEventListener('error', () => reject(new Error('Failed to load Kakao SDK')));
			return;
		}

		const script = document.createElement('script');
		script.id = KAKAO_SDK_SCRIPT_ID;
		script.src = KAKAO_SDK_URL;
		script.async = true;
		script.onload = () => {
			if (window.Kakao) resolve(window.Kakao);
			else reject(new Error('Kakao SDK loaded but window.Kakao is missing'));
		};
		script.onerror = () => reject(new Error('Failed to load Kakao SDK'));

		document.head.appendChild(script);
	});
}

export async function initKakao(): Promise<KakaoSdk | null> {
	const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
	if (!appKey) return null;

	const kakao = await loadKakaoSdk();
	if (!kakao.isInitialized()) {
		kakao.init(appKey);
	}
	return kakao;
}

export async function shareKakaoText(params: { text: string; url: string }): Promise<boolean> {
	try {
		const kakao = await initKakao();
		if (!kakao) return false;

		kakao.Share.sendDefault({
			objectType: 'text',
			text: params.text,
			link: {
				mobileWebUrl: params.url,
				webUrl: params.url,
			},
		});
		return true;
	} catch {
		return false;
	}
}
