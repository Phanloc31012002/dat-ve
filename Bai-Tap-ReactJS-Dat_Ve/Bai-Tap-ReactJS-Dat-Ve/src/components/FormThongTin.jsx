import { useState } from 'react'
import { useBookingStore } from '../store/useBookingStore'

export default function FormThongTin() {
  const khachHang = useBookingStore((s) => s.khachHang)
  const danhSachHangGhe = useBookingStore((s) => s.danhSachHangGhe)
  const batDauChon = useBookingStore((s) => s.batDauChon)
  const datLai = useBookingStore((s) => s.datLai)

  const [hoTen, setHoTen] = useState('')
  const [soLuong, setSoLuong] = useState('')
  const [loi, setLoi] = useState('')

  // số ghế còn trống (bỏ hàng số đầu tiên)
  const soGheTrong = danhSachHangGhe
    .slice(1)
    .reduce((t, hang) => t + hang.danhSachGhe.filter((g) => !g.daDat).length, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const n = Number(soLuong)
    if (!hoTen.trim()) return setLoi('Vui lòng nhập tên.')
    if (!Number.isInteger(n) || n < 1) return setLoi('Số ghế phải là số nguyên ≥ 1.')
    if (n > soGheTrong) return setLoi(`Chỉ còn ${soGheTrong} ghế trống.`)
    setLoi('')
    batDauChon(hoTen, n)
  }

  const handleDatLai = () => {
    datLai()
    setHoTen('')
    setSoLuong('')
  }

  const dangChon = Boolean(khachHang)

  return (
    <form className="formThongTin text-start" onSubmit={handleSubmit}>
      <p className="text-warning mb-3">Nhập thông tin rồi chọn ghế của bạn</p>
      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label className="form-label text-light">
            Tên <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            value={hoTen}
            disabled={dangChon}
            onChange={(e) => setHoTen(e.target.value)}
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label text-light">
            Số ghế <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            min={1}
            max={soGheTrong}
            className="form-control"
            value={soLuong}
            disabled={dangChon}
            onChange={(e) => setSoLuong(e.target.value)}
            placeholder="1"
          />
        </div>
        <div className="col-md-3 d-grid">
          {dangChon ? (
            <button type="button" className="btn btn-outline-light" onClick={handleDatLai}>
              Nhập lại
            </button>
          ) : (
            <button type="submit" className="btn btn-warning fw-bold">
              Bắt đầu chọn ghế
            </button>
          )}
        </div>
      </div>
      {loi && <div className="text-danger mt-2">{loi}</div>}
      {dangChon && (
        <div className="text-success mt-2">
          Mời <b>{khachHang.hoTen}</b> chọn {khachHang.soLuongGhe} ghế bên dưới.
        </div>
      )}
    </form>
  )
}
