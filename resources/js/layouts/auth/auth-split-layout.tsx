import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

type PageProps = {
    name: string;
    backdrops: string[];
};

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name, backdrops } = usePage<PageProps>().props;

    const [images, setImages] = useState<[string | null, string | null]>([null, null]);
    const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
    const activeLayerRef = useRef(activeLayer);
    activeLayerRef.current = activeLayer;

    useEffect(() => {
        if (!backdrops || backdrops.length === 0) return;

        const pickBackdrop = (avoid?: string | null) => {
            if (backdrops.length === 1) return backdrops[0];
            let choice: string;
            do {
                choice = backdrops[Math.floor(Math.random() * backdrops.length)];
            } while (choice === avoid);
            return choice;
        };

        setImages([pickBackdrop(), null]);

        const intervalId = setInterval(() => {
            const current = activeLayerRef.current;
            const next = current === 0 ? 1 : 0;

            setImages((prev) => {
                const updated: [string | null, string | null] = [...prev];
                updated[next] = pickBackdrop(prev[current]);
                return updated;
            });

            setActiveLayer(next);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [backdrops]);

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                {images.map((path, index) =>
                    path ? (
                        <img
                            key={index}
                            src={`https://image.tmdb.org/t/p/w1280${path}`}
                            alt=""
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2500ms] ease-in-out ${
                                activeLayer === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    ) : null,
                )}
                <div className="absolute inset-0 bg-black/50" />
                <Link
                    href={home()}
                    className="relative z-20 flex items-center text-lg font-medium"
                >
                    <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {name}
                </Link>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}