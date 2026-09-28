import { useBookingStore } from '../store/useBookingStore'

// Lối đi giữa cột 5 và 6 (giống giao diện mẫu)
const COT_LOI_DI = 5

export default function HangGhe({ hangGhe, soHangGhe }) {
  const danhSachGheDangDat = useBookingStore((s) => s.danhSachGheDangDat)
  const khachHang = useBookingStore((s) => s.khachHang)
  const chonGhe = useBookingStore((s) => s.chonGhe)

  // Hàng đầu tiên (hang = "") chỉ hiển thị số cột
  if (soHangGhe === 0) {
    return (
      <div className="hangGhe">
        <span className="firstChar" />
        {hangGhe.danhSachGhe.map((ghe, index) => (
          <span key={ghe.soGhe} className={index === COT_LOI_DI ? 'loiDi' : ''}>
            <button className="rowNumber" disabled>
              {ghe.soGhe}
            </button>
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="hangGhe">
      <span className="firstChar">{hangGhe.hang}</span>
      {hangGhe.danhSachGhe.map((ghe, index) => {
        const dangChon = danhSachGheDangDat.some((g) => g.soGhe === ghe.soGhe)
        let cssGhe = 'ghe'
        if (ghe.daDat) cssGhe = 'ghe gheDuocChon'
        else if (dangChon) cssGhe = 'ghe gheDangChon'
        if (!khachHang && !ghe.daDat) cssGhe += ' gheKhoa'

        return (
          <span key={ghe.soGhe} className={index === COT_LOI_DI ? 'loiDi' : ''}>
            <button
              className={cssGhe}
              disabled={ghe.daDat}
              title={ghe.daDat ? 'Ghế đã đặt' : `${ghe.soGhe} – ${ghe.gia.toLocaleString()}đ`}
              onClick={() => chonGhe(ghe)}
            >
              {index + 1}
            </button>
          </span>
        )
      })}
    </div>
  )
}
