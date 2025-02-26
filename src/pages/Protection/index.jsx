import React, { useState, useEffect, useRef, useCallback } from 'react';

const Protection = () => {
  const [animals, setAnimals] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  // 마지막 아이템 참조 콜백
  const lastAnimalRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log(`마지막 아이템에 도달했습니다. 페이지 ${page + 1} 로드 시작`);
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  const getStatusText = (status) => {
    switch (status) {
      case 'TEMP_PROTECT_WAITING':
        return '신청가능';
      case 'TEMP_PROTECTING':
        return '임보중';
      default:
        return status;
    }
  };

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      const apiUrl = `/api/v1/protections?page=${page}&size=10`;
      console.log(`데이터 요청: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();

        if (data.resultCode === "200") {
          const newAnimals = data.data.content;
          console.log(`페이지 ${page}에서 ${newAnimals.length}개 데이터 로드됨`);

          // 새 데이터가 없으면 더 이상 로드하지 않음
          if (newAnimals.length === 0) {
            setHasMore(false);
            console.log('더 이상 로드할 데이터가 없습니다');
            return;
          }

          // 첫 페이지면 동물 데이터 초기화, 아니면 추가
          if (page === 0) {
            setAnimals(newAnimals);
          } else {
            setAnimals(prev => [...prev, ...newAnimals]);
          }

          setTotalElements(data.data.totalElements);

          // 더 로드할 데이터가 있는지 확인
          const isLastPage = data.data.last || newAnimals.length < 10;
          setHasMore(!isLastPage);
          console.log(`마지막 페이지 여부: ${isLastPage}, 더 데이터 있음: ${!isLastPage}`);
        }
      }
    } catch (error) {
      console.error('데이터 로드 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지가 변경될 때만 데이터 가져오기
  useEffect(() => {
    fetchAnimals();
  }, [page]);

  return (
    <div className="max-w-lg mx-auto bg-[#FFF5E6] min-h-screen p-3">
      <div className="mb-6 bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <div>
            <p className="text-sm text-gray-600 mt-1">
              총 <span className="text-orange-500 font-semibold">{totalElements}</span>마리의
              <span className="text-orange-400 font-semibold"> 귀여운 친구들</span>이 기다리고 있어요!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {animals.map((animal, index) => (
          <div
            key={animal.id || index}
            // 배열의 마지막 아이템에만 ref 설정
            ref={index === animals.length - 1 ? lastAnimalRef : null}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
          >
            <div className="relative h-40">
              {animal.imageUrl && (
                <img
                  src={`https://kr.object.ncloudstorage.com/paw-patrol/protection/${animal.imageUrl}`}
                  alt={animal.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${animal.caseStatus === 'TEMP_PROTECT_WAITING'
                    ? 'bg-yellow-400 text-white'
                    : animal.caseStatus === 'PROTECTION_POSSIBLE'
                      ? 'bg-red-400 text-white'
                      : 'bg-orange-300 text-white'
                  }`}>
                  {getStatusText(animal.caseStatus)}
                </span>
              </div>
            </div>

            <div className="p-3 h-[5.5rem] flex flex-col justify-between">
              <h3 className="text-sm text-gray-800 min-h-[2.5rem] line-clamp-2 text-center">
                {animal.title}
              </h3>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-orange-500">{animal.breed}</span>
                <span className="text-gray-400">{new Date(animal.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-4">
          <span className="text-gray-500">불러오는 중...</span>
        </div>
      )}

      {!hasMore && animals.length > 0 && (
        <div className="text-center py-4">
          <span className="text-gray-500">모든 동물을 불러왔습니다.</span>
        </div>
      )}
    </div>
  );
};

export default Protection;