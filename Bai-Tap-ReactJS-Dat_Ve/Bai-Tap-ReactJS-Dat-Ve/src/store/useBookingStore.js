import { create } from 'zustand'
import danhSachGheData from '../data/danhSachGhe.json'

// Store đặt vé dùng Zustand: state + các hàm thay đổi state nằm chung 1 chỗ
export const useBookingStore = create((set, get) => ({
  // ===== STATE =====
  danhSachHangGhe: danhSachGheData, // toàn bộ phòng chiếu
  khachHang: null, // { hoTen, soLuongGhe } — null = chưa bấm "Bắt đầu chọn"
  danhSachGheDangDat: [], // ghế đang chọn trong lượt hiện tại
  lichSuDatVe: [], // các lượt đã xác nhận: { hoTen, soLuongGhe, danhSachGhe, tongTien }
  thongBao: '', // thông báo lỗi / nhắc nhở

  // ===== ACTIONS =====

  // Nhập tên + số ghế rồi bấm "Bắt đầu chọn ghế"
  batDauChon: (hoTen, soLuongGhe) =>
    set({
      khachHang: { hoTen: hoTen.trim(), soLuongGhe },
      danhSachGheDangDat: [],
      thongBao: '',
    }),

  chonGhe: (ghe) => {
    const { khachHang, danhSachGheDangDat } = get()

    if (!khachHang) {
      set({ thongBao: 'Vui lòng nhập Tên và Số ghế rồi bấm "Bắt đầu chọn ghế".' })
      return
    }

    const daChon = danhSachGheDangDat.some((g) => g.soGhe === ghe.soGhe)

    // Click lần 2 vào ghế đang chọn => bỏ chọn
    if (daChon) {
      set({
        danhSachGheDangDat: danhSachGheDangDat.filter((g) => g.soGhe !== ghe.soGhe),
        thongBao: '',
      })
      return
    }

    if (danhSachGheDangDat.length >= khachHang.soLuongGhe) {
      set({
        thongBao: `Bạn chỉ được chọn ${khachHang.soLuongGhe} ghế. Bỏ bớt ghế trước khi chọn ghế khác.`,
      })
      return
    }

    set({ danhSachGheDangDat: [...danhSachGheDangDat, ghe], thongBao: '' })
  },

  huyGhe: (soGhe) =>
    set((state) => ({
      danhSachGheDangDat: state.danhSachGheDangDat.filter((g) => g.soGhe !== soGhe),
      thongBao: '',
    })),

  xacNhanDatVe: () => {
    const { khachHang, danhSachGheDangDat, danhSachHangGhe, lichSuDatVe } = get()
    if (!khachHang) return

    if (danhSachGheDangDat.length !== khachHang.soLuongGhe) {
      set({
        thongBao: `Bạn cần chọn đủ ${khachHang.soLuongGhe} ghế (đang chọn ${danhSachGheDangDat.length}).`,
      })
      return
    }

    const dangDat = new Set(danhSachGheDangDat.map((g) => g.soGhe))

    set({
      danhSachHangGhe: danhSachHangGhe.map((hang) => ({
        ...hang,
        danhSachGhe: hang.danhSachGhe.map((ghe) =>
          dangDat.has(ghe.soGhe) ? { ...ghe, daDat: true } : ghe,
        ),
      })),
      lichSuDatVe: [
        ...lichSuDatVe,
        {
          hoTen: khachHang.hoTen,
          soLuongGhe: khachHang.soLuongGhe,
          danhSachGhe: danhSachGheDangDat.map((g) => g.soGhe),
          tongTien: danhSachGheDangDat.reduce((t, g) => t + g.gia, 0),
        },
      ],
      khachHang: null,
      danhSachGheDangDat: [],
      thongBao: '',
    })
  },

  // Huỷ lượt đang chọn, quay lại nhập thông tin
  datLai: () => set({ khachHang: null, danhSachGheDangDat: [], thongBao: '' }),

  xoaThongBao: () => set({ thongBao: '' }),
}))
