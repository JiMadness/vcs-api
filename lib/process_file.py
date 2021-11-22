from hestia_earth.utils.table import pivot_csv
import csv
import sys

print(pivot_csv(sys.argv[1]).to_csv())