"""Fixed Pages authority; producer inputs never supply policy."""
from verify_artifact import Policy
POLICY = Policy(
    repository='Oxiom-Systems/Oxiom-Systems.github.io',
    repository_id=1227131259,
    workflow_path='.github/workflows/pages.yml',
    recipe_ref='Oxiom-Systems/Oxiom-Systems.github.io/.github/workflows/ci-pages-build-recipe.yml@d18e342e92ec1f1c8675a145e6ceae4679929e9d',
    producer_job='build / build',
    group_id=5,
    build_label='ci-linux-cpu-v1-r1227131259',
    artifact_kind='site',
    artifact_stem='pages-site',
)
CNAME = 'oxiomsystems.com'
