import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import defaultImage from '../assets/images/default.png';
import PetRegisterModal from '../components/PetRegisterModal.jsx';

// 실종 신고글 더미 데이터
const dummyReports = [
    {
        id: 1,
        title: "강아지를 찾습니다 - 서울 강남구",
        createdAt: "2025-02-15T14:30:00",
        status: "searching"
    },
    {
        id: 2,
        title: "푸들 실종 - 부산 해운대구",
        createdAt: "2025-02-17T09:15:00",
        status: "searching"
    },
    {
        id: 3,
        title: "말티즈 찾아요 - 대구 수성구",
        createdAt: "2025-02-18T16:45:00",
        status: "found"
    }
];

// 실종 제보글 더미 데이터
const dummyWitnesses = [
    {
        id: 1,
        title: "강아지 목격 - 서울 송파구",
        createdAt: "2025-02-16T11:20:00",
        location: "올림픽공원 근처"
    },
    {
        id: 2,
        title: "비숑 목격 제보 - 인천 연수구",
        createdAt: "2025-02-17T15:40:00",
        location: "송도 센트럴파크"
    },
    {
        id: 3,
        title: "진도믹스 발견 - 경기도 성남시",
        createdAt: "2025-02-19T10:30:00",
        location: "분당 중앙공원"
    }
];

// 반려견 더미 데이터
const dummyPets = [
    {
        id: 1,
        name: "몽이",
        breed: "말티즈",
        birthDate: "2022-03-15",
        characteristics: "활발하고 사교적인 성격",
        size: "small",
        registrationNumber: "123456789",
        imageUrl: "https://example.com/pet1.jpg"
    },
    {
        id: 2,
        name: "초코",
        breed: "푸들",
        birthDate: "2021-08-22",
        characteristics: "조용하고 온순한 성격",
        size: "medium",
        registrationNumber: "987654321",
        imageUrl: "https://example.com/pet2.jpg"
    },
    {
        id: 3,
        name: "해피",
        breed: "비숑프리제",
        birthDate: "2023-01-10",
        characteristics: "장난기 많고 애교가 많음",
        size: "small",
        registrationNumber: "456789123",
        imageUrl: "https://example.com/pet3.jpg"
    }
];

const MyPage = () => {
    const userInfo = useAuthStore((state) => state.userInfo?.data);
    const [activeTab, setActiveTab] = useState('profile');
    const [profileImage, setProfileImage] = useState(defaultImage);
    const [nickname, setNickname] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [myPets, setMyPets] = useState([]);
    // const [myPosts, setMyPosts] = useState({ reports: [], witnesses: [] });
    const [myPets, setMyPets] = useState(dummyPets);
    const [myPosts, setMyPosts] = useState({
        reports: dummyReports,
        witnesses: dummyWitnesses
    });
    const [personalInfo, setPersonalInfo] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
        address: '',
        phone: '',
        isPhoneVerified: false,
        verificationCode: ''
    });
    const [petFormData, setPetFormData] = useState({
        name: '',
        birthDate: '',
        breed: '',
        characteristics: '',
        size: 'small',
        registrationNumber: '',
        image: null
    });

    useEffect(() => {
        if (userInfo) {
            setNickname(userInfo.nickname);
            setProfileImage(
                userInfo.profileImageUrl
                    ? userInfo.profileImageUrl.startsWith('https://')
                        ? userInfo.profileImageUrl
                        : `${import.meta.env.VITE_NCP_STORAGE_URL}/${userInfo.profileImageUrl}`
                    : defaultImage
            );
            fetchMyPets();
            fetchMyPosts();
        }
    }, [userInfo]);

    // 핸들러 함수 추가
    const handleUpdatePersonalInfo = async (e) => {
        e.preventDefault();
        if (personalInfo.newPassword !== personalInfo.confirmPassword) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        // API 호출 로직 구현
    };

    const handlePhoneVerification = async () => {
        // 전화번호 인증 요청 API 호출
    };

    const handleVerificationCodeCheck = async () => {
        // 인증번호 확인 API 호출
    };


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            // const response = await fetch(
            // );

            // if (response.ok) {
            //     const data = await response.json();
            //     setProfileImage(data.profileImageUrl);
            // }
        } catch (error) {
            console.error('Image upload error:', error);
            alert('이미지 업로드 중 오류가 발생했습니다.');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            // const response = await fetch(

            // );

            // if (response.ok) {
            //     setIsEditing(false);
            //     alert('프로필이 업데이트되었습니다.');
            // }
        } catch (error) {
            console.error('Profile update error:', error);
            alert('프로필 업데이트 중 오류가 발생했습니다.');
        }
    };

    const fetchMyPets = async () => {
        try {
            // const response = await fetch(

            // );
            // if (response.ok) {
            //     const data = await response.json();
            //     setMyPets(data);
            // }
        } catch (error) {
            console.error('Fetch pets error:', error);
        }
    };

    const handlePetSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(petFormData).forEach(key => {
            formData.append(key, petFormData[key]);
        });

        try {
            // const response = await fetch(

            // );
            if (response.ok) {
                alert('반려견 정보가 등록되었습니다.');
                fetchMyPets();
                setPetFormData({
                    name: '',
                    birthDate: '',
                    breed: '',
                    characteristics: '',
                    size: 'small',
                    registrationNumber: '',
                    image: null
                });
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Pet registration error:', error);
            alert('반려견 등록 중 오류가 발생했습니다.');
        }
    };

    const fetchMyPosts = async () => {
        try {
            const [reportsRes, witnessesRes] = await Promise.all([
                // fetch(
                //     `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/reports/my`,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                //         },
                //     }
                // ),
                // fetch(
                //     `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/witnesses/my`,
                //     {
                //         headers: {
                //             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                //         },
                //     }
                // )
            ]);

            // if (reportsRes.ok && witnessesRes.ok) {
            //     const [reports, witnesses] = await Promise.all([
            //         reportsRes.json(),
            //         witnessesRes.json()
            //     ]);
            //     setMyPosts({ reports, witnesses });
            // }
        } catch (error) {
            console.error('Fetch posts error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5E6]">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
                <div className="flex gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'profile'
                                ? 'bg-orange-500 text-white' // primary.main
                                : 'bg-gray-200' // primary.light
                            }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        프로필
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'pets' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('pets')}
                    >
                        반려견 관리
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'posts' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        게시글 관리
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </label>
                        </div>

                        {isEditing ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    className="px-3 py-2 border rounded-md"
                                />
                                <div className="space-x-2">
                                    <button
                                        onClick={handleUpdateProfile}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                    >
                                        저장
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 bg-gray-300 rounded-md"
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2">{nickname}</h2>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-gray-100 rounded-md"
                                >
                                    프로필 수정
                                </button>
                            </div>
                        )}

                        <div className="mt-8 space-y-6">
                            <div className="border-t pt-4">
                                <h3 className="text-xl font-bold mb-4">개인정보 수정</h3>
                                <form className="space-y-4 max-w-md mx-auto text-left" onSubmit={handleUpdatePersonalInfo}>
                                    {/* 비밀번호 변경 */}
                                    <div>
                                        <label className="block text-gray-700 mb-2">현재 비밀번호</label>
                                        <input
                                            type="password"
                                            value={personalInfo.password}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">새 비밀번호</label>
                                        <input
                                            type="password"
                                            value={personalInfo.newPassword}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, newPassword: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">새 비밀번호 확인</label>
                                        <input
                                            type="password"
                                            value={personalInfo.confirmPassword}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, confirmPassword: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>

                                    {/* 주소 정보 */}
                                    <div>
                                        <label className="block text-gray-700 mb-2">주소</label>
                                        <input
                                            type="text"
                                            value={personalInfo.address}
                                            onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>

                                    {/* 전화번호 인증 */}
                                    <div>
                                        <label className="block text-gray-700 mb-2">전화번호</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="tel"
                                                value={personalInfo.phone}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                                className="flex-1 px-3 py-2 border rounded-md"
                                                disabled={personalInfo.isPhoneVerified}
                                            />
                                            <button
                                                type="button"
                                                onClick={handlePhoneVerification}
                                                className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                                disabled={personalInfo.isPhoneVerified}
                                            >
                                                인증요청
                                            </button>
                                        </div>
                                    </div>

                                    {/* 인증번호 입력 */}
                                    {!personalInfo.isPhoneVerified && personalInfo.phone && (
                                        <div>
                                            <label className="block text-gray-700 mb-2">인증번호</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={personalInfo.verificationCode}
                                                    onChange={(e) => setPersonalInfo({ ...personalInfo, verificationCode: e.target.value })}
                                                    className="flex-1 px-3 py-2 border rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerificationCodeCheck}
                                                    className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                                >
                                                    확인
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-orange-500 text-white rounded-md mt-6"
                                    >
                                        정보 수정
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="border-t pt-4">
                                <h3 className="font-bold mb-2">이메일</h3>
                                <p>{userInfo?.email}</p>
                            </div>
                            <div className="border-t pt-4">
                                <h3 className="font-bold mb-2">가입일</h3>
                                <p>{new Date(userInfo?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pets' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">내 반려견 목록</h2>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-[#FB8C00]"
                            >
                                반려견 등록
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myPets.map(pet => (
                                <div key={pet.id} className="border rounded-lg shadow-sm overflow-hidden">
                                    <img
                                        src={pet.imageUrl}
                                        alt={pet.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4 space-y-2">
                                        <h3 className="text-xl font-bold">{pet.name}</h3>
                                        <div className="text-gray-600">
                                            <p>품종: {pet.breed}</p>
                                            <p>나이: {new Date().getFullYear() - new Date(pet.birthDate).getFullYear()}세</p>
                                            <p>특징: {pet.characteristics}</p>
                                            <p>크기: {pet.size === 'small' ? '소형' : pet.size === 'medium' ? '중형' : '대형'}</p>
                                            <p>동물등록번호: {pet.registrationNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <PetRegisterModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handlePetSubmit}
                            petFormData={petFormData}
                            setPetFormData={setPetFormData}
                        />
                    </div>
                )}

                {activeTab === 'posts' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">내 실종 신고글</h2>
                            {myPosts.reports.map(post => (
                                <div key={post.id} className="border p-4 rounded mb-2">
                                    <h3 className="font-bold">{post.title}</h3>
                                    <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">내 실종 제보글</h2>
                            {myPosts.witnesses.map(post => (
                                <div key={post.id} className="border p-4 rounded mb-2">
                                    <h3 className="font-bold">{post.title}</h3>
                                    <p className="text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPage;
