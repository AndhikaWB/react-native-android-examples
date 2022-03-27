// https://app.json-generator.com/

JG.repeat(200, {
  index: JG.index(),
  id_kapal() {
    let negara = JG.random("ID", "SG", "MY", "AU", "TH");
    let nomor = JG.integer(100000,199999);
    let model = JG.random("KRP", "MRK", "MNT", "MJR", "BLD", "TNA", "SNG", "RNK");
    return negara + "-" + nomor + "-" + model;
  },
  asal: JG.random("Merak (Banten)", "Tanjung Priok (Jakarta)", "Tanjung Perak (Jawa Timur)"),
  tujuan: JG.random("Bakauheni (Lampung)", "Sekupang (Kepulauan Riau)", "Gilimanuk (Bali)"),
  tanggal() {
    listTanggal = ["2022-03-21", "2022-03-22", "2022-03-23", "2022-03-24", "2022-03-25"];
    return listTanggal[JG.index() % 5];
  }
});