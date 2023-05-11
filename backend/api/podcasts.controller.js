import PodcastsDAO from "./dao/PodcastsDAO.js";

export default class PodcastsController {
  static async apiPostPodcast(req, res, next) {
    try {
      const acc = req.body.acc;
      const SnumberRoom = req.body.SnumberRoom;
      const date = req.body.date;
      const email = req.body.email;

      console.log(SnumberRoom);

      const PodcastsResponse = await PodcastsDAO.addPodcast(
        acc,
        SnumberRoom,
        date,
        email
      );
      console.log(PodcastsResponse);

      var { error } = PodcastsResponse;
      if (error) {
        res.status(400).json({ error });
      } else {
        res.json({ status: "success" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdatePodcast(req, res, next) {
    try {
      const acc = req.body.acc;
      const SnumberRoom = req.body.SnumberRoom;

      const PodcastsResponse = await PodcastsDAO.updatePodcast(
        acc,
        SnumberRoom
      );
      console.log(PodcastsResponse);
      var { error } = PodcastsResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (PodcastsResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update prod - podcast may not be original poster"
        );
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeletePodcast(req, res, next) {
    try {
      const SnumberRoom = req.query.SnumberRoom;
      const podcastResponse = await PodcastsDAO.deletePodcast(SnumberRoom);
      console.log(SnumberRoom); //MODIFIED FROM SOURCE FILES
      var { error } = podcastResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (podcastResponse.deletedCount === 0) {
        throw new Error(
          "unable to delete podcast - this podcast does not exist or podcast_id not correspond to request creator"
        );
      } else {
        res.json({ status: "sucess!!" });
      }
    } catch (e) {
      console.log(e);
      res.json({ error: e.message }).status(500);
    }
  }

  static async apiGetPodcasts(req, res, next) {
    const podcastsPerPage = req.query.podcastsPerPage
      ? parseInt(req.query.podcastsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.SnumberRoom) {
      filters.name = req.query.SnumberRoom;
    }

    const { podcastsList } = await PodcastsDAO.getPodcasts({
      filters,
      page,
    });

    let response = {
      podcasts: podcastsList,
    };
    res.json(response);
  }
}
