import HangGhe from './HangGhe'
import FormThongTin from './FormThongTin'
import ThongTinDatGhe from './ThongTinDatGhe'
import { useBookingStore } from '../store/useBookingStore'
import bgMovie from '../assets/bgmovie.jpg'
import './BaiTapBookingTicket.css'

// Lối đi ngang sau hàng E (giống giao diện mẫu)
const HANG_LOI_DI = 'E'

export default function BaiTapBookingTicket() {
  const danhSachHangGhe = useBookingStore((s) => s.danhSachHangGhe)
  const thongBao = useBookingStore((s) => s.thongBao)
  const xoaThongBao = useBookingStore((s) => s.xoaThongBao)

  return (
    <div
      className="bookingMovie"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bgMovie})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ minHeight: '100vh', background: 'rgba(0,0,0,0.75)' }}>
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col-xl-8 text-center">
              <h1 className="text-warning display-5">ĐẶT VÉ XEM PHIM CYBERLEARN.VN</h1>

              <div className="khungForm mx-auto mt-3">
                <FormThongTin />
              </div>

              {thongBao && (
                <div className="alert alert-warning alert-dismissible mx-auto mt-3 khungForm text-start">
                  {thongBao}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={xoaThongBao}
                  />
                </div>
              )}

              <div className="text-light fs-4 mt-4">Màn hình</div>
              <div className="d-flex justify-content-center mt-2">
                <div className="screen" />
              </div>

              <div className="khungGhe mt-4">
                {danhSachHangGhe.map((hangGhe, index) => (
                  <div
                    key={hangGhe.hang || 'so'}
                    className={hangGhe.hang === HANG_LOI_DI ? 'loiDiNgang' : ''}
                  >
                    <HangGhe hangGhe={hangGhe} soHangGhe={index} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-xl-4">
              <h2 className="text-light text-center mt-2">DANH SÁCH GHẾ BẠN CHỌN</h2>
              <ThongTinDatGhe />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
