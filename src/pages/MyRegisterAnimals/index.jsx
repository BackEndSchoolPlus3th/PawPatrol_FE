import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Clock } from 'lucide-react';
import axios from 'axios';
import ApplicationsModal from '../../components/ApplicationsModal';
import StatusBadge from '../../components/StatusBadge';
import InfiniteScroll from '../../components/InfiniteScroll';

const MyRegisteredAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [waitingCount, setWaitingCount] = useState(0);
    const [protectingCount, setProtectingCount] = useState(0);

    // 페이지 로드 시 스크롤을 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 동물 목록 가져오기
    const fetchMyRegisteredAnimals = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/protections/my-cases?page=${page}&size=10`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const data = response.data;
                console.log('내가 등록한 동물 데이터:', data);
                if (data.resultCode === "200") {
                    const newAnimals = data.data.content || [];

                    // 데이터가 없으면 더 이상 불러올 항목이 없음
                    if (newAnimals.length === 0) {
                        setHasMore(false);
                        console.log('더 이상 로드할 데이터가 없습니다');
                        return;
                    }

                    // 첫 페이지면 새로 설정, 아니면 기존 데이터에 추가
                    if (page === 0) {
                        setAnimals(newAnimals);
                    } else {
                        setAnimals(prev => [...prev, ...newAnimals]);
                    }

                    // 더 로드할 데이터가 있는지 확인
                    const isLastPage = data.data.last || newAnimals.length < 10;
                    setHasMore(!isLastPage);

                    // 전체 데이터 수 업데이트
                    setTotalCount(data.data.totalElements || 0);

                    // 상태별 데이터 수 계산
                    if (page === 0) {
                        calculateStatusCounts(newAnimals);
                    } else {
                        calculateStatusCounts([...animals, ...newAnimals]);
                    }
                }
            }
        } catch (error) {
            console.error('데이터 로드 오류:', error);
        } finally {
            setLoading(false);
        }
    };

    // 상태별 동물 수 계산
    const calculateStatusCounts = (animalData) => {
        const waiting = animalData.filter(animal => animal.caseStatus === 'PROTECT_WAITING').length;
        const protecting = animalData.filter(animal => animal.caseStatus === 'TEMP_PROTECTING').length;

        setWaitingCount(waiting);
        setProtectingCount(protecting);
    };

    // 페이지가 변경될 때마다 데이터 가져오기
    useEffect(() => {
        fetchMyRegisteredAnimals();
    }, [page]);

    // 보호 유형에 따른 배지 생성
    const getProtectionTypeBadge = (type) => {
        if (type === 'ADOPTION') {
            return (
                <div className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
                    <Home size={12} />
                    <span>입양</span>
                </div>
            );
        } else {
            return (
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-xs">
                    <Clock size={12} />
                    <span>임시보호</span>
                </div>
            );
        }
    };

    // 신청 목록 모달 열기
    const openApplicationsModal = (animal, e) => {
        e.stopPropagation(); // 상위 요소 클릭 이벤트 전파 방지
        setSelectedAnimal(animal);
        setIsModalOpen(true);
    };

    // 임시보호 신청 승인
    const handleApproveProtection = async (protectionId) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/protections/${protectionId}/accept`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const data = response.data;
                if (data.resultCode === "200") {
                    alert('신청이 승인되었습니다.');

                    // 승인 후 첫 페이지부터 다시 데이터 로드
                    setPage(0);
                    setAnimals([]);
                    setHasMore(true);
                    setIsModalOpen(false); // 모달 닫기
                } else {
                    alert('승인 중 오류가 발생했습니다: ' + data.message);
                }
            } else {
                alert('승인 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('승인 오류:', error);
            alert('승인 중 오류가 발생했습니다.');
        }
    };

    // 임시보호 신청 거절
    const handleRejectProtection = async (protectionId) => {
        const rejectReason = prompt('거절 사유를 입력해주세요');
        if (rejectReason === null) return; // 취소 버튼 누른 경우

        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/protections/${protectionId}/reject`,
                {
                    rejectReason: rejectReason
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                const data = response.data;
                if (data.resultCode === "200") {
                    alert('신청이 거절되었습니다.');

                    // 거절 후 첫 페이지부터 다시 데이터 로드
                    setPage(0);
                    setAnimals([]);
                    setHasMore(true);
                    setIsModalOpen(false); // 모달 닫기
                } else {
                    alert('거절 중 오류가 발생했습니다: ' + data.message);
                }
            } else {
                alert('거절 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('거절 오류:', error);
            alert('거절 중 오류가 발생했습니다.');
        }
    };

    // 동물 카드 렌더링 함수
    const renderAnimal = (animal, index) => (
        <div
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/protection/${animal.animalCaseId}`)}
        >
            <div className="flex p-3">
                {/* 이미지 */}
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    {animal.imageUrl && (
                        <img
                            src={animal.imageUrl}
                            alt={animal.animalName || animal.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* 정보 */}
                <div className="ml-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                                {animal.animalName || "이름 미정"}
                            </h3>
                            <div
                                className="flex items-center"
                                onClick={(e) => animal.pendingApplicationsCount > 0 ? openApplicationsModal(animal, e) : null}
                            >
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${animal.pendingApplicationsCount > 0 ? 'bg-orange-100 text-orange-600 cursor-pointer' : 'bg-gray-100 text-gray-600'}`}>
                                    신청 [{animal.pendingApplicationsCount || 0}]
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {animal.title || "제목 없음"}
                        </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <StatusBadge status={animal.caseStatus} type="protection" />
                        <span className="text-xs text-gray-400">
                            {new Date(animal.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    // 로딩 컴포넌트
    const loadingComponent = (
        <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-gray-500">불러오는 중...</span>
        </div>
    );

    // 빈 상태 컴포넌트
    const emptyComponent = (
        <div className="flex flex-col items-center justify-center h-64 p-4">
            <p className="text-gray-600 text-center">
                등록한 동물이 없습니다.
            </p>
            <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                onClick={() => navigate('/register-animal')}
            >
                동물 등록하기
            </button>
        </div>
    );

    // 끝 메시지 컴포넌트
    const endMessage = (
        <div className="text-center py-4">
            <span className="text-gray-500">모든 동물을 불러왔습니다.</span>
        </div>
    );

    return (
        <div className="max-w-lg mx-auto bg-[#FFF5E6] min-h-screen">
            {/* 헤더 */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-1 text-orange-400 hover:text-orange-500 transition-colors"
                        >
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                        <h1 className="text-lg font-bold text-orange-900">
                            내 동물 목록
                        </h1>
                    </div>
                </div>
            </header>

            <main className="pt-20 pb-20 px-4">
                {/* 상단 알림 카드 */}
                <div className="mb-6 bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🐾</span>
                        <div>
                            <p className="text-sm text-gray-600 mt-1">
                                총 <span className="text-orange-500 font-semibold">{totalCount}</span>마리의
                                <span className="text-orange-400 font-semibold"> 소중한 친구들</span>을 보호하고 있어요!
                            </p>
                        </div>
                    </div>
                </div>

                {/* 상태 카운트 카드 */}
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex-1 text-center">
                            <div className="bg-yellow-50 rounded-lg p-2">
                                <span className="text-sm text-gray-500">신청가능</span>
                                <p className="text-lg font-semibold text-yellow-500">{waitingCount}</p>
                            </div>
                        </div>
                        <div className="w-4"></div> {/* 간격용 */}
                        <div className="flex-1 text-center">
                            <div className="bg-red-50 rounded-lg p-2">
                                <span className="text-sm text-gray-500">임보중</span>
                                <p className="text-lg font-semibold text-red-500">{protectingCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading && page === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <InfiniteScroll
                        items={animals}
                        hasMore={hasMore}
                        loading={loading && page > 0}
                        loadMore={() => setPage(prevPage => prevPage + 1)}
                        renderItem={renderAnimal}
                        loadingComponent={loadingComponent}
                        emptyComponent={emptyComponent}
                        endMessage={endMessage}
                    />
                )}
            </main>

            {/* 신청 목록 모달 */}
            <ApplicationsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                applications={selectedAnimal?.pendingProtections || []}
                onApprove={handleApproveProtection}
                onReject={handleRejectProtection}
                title={`대기 중인 신청`}
            />
        </div>
    );
};

export default MyRegisteredAnimals;