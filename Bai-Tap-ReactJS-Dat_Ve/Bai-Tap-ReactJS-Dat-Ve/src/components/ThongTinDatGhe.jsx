import { useBookingStore } from '../store/useBookingStore'

export default function ThongTinDatGhe() {
  const danhSachGheDangDat = useBookingStore((s) => s.danhSachGheDangDat)
  const khachHang = useBookingStore((s) => s.khachHang)
  const lichSuDatVe = useBookingStore((s) => s.lichSuDatVe)
  const huyGhe = useBookingStore((s) => s.huyGhe)
  const xacNhanDatVe = useBookingStore((s) => s.xacNhanDatVe)

  const tongTien = danhSachGheDangDat.reduce((tong, ghe) => tong + ghe.gia, 0)
  const soCanChon = khachHang ? khachHang.soLuongGhe : 0
  const duGhe = khachHang && danhSachGheDangDat.length === soCanChon

  return (
    <div>
      {/* Chú thích */}
      <div className="mt-3 d-flex flex-wrap gap-3">
        <div className="d-flex align-items-center">
          <button className="gheDuocChon me-2" disabled />
          <span className="text-light">Ghế đã đặt</span>
        </div>
        <div className="d-flex align-items-center">
          <button className="gheDangChon me-2" />
          <span className="text-light">Ghế đang chọn</span>
        </div>
        <div className="d-flex align-items-center">
          <button className="ghe ms-0 me-2" />
          <span className="text-light">Ghế trống</span>
        </div>
      </div>

      {/* Ghế đang chọn */}
      <div className="mt-4">
        <div className="d-flex justify-content-between text-light mb-2">
          <span>{khachHang ? `Khách: ${khachHang.hoTen}` : 'Chưa nhập thông tin'}</span>
          <span className={duGhe ? 'text-success' : 'text-warning'}>
            Đã chọn {danhSachGheDangDat.length}/{soCanChon}
          </span>
        </div>

        <table className="table table-bordered table-dark align-middle mb-3">
          <thead>
            <tr>
              <th>Số ghế</th>
              <th>Giá</th>
              <th>Huỷ</th>
            </tr>
          </thead>
          <tbody className="text-warning">
            {danhSachGheDangDat.length === 0 && (
              <tr>
                <td colSpan={3} className="text-secondary text-center">
                  Chưa chọn ghế nào
                </td>
              </tr>
            )}
            {danhSachGheDangDat.map((ghe) => (
              <tr key={ghe.soGhe}>
                <td>{ghe.soGhe}</td>
                <td>{ghe.gia.toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => huyGhe(ghe.soGhe)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-warning">
              <td className="text-light">Tổng tiền</td>
              <td colSpan={2}>{tongTien.toLocaleString()} đ</td>
            </tr>
          </tfoot>
        </table>

        <button
          className="btn btn-warning w-100 fw-bold"
          disabled={!duGhe}
          onClick={xacNhanDatVe}
        >
          XÁC NHẬN ĐẶT VÉ
        </button>
      </div>

      {/* Lịch sử đặt vé */}
      {lichSuDatVe.length > 0 && (
        <div className="mt-4">
          <h5 className="text-light">Vé đã đặt</h5>
          <table className="table table-bordered table-dark align-middle small">
            <thead>
              <tr>
                <th>Tên</th>
                <th>SL</th>
                <th>Ghế</th>
                <th>Tiền</th>
              </tr>
            </thead>
            <tbody className="text-info">
              {lichSuDatVe.map((ve, i) => (
                <tr key={i}>
                  <td>{ve.hoTen}</td>
                  <td>{ve.soLuongGhe}</td>
                  <td>{ve.danhSachGhe.join(', ')}</td>
                  <td>{ve.tongTien.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
