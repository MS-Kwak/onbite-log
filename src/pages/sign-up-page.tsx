import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { useVerifyOtp } from "@/hooks/mutations/use-verify-otp";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      setIsOtpSent(true);
      toast.success("인증번호가 이메일로 전송되었습니다.", {
        position: "top-center",
      });
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const { mutate: verifyOtp, isPending: isVerifyOtpPending } = useVerifyOtp({
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!", {
        position: "top-center",
      });
      navigate("/sign-in");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({
      email,
      password,
    });
  };

  const handleVerifyOtpClick = () => {
    if (otpToken.trim() === "") return;

    verifyOtp({
      email,
      token: otpToken,
      type: "signup",
    });
  };

  const isPending = isSignUpPending || isVerifyOtpPending;

  if (isOtpSent) {
    return (
      <div className="flex flex-col gap-8">
        <div className="text-xl font-bold">이메일 인증</div>
        <div className="text-muted-foreground">
          <span className="text-foreground font-medium">{email}</span>로 전송된
          인증번호를 입력해주세요.
        </div>
        <div className="flex flex-col gap-2">
          <Input
            disabled={isPending}
            value={otpToken}
            onChange={(e) => setOtpToken(e.target.value)}
            className="py-6"
            type="text"
            placeholder="인증번호 6자리"
            maxLength={6}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            disabled={isPending}
            onClick={handleVerifyOtpClick}
            className="w-full"
          >
            인증하기
          </Button>
          <Button
            disabled={isPending}
            onClick={() => setIsOtpSent(false)}
            variant="outline"
            className="w-full"
          >
            이메일 다시 입력
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <Button
          disabled={isPending}
          onClick={handleSignUpClick}
          className="w-full"
        >
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-in"}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
