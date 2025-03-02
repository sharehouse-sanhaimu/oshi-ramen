import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))
import japanize_matplotlib  # noqa: F401
import matplotlib as mpl
import pandas as pd
from matplotlib.figure import Figure
from models.radar_chart import RadarChartInput
from pycirclize import Circos


def create_radar_chart(radar_chart_input: RadarChartInput) -> Figure:
    # Create RPG jobs parameter dataframe (3 jobs, 7 parameters)
    df = pd.DataFrame(
        data=[
            [
                radar_chart_input.deliciousness_id,
                radar_chart_input.portion_id,
                radar_chart_input.noodletexture_id,
                radar_chart_input.noodle_thickness_id,
                radar_chart_input.soup_richness_id,
            ]
        ],
        index=[""],
        columns=["味", "量", "硬さ", "太さ", "濃さ"],
    )

    mpl.rcParams["font.size"] = 280

    # Initialize Circos instance for radar chart plot
    circos = Circos.radar_chart(
        df,
        vmax=5,
        marker_size=10,
        grid_interval_ratio=0.2,
    )

    # Plot figure & set legend on upper right
    fig = circos.plotfig(figsize=(10, 10))

    return fig


if __name__ == "__main__":
    create_radar_chart(RadarChartInput(3, 4, 5, 2, 1))
