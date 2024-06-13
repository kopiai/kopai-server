const { Blend } = require('../models/models'); 

const getBlendById = async (request, h) => {
    try {
        const { blend_id } = request.params;
        const blend = await Blend.findByPk(blend_id);
        if (!blend) {
            return h.response({ message: 'Blend not found' }).code(404);
        }
        return blend;
    } catch (error) {
        console.error('Error fetching blend by id:', error);
        return h.response({ message: 'Error fetching blend' }).code(500);
    }
};

const createBlend = async (req, res) => {
    try {
      const { coffee_id, product_id, user_id, blendName, description } = req.body;
  
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const blend = await Blend.create({
        coffee_id,
        product_id,
        user_id,
        blendName,
        description
      });
  
      return res.status(201).json(blend);
    } catch (error) {
      console.error('Error creating blend:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const updateBlend = async (request, h) => {
    try {
        const { blend_id } = request.params;
        const { coffee_id, product_id, user_id, blendName, description } = request.payload;
        const blend = await Blend.findByPk(blend_id);
        if (!blend) {
            return h.response({ message: 'Blend not found' }).code(404);
        }
        await blend.update({
            coffee_id,
            product_id,
            user_id,
            blendName,
            description
        });
        return h.response(blend).code(200);
    } catch (error) {
        console.error('Error updating blend:', error);
        return h.response({ message: 'Error updating blend' }).code(500);
    }
};

const deleteBlend = async (request, h) => {
    try {
        const { blend_id } = request.params;
        const blend = await Blend.findByPk(blend_id);
        if (!blend) {
            return h.response({ message: 'Blend not found' }).code(404);
        }
        await blend.destroy();
        return h.response({ message: 'Blend deleted successfully' }).code(200);
    } catch (error) {
        console.error('Error deleting blend:', error);
        return h.response({ message: 'Error deleting blend' }).code(500);
    }
};

module.exports = {
    getBlendById,
    createBlend,
    updateBlend,
    deleteBlend
};
