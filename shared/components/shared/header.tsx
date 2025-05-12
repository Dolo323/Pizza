'use client';

import React from "react";
import { Container } from "./container";
import { cn } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal";




interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart= true, className }) => {
    const searchParams = useSearchParams();
     const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);


   React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);
    
    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">

                {/*Левая часть*/}
              <Link href="/">
              <div>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg" alt="Logo" width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                        <p className="text-sm text-gray-400 leading-3">вкуснее уже некуда</p>
                    </div>
                </div>
              </Link>

              {hasSearch && 
              <div className="mx-10 flex-1">
                <SearchInput/>
              </div>}
                {/*Правая часть*/}
                <div className="ml-auto flex items-center gap-3">
                    <AuthModal  open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>

                    {hasCart && <CartButton />}
                </div>

            </Container>
        </header>
    );
};
