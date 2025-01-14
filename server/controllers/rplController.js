const Rpl = require('./../models/rplModel');


const createRpl = async (req, res) => {
  try {
    const { nama_komputer, ip_address, brand, lokasi, status } = req.body;
    const rpl = await Rpl.create({ nama_komputer, ip_address, brand, lokasi, status });
    res.status(201).json(rpl);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Rpl', error: error.message });
  }
};


const getRpls = async (req, res) => {
  try {
    const rpls = await Rpl.findAll();
    res.status(200).json(rpls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Rpls', error: error.message });
  }
};


const getRplById = async (req, res) => {
  const { id } = req.params;
  try {
    const rpl = await Rpl.findByPk(id);
    if (rpl) {
      res.status(200).json(rpl);
    } else {
      res.status(404).json({ message: 'Rpl not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Rpl', error: error.message });
  }
};


const updateRpl = async (req, res) => {
  const { id } = req.params;
  const { nama_komputer, ip_address, brand, lokasi, status } = req.body;
  try {
    const rpl = await Rpl.findByPk(id);
    if (rpl) {
      rpl.nama_komputer = nama_komputer;
      rpl.ip_address = ip_address;
      rpl.brand = brand;
      rpl.lokasi = lokasi;
      rpl.status = status;
      await rpl.save();
      res.status(200).json(rpl);
    } else {
      res.status(404).json({ message: 'Rpl not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating Rpl', error: error.message });
  }
};

// Delete Rpl
const deleteRpl = async (req, res) => {
  const { id } = req.params;
  try {
    const rpl = await Rpl.findByPk(id);
    if (rpl) {
      await rpl.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Rpl not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Rpl', error: error.message });
  }
};

module.exports = {
  createRpl,
  getRpls,
  getRplById,
  updateRpl,
  deleteRpl,
};
