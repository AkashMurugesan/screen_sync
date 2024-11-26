import Show from '../models/show.js';

// Create a new show
export const createShow = async (req, res) => {
  try {
    const show = new Show(req.body);
    await show.save();
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get shows with optional filters
export const getShows = async (req, res) => {
  const { search } = req.query;  // Extract the search query
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  // Initialize the filters object
  let filters = {};

  if (search) {
    filters = {
      $or: [
        { movie: { $regex: search, $options: 'i' } },
        { multiplex: { $regex: search, $options: 'i' } },
        { language: { $regex: search, $options: 'i' } }
      ]
    };
  }

  try {
    const shows = await Show.find(filters)
      .skip(skip)
      .limit(limit);

    const totalShows = await Show.countDocuments(filters);

    res.status(200).json({
      message: "Success",
      data: shows,
      pagination: {
        totalItems: totalShows,
        totalPages: Math.ceil(totalShows / limit),
        currentPage: page,
        pageSize: limit
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Update show
export const updateShow = async (req, res) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Success", data: updatedShow });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete show
export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id);
    if (show) {
      await Show.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Show deleted successfully' });
    } else {
      // TODO use custom error handler
      throw new Error("show not found")
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
