#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/public/videos"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
mkdir -p "$OUT_DIR"

BOLD_FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
convert -size 46x58 xc:none -stroke '#0a0a0a' -strokewidth 4 -fill white -draw 'polygon 6,3 38,31 22,31 31,51 22,55 13,35 3,45' "$TMP_DIR/cursor.png"
convert -size 78x78 xc:none -stroke white -strokewidth 5 -fill none -draw 'circle 39,39 67,39' "$TMP_DIR/ring.png"

render_scene() {
  local source="$1" output="$2" duration="$3" label="$4"
  local start_x="$5" start_y="$6" end_x="$7" end_y="$8" accent="$9"
  local move_start="0.55" move_end click_end fade_start
  move_end=$(awk "BEGIN { print $move_start + (($duration - 1.05) - $move_start) / 1.3 }")
  click_end=$(awk "BEGIN { print $move_end + 0.38 }")
  fade_start=$(awk "BEGIN { print $duration - 0.18 }")

  ffmpeg -loglevel error -y \
    -loop 1 -t "$duration" -i "$source" \
    -loop 1 -t "$duration" -i "$TMP_DIR/cursor.png" \
    -loop 1 -t "$duration" -i "$TMP_DIR/ring.png" \
    -filter_complex \
    "[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0x080a0f,format=yuv420p[screen];\
     [screen]drawbox=x=0:y=0:w=1280:h=58:color=0x080a0f@0.92:t=fill,\
     drawbox=x=22:y=23:w=11:h=11:color=${accent}@1:t=fill,\
     drawtext=fontfile=${BOLD_FONT}:text='${label}':x=48:y=17:fontsize=22:fontcolor=white@0.96[chrome];\
     [1:v]format=rgba[cursor];\
     [chrome][cursor]overlay=x='if(lt(t,${move_start}),${start_x},if(lt(t,${move_end}),${start_x}+(${end_x}-${start_x})*(t-${move_start})/(${move_end}-${move_start}),${end_x}))':y='if(lt(t,${move_start}),${start_y},if(lt(t,${move_end}),${start_y}+(${end_y}-${start_y})*(t-${move_start})/(${move_end}-${move_start}),${end_y}))':eval=frame[pointed];\
     [2:v]format=rgba,colorchannelmixer=aa=0.9[ring];\
     [pointed][ring]overlay=x=${end_x}-32:y=${end_y}-31:enable='between(t,${move_end},${click_end})',\
     fade=t=in:st=0:d=0.18,fade=t=out:st=${fade_start}:d=0.18,format=yuv420p[v]" \
    -map "[v]" -an -r 30 -c:v libx264 -crf 18 -preset veryfast "$output"
}

convert "$ROOT_DIR/public/images/work/research/analysis.png" \
  -fill '#0d1820' -stroke '#23d8c5' -strokewidth 2 -draw 'roundrectangle 1080,148 1412,842 14,14' \
  -font "$BOLD_FONT" -pointsize 20 -fill '#f4f8f8' -stroke none -annotate +1108+194 '312 PAPERS IN THIS BAR' \
  -font "$BOLD_FONT" -pointsize 16 -fill '#17d9c4' -annotate +1108+230 'SELECTED EVIDENCE' \
  -fill '#17262f' -stroke '#324650' -draw 'roundrectangle 1102,254 1388,382 9,9 roundrectangle 1102,400 1388,528 9,9 roundrectangle 1102,546 1388,674 9,9' \
  -font "$BOLD_FONT" -pointsize 16 -fill '#f5f7f7' -stroke none -annotate +1122+287 'Urban heat and health' \
  -font "$BOLD_FONT" -pointsize 16 -fill '#f5f7f7' -annotate +1122+433 'Cooling interventions' \
  -font "$BOLD_FONT" -pointsize 16 -fill '#f5f7f7' -annotate +1122+579 'Heat exposure inequity' \
  -font '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf' -pointsize 13 -fill '#aab7bd' -annotate +1122+316 'Chang et al.  ·  2025' -annotate +1122+462 'Rivera et al.  ·  2024' -annotate +1122+608 'Owens et al.  ·  2024' \
  "$TMP_DIR/research-populated.png"

convert "$TMP_DIR/research-populated.png" -fill '#020609aa' -draw 'rectangle 0,0 1440,900' \
  -fill '#f8faf9' -stroke '#17d9c4' -strokewidth 3 -draw 'roundrectangle 350,138 1090,770 18,18' \
  -font "$BOLD_FONT" -pointsize 17 -fill '#0b7069' -stroke none -annotate +398+190 'PAPER DETAILS' \
  -font "$BOLD_FONT" -pointsize 30 -fill '#11191c' -annotate +398+245 'Urban heat and health outcomes' \
  -font '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf' -pointsize 17 -fill '#536268' -annotate +398+286 'Chang, Williams & Patel  ·  Environmental Health  ·  2025' \
  -fill '#e6f3f0' -stroke none -draw 'roundrectangle 398,326 1038,414 9,9' \
  -font "$BOLD_FONT" -pointsize 16 -fill '#172226' -annotate +422+358 'FINDING' \
  -font '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf' -pointsize 16 -fill '#334248' -annotate +422+388 'Targeted cooling reduced high-risk exposure by 18%.' \
  -font "$BOLD_FONT" -pointsize 16 -fill '#172226' -annotate +398+468 'STUDY PROFILE' \
  -font '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf' -pointsize 16 -fill '#536268' -annotate +398+503 'Longitudinal cohort  ·  n = 4,812  ·  Five metropolitan regions' \
  -fill '#0c8f84' -draw 'roundrectangle 398,650 632,710 8,8' \
  -font "$BOLD_FONT" -pointsize 17 -fill white -annotate +438+688 'OPEN SOURCE PAPER' \
  "$TMP_DIR/research-detail.png"

render_scene "$ROOT_DIR/public/images/work/research/catalog.png" "$TMP_DIR/research-1.mp4" 4 "1 / Select a study dimension" 330 110 97 280 "0x19e6d3"
render_scene "$ROOT_DIR/public/images/work/research/catalog.png" "$TMP_DIR/research-2.mp4" 4 "2 / Analyze all filters" 290 360 175 675 "0x19e6d3"
render_scene "$ROOT_DIR/public/images/work/research/analysis.png" "$TMP_DIR/research-3.mp4" 4 "3 / Select a result bar" 620 120 720 300 "0x19e6d3"
render_scene "$TMP_DIR/research-populated.png" "$TMP_DIR/research-4.mp4" 4 "4 / Review papers in that bar" 720 300 1030 245 "0x19e6d3"
render_scene "$TMP_DIR/research-detail.png" "$TMP_DIR/research-5.mp4" 4 "5 / Inspect the paper details" 1030 245 700 650 "0x19e6d3"

render_scene "$ROOT_DIR/public/images/work/iaw/04-dispatch.png" "$TMP_DIR/delivery-1.mp4" 4 "1 / Assign a driver" 320 180 935 322 "0x4f8cff"
render_scene "$ROOT_DIR/public/images/work/iaw/04-dispatch.png" "$TMP_DIR/delivery-2.mp4" 4 "2 / Open the driver workflow" 935 322 1088 92 "0x4f8cff"
render_scene "$ROOT_DIR/public/images/work/iaw/02-driver-dashboard.png" "$TMP_DIR/delivery-3.mp4" 4 "3 / Accept the assigned package" 480 210 1050 565 "0x4f8cff"
render_scene "$ROOT_DIR/public/images/work/iaw/05-signoff.png" "$TMP_DIR/delivery-4.mp4" 4 "4 / Capture recipient sign-off" 530 225 890 612 "0xd2ad35"
render_scene "$ROOT_DIR/public/images/work/iaw/07-accounting.png" "$TMP_DIR/delivery-5.mp4" 4 "5 / Confirm delivery completion" 410 150 1010 188 "0xd2ad35"

concat_video() {
  local output_base="$1"
  shift
  local concat_file="$TMP_DIR/${output_base}.txt"
  : > "$concat_file"
  for clip in "$@"; do
    printf "file '%s'\n" "$clip" >> "$concat_file"
  done
  ffmpeg -loglevel error -y -f concat -safe 0 -i "$concat_file" -an -c:v libx264 -crf 18 -preset medium -movflags +faststart "$OUT_DIR/${output_base}.mp4"
  ffmpeg -loglevel error -y -i "$OUT_DIR/${output_base}.mp4" -an -c:v libvpx-vp9 -crf 33 -b:v 0 -deadline good -cpu-used 2 "$OUT_DIR/${output_base}.webm"
}

concat_video "research-preview" "$TMP_DIR/research-1.mp4" "$TMP_DIR/research-2.mp4" "$TMP_DIR/research-3.mp4" "$TMP_DIR/research-4.mp4" "$TMP_DIR/research-5.mp4"
concat_video "delivery-preview" "$TMP_DIR/delivery-1.mp4" "$TMP_DIR/delivery-2.mp4" "$TMP_DIR/delivery-3.mp4" "$TMP_DIR/delivery-4.mp4" "$TMP_DIR/delivery-5.mp4"
echo "20-second clickthrough previews written to $OUT_DIR"
