import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        nickname: formData.nickname,
                    }),
                }
            );

            if (response.ok) {
                alert('회원가입이 완료되었습니다.');
                navigate('/login-pet');
            } else {
                const errorData = await response.json();
                alert(errorData.msg || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-orange-900 text-center mb-8">회원가입</h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="비밀번호 확인"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="nickname"
                                placeholder="닉네임"
                                value={formData.nickname}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
                        >
                            가입하기
                        </button>
                    </form>

                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                        <button 
                            onClick={() => navigate('/login-pet')}
                            className="hover:text-orange-500"
                        >
                            이미 계정이 있으신가요? 로그인하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;