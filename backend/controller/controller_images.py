from model import images
from model.connect_db import DatabaseDriver
from model.images import Images
import json
from flask import request
from docker_service.service import DockerSercice



# ============ get size of Image from docker
def get_size():

    pass




# ===================show all information of images
def show_all_images(request):
    result = Images.get_all_images()
    return json.dumps(result)

# ============== show one information of iamges
def get_image(rquest):
    params = request.get_json()
    id = params['image_id']
    result = Images.get_image(id)
    return json.dumps(result)

# ================== delete images =============
def delete_image(request):
    params = request.get_json()
    id = params['image_id']
    result = Images.delete_image(id)
    return json.dumps(result)

# ========
